<template>
    <div id="charts" class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-12">
                <label for="days">{{ $t("charts-question-days") }}</label>
                <select id="days" v-model="selectedOption">
                    <option v-for="option in options" :key="option">{{ option }}</option>
                </select>
            </div>
            <div class="col-12 col-md-12">
                <button class="button" @click="onClick">
                    <span>{{ $t("charts-button") }}</span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'new_cases'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'new_cases_per_million'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'total_cases'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'new_deaths'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'new_deaths_per_million'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'total_deaths'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'new_tests'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'new_tests_per_thousand'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'total_tests'"></canvas>
            </div>
            <div class="col-12 col-md-6 col-lg-4">
                <canvas :id="country + '_' + 'total_tests_per_thousand'"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    name: 'Charts',
    components: {

    },  
    props: {
        country: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            ID: Object.freeze({
                "ID_01": "new_cases",
                "ID_02": "total_cases",
                "ID_03": "new_deaths",
                "ID_04": "total_deaths",
                "ID_05": "new_cases_per_million",
                "ID_06": "new_deaths_per_million",
                "ID_07": "new_tests", 
                "ID_08": "total_tests", 
                "ID_09": "new_tests_per_thousand", 
                "ID_10": "total_tests_per_thousand" 
            }),
            selectedOption: 30,
            options: [7, 30]
        };
    },
    computed: { 
        locale: function() { 
            return this.$i18n.locale;
        }
    },
    watch: {
        locale: function() {
            this.updateCharts();
        }
    },
    methods: {        
        onClick: function() {
            this.updateCharts(); 
        },
        preprocessData: function(id) {
           
            let data = [];
            let countryData;

            // get data of respective country
            for(let index = 0; index < Object.keys(this.$store.getters.jsonData).length; index++) {

                if(Object.values(this.$store.getters.jsonData)[index].location == this.country) {

                    countryData = Object.values(this.$store.getters.jsonData)[index];
                }
            }

            // get list of respective data entries
            for(let index = countryData.data.length - 1; 
                index > countryData.data.length - this.selectedOption; index--) {  

                data.push(this.getData(countryData.data[index], id));
            }

            data.reverse(data);
            return data;
        },
        getData: function(dayData, id) {

            let entry = {};
            let key = dayData.date;
            let value;

            switch (id) {
                case this.ID.ID_01:
                    value = dayData.new_cases;
                    break;
                case this.ID.ID_02:
                    value = dayData.total_cases;
                    break;
                case this.ID.ID_03:
                    value = dayData.new_deaths;
                    break;
                case this.ID.ID_04:
                    value = dayData.total_deaths;
                    break;
                case this.ID.ID_05:
                    value = dayData.new_cases_per_million;
                    break;
                case this.ID.ID_06:
                    value = dayData.new_deaths_per_million;
                    break;
                case this.ID.ID_07:
                    value = dayData.new_tests;
                    break;
                case this.ID.ID_08:
                    value = dayData.total_tests;
                    break;
                case this.ID.ID_09:
                    value = dayData.new_tests_per_thousand;
                    break;
                case this.ID.ID_10:
                    value = dayData.total_tests_per_thousand;
                    break;
            }

            entry[key] = value;
            return entry;
        },
        getChartLabel: function(id) {

            let chartLabel;

            switch (id) {
                case this.ID.ID_01:
                    chartLabel = this.$t("charts-new-cases-label");
                    break;
                case this.ID.ID_02:
                    chartLabel = this.$t("charts-total-cases-label");
                    break;
                case this.ID.ID_03:
                    chartLabel = this.$t("charts-new-deaths-label");
                    break;
                case this.ID.ID_04:
                    chartLabel = this.$t("charts-total-deaths-label");
                    break;
                case this.ID.ID_05:
                    chartLabel = this.$t("charts-new-cases-per-million");
                    break;
                case this.ID.ID_06:
                    chartLabel = this.$t("charts-new-deaths-per-million");
                    break;
                case this.ID.ID_07:
                    chartLabel = this.$t("charts-new-tests-label");
                    break;
                case this.ID.ID_08:
                    chartLabel = this.$t("charts-total-tests-label");
                    break;
                case this.ID.ID_09:
                    chartLabel = this.$t("charts-new-test-per-thousand-label");
                    break;
                case this.ID.ID_10:
                    chartLabel = this.$t("charts-total-tests-per-thousand-label");
                    break;
            }

            return chartLabel;
        },
        createChart: function(id, data) {

            let chartLabel = this.getChartLabel(id);

            let labels = [];
            let datasetData = [];

            for(let index = 0; index < data.length; index++) {
                labels.push(Object.keys(data[index]));
                datasetData.push(Object.values(data[index]));
            }

            let sortedDataset = datasetData.slice(0).sort((a, b) => a - b).reverse();
            let maxValue = sortedDataset[0];

            // chart
            let context = document.getElementById(this.country + "_" + id).getContext('2d');
            new Chart(context, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        lineTension: 0,
                        label: chartLabel,
                        data: datasetData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                suggestedMin: 0,
                                suggestedMax: maxValue
                            }
                        }]
                    }
                }
            });
        },
        plotCharts: function() {

            // plot charts
            for(let index = 0; index < Object.keys(this.ID).length; index++) {

                let chartData = {};

                switch (index) {
                    case 0: 
                        chartData.id = this.ID.ID_01;
                        break;
                    case 1: 
                        chartData.id = this.ID.ID_02;
                        break;
                    case 2: 
                        chartData.id = this.ID.ID_03;
                        break;
                    case 3: 
                        chartData.id = this.ID.ID_04;
                        break;
                    case 4: 
                        chartData.id = this.ID.ID_05;
                        break;
                    case 5: 
                        chartData.id = this.ID.ID_06;
                        break;
                    case 6: 
                        chartData.id = this.ID.ID_07;
                        break;
                    case 7: 
                        chartData.id = this.ID.ID_08;
                        break;
                    case 8: 
                        chartData.id = this.ID.ID_09;
                        break;
                    case 9: 
                        chartData.id = this.ID.ID_10;
                        break;
                }

                chartData.data = this.preprocessData(chartData.id);
                this.createChart(chartData.id, chartData.data);
            }
        },
        updateCharts: function() {
            
            // update charts
            for(let index = 0; index < Object.keys(this.ID).length; index++) {

                let id;

                switch(index) {
                    case 0: 
                        id = this.ID.ID_01;
                        break;
                    case 1: 
                        id = this.ID.ID_02;
                        break;
                    case 2: 
                        id = this.ID.ID_03;
                        break;
                    case 3: 
                        id = this.ID.ID_04;
                        break;
                    case 4: 
                        id = this.ID.ID_05;
                        break;
                    case 5: 
                        id = this.ID.ID_06;
                        break;
                    case 6: 
                        id = this.ID.ID_07;
                        break;
                    case 7: 
                        id = this.ID.ID_08;
                        break;
                    case 8: 
                        id = this.ID.ID_09;
                        break;
                    case 9: 
                        id = this.ID.ID_10;
                        break;
                }

                this.updateChartHelper(id);
            }
        },
        updateChartHelper: function(chartId) {

            const THIS = this;

            let chartData = {};
            let labels = [];
            let datasetData = [];
            let chart;

            let chartLabel = this.getChartLabel(chartId);

            // get chart
            Chart.helpers.each(Chart.instances, function(instance) {
                if(instance.chart.canvas.id == THIS.country + "_" + chartId) {
                    chart = instance;
                }
            });

            // update
            chartData.id = chartId;
            chartData.data = this.preprocessData(chartData.id);
      
            for(let index = 0; index < chartData.data.length; index++) {
                labels.push(Object.keys(chartData.data[index]));
                datasetData.push(Object.values(chartData.data[index]));
            }

            let sortedDataset = datasetData.slice(0).sort((a, b) => a - b).reverse();
            let maxValue = sortedDataset[0];

            chart.data.datasets[0].label = chartLabel;
            chart.data.datasets[0].data = datasetData; 
            chart.data.labels = labels; 
            chart.options.scales.yAxes[0].ticks.suggestedMax = maxValue; 
            chart.update();
        }
    },
    mounted: function() {

        this.localeCheck = this.$i18n.locale;

        // get number of recorded days of specific country for select
        for(let index = 0; index < Object.keys(this.$store.getters.jsonData).length; index++) {

            if(Object.values(this.$store.getters.jsonData)[index].location == this.country) {

                this.options.push(Object.values(this.$store.getters.jsonData)[index].data.length); 
            }
        }

        // plot charts
        this.plotCharts();
    },
    
}
</script>

<style lang="css">

</style>