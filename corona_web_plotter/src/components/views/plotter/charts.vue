<template>
    <div class="charts">
        <div>
            <label for="days">{{ $t("charts-question-days") }}</label>
            <select id="days" v-model="selectedOption">
                <option v-for="option in options" :key="option">{{ option }}</option>
            </select>
            <button class="button" @click="onClick">
                <span>{{ $t("charts-button") }}</span>
            </button>
        </div>
        <div class="charts-container">
            <div class="chart">
                <canvas :id="country + '_' + 'new_cases'"></canvas>
            </div>
            <div class="chart">
                <canvas :id="country + '_' + 'total_cases'"></canvas>
            </div>
            <div class="chart">
                <canvas :id="country + '_' + 'new_deaths'"></canvas>
            </div>
            <div class="chart">
                <canvas :id="country + '_' + 'total_deaths'"></canvas>
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
        jsonData: {
            type: Object,
            rewuired: true
        },
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
                "ID_04": "total_deaths"
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
            for(let index = 0; index < Object.keys(this.jsonData).length; index++) {

                if(Object.values(this.jsonData)[index].location == this.country) {

                    countryData = Object.values(this.jsonData)[index];
                }
            }

            // new cases
            if(id == this.ID.ID_01) {
                for(let index = countryData.data.length - 1; 
                    index > countryData.data.length - this.selectedOption; index--) {  

                    data.push(this.getData(countryData.data[index], id));
                }
            }
            // total cases
            if(id == this.ID.ID_02) {
                for(let index = countryData.data.length - 1; 
                    index > countryData.data.length - this.selectedOption; index--) { 

                    data.push(this.getData(countryData.data[index], id));
                }
            }
            // new deaths
            if(id == this.ID.ID_03) {
                for(let index = countryData.data.length - 1; 
                    index > countryData.data.length - this.selectedOption; index--) { 

                    data.push(this.getData(countryData.data[index], id));
                }
            }
            // total deaths
            if(id == this.ID.ID_04) {
                for(let index = countryData.data.length - 1; 
                    index > countryData.data.length - this.selectedOption; index--) { 

                    data.push(this.getData(countryData.data[index], id));
                }
            }

            data.reverse(data);
            return data;
        },
        getData: function(dayData, id) {

            let entry = {};
            let key = dayData.date;
            let value;

            if(id == this.ID.ID_01) {
                value = dayData.new_cases;
            }
            if(id == this.ID.ID_02) {
                value = dayData.total_cases;
            }
            if(id == this.ID.ID_03) {
                value = dayData.new_deaths;
            }
            if(id == this.ID.ID_04) {
                value = dayData.total_deaths;
            }

            entry[key] = value;
            return entry;
        },
        getChartLabel: function(id) {

            let chartLabel;

            if(id == this.ID.ID_01) {
                chartLabel = this.$t("charts-new-cases-label");
            }
            if(id == this.ID.ID_02) {
                chartLabel = this.$t("cahrts-total-cases-label");
            }
            if(id == this.ID.ID_03) {
                chartLabel = this.$t("charts-new-deaths-label");
            }
            if(id == this.ID.ID_04) {
                chartLabel = this.$t("charts-total-deaths-label");
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

                // new cases
                if(index == 0) {
                    chartData.id = this.ID.ID_01;
                    chartData.data = this.preprocessData(chartData.id);
                    this.createChart(chartData.id, chartData.data);
                }
                // total cases
                if(index == 1) {
                    chartData.id = this.ID.ID_02;
                    chartData.data = this.preprocessData(chartData.id);
                    this.createChart(chartData.id, chartData.data);
                }
                // new deaths
                if(index == 2) {
                    chartData.id = this.ID.ID_03;
                    chartData.data = this.preprocessData(chartData.id);
                    this.createChart(chartData.id, chartData.data);
                }
                // total deaths
                if(index == 3) {
                    chartData.id = this.ID.ID_04;
                    chartData.data = this.preprocessData(chartData.id);
                    this.createChart(chartData.id, chartData.data);
                }       
            }
        },
        updateCharts: function() {
            
            // update charts
            for(let index = 0; index < Object.keys(this.ID).length; index++) {

                // new cases
                if(index == 0) {

                    this.updateChartHelper(this.ID.ID_01);

                }
                // total cases
                if(index == 1) {

                    this.updateChartHelper(this.ID.ID_02);

                }
                // new deaths
                if(index == 2) {
   
                    this.updateChartHelper(this.ID.ID_03);
                }
                // total deaths
                if(index == 3) {
            
                    this.updateChartHelper(this.ID.ID_04);
                }       
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

        // get number of recorded days od specific country for select
        for(let index = 0; index < Object.keys(this.jsonData).length; index++) {

            if(Object.values(this.jsonData)[index].location == this.country) {

                this.options.push(Object.values(this.jsonData)[index].data.length); 
            }
        }

        // plot charts
        this.plotCharts();
    },
    
}
</script>

<style lang="css">
.charts {
    margin-top: 0%;
    margin-bottom: 0%;
}

.charts-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: flex-start;
    align-content: flex-start;
}

.chart {
    width: 50%;
    margin: 0px;
    display: flex;
}

.button {
    width: 10%;
    margin-left: 45%;
    margin-right: 45%;
    margin-top: 1%;
    margin-bottom: 2%;
}
</style>