<template>
    <div class="countryDataItem">
        <canvas :id="country + '_' + 'new_cases'"></canvas>
        <canvas :id="country + '_' + 'total_cases'"></canvas>
        <canvas :id="country + '_' + 'new_deaths'"></canvas>
        <canvas :id="country + '_' + 'total_deaths'"></canvas>
    </div>
</template>

<script>
import Chart from '../../../../node_modules/chart.js'

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
            OPTIONS: Object.freeze({
                "DAYS_7": 7,
                "DAYS_30": 30
            })
        }
    },
    computed: {

    },
    methods: {
        preprocessData(id) {
           
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
                    index > countryData.data.length - this.OPTIONS.DAYS_30; index--) { 

                    data.push(this.getLabelAndData(countryData.data[index], id));
                }
            }
            // total cases
            if(id == this.ID.ID_02) {
                for(let index = countryData.data.length - 1; 
                    index > countryData.data.length - this.OPTIONS.DAYS_30; index--) { 

                    data.push(this.getLabelAndData(countryData.data[index], id));
                }
            }
            // new deaths
            if(id == this.ID.ID_03) {
                for(let index = countryData.data.length - 1; 
                    index > countryData.data.length - this.OPTIONS.DAYS_30; index--) { 

                    data.push(this.getLabelAndData(countryData.data[index], id));
                }
            }
            // total deaths
            if(id == this.ID.ID_04) {
                for(let index = countryData.data.length - 1; 
                    index > countryData.data.length - this.OPTIONS.DAYS_30; index--) { 

                    data.push(this.getLabelAndData(countryData.data[index], id));
                }
            }

            data.reverse(data);
            return data;
        },
        getLabelAndData: function(dayData, id) {

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
        createChart: function(id, data) {

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
                        label: id,
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

            // plot chart
            for(let index = 0; index < Object.keys(this.ID).length; index++) {

                let chartData = new Object;

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
        }
        // IDs being overitten for multiple countries
    },
    mounted: function() {
        this.plotCharts();
    },
    
}
</script>

<style lang="css">
.submitButton {
    width: 10%;
    margin-left: 45%;
    margin-right: 45%;
}

.disabledButton {
    width: 10%;
    margin-left: 45%;
    margin-right: 45%;
    background-color: #d8d8d8;
}
</style>