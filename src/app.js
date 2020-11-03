Vue.config.devtools = true;
            
// country selection component
Vue.component("country-selection", {
    props: {
        countries: {
            type: [],
            required: true
        }
    },
    data: function() {
        return {
            checkedCountries: []
        }
    },
    computed: {

    },
    methods: {
        onSubmit: function() {
            this.$emit("update-checked-countries", this.checkedCountries)
            localStorage.setItem("checkedCountries", JSON.stringify(this.checkedCountries));
        }
    },
    mounted: function() {
        if(localStorage.getItem("checkedCountries")) {
            this.checkedCountries = JSON.parse(localStorage.getItem("checkedCountries"));
        }
    },
    template: `
    <form @submit.prevent="onSubmit">
        <div class="countrySelectionContainer" >
            <div class="countrySelectionItem" v-for="country in countries">
                <input type="checkbox" id="country" :value="country" v-model="checkedCountries"></input>
                <label for="country">{{ country }}</label>
            </div>
        </div>
        <input class="submitButton" type="submit" value="Plot Charts"></input>
    </form> 
    `
});

// display data component
Vue.component("data-section", {
    props: {
        jsonData: {
            type: Object,
            required: true,
            default: {}
        },
        checkedCountries: {
            type: [],
            required: true
        }
    },
    data: function() {
        return {
            lastUpdated: "never"
        }
    },
    computed: {

    },
    methods: {
        checkLastUpdated: function(lastUpdated) {
            this.lastUpdated = lastUpdated;
        }
    },
    template: `
    <div>
        <div v-if="lastUpdated != 'never'">
            <p>Data is updatet daylie around 11:00 UTC+1 (06:00 AM EST).</p>
            <p>Data has been updatet last: {{ lastUpdated }}</p>
        </div>
        <div class="country-data-container" v-for="country in checkedCountries">
            <latest-day-data :jsonData="jsonData" :country="country"
                @last-updated="checkLastUpdated"></latest-day-data>
            <charts :jsonData="jsonData" :country="country"></charts>
        </div>
    </div>
    `
});

// latest day data component
Vue.component("latest-day-data", {
    props: {
        jsonData: {
            type: Object,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            newCases: 0,
            totalCases: 0,
            newDeaths: 0,
            totalDeaths: 0,
            newCasesPerMillion: 0,
            totalCasesPerMillion: 0,
            newDeathsPerMillion: 0,
            totalDeatchsPerMillion: 0,
        }
    },
    computed: {

    },
    methods: {
        latestDateData: function() {

            const THIS = this;

            var today = new Date();
            var yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            today = today.toISOString().slice(0, 10);
            yesterday = yesterday.toISOString().slice(0, 10);

            var countryData;

            // get single country object for data procession
            for(var index = 0; index < Object.keys(jsonData).length; index++) {

                if(Object.values(jsonData)[index].location == this.country) {

                    countryData = Object.values(jsonData)[index];
                }
            }

            // todays data or if not yet updatet yesterdays data
            for(var index = 0; index < countryData.data.length; index++) {

                if((Object.values(countryData.data)[index].date == today) 
                    || (Object.values(countryData.data)[index].date == yesterday 
                    && !Object.values(countryData.data)[index + 1])) {  

                    this.$emit("last-updated", Object.values(countryData.data)[index].date);

                    THIS.newCases = Object.values(countryData.data)[index].new_cases;
                    THIS.totalCases = Object.values(countryData.data)[index].total_cases;
                    THIS.newDeaths = Object.values(countryData.data)[index].new_deaths;
                    THIS.totalDeaths = Object.values(countryData.data)[index].total_deaths;
                    THIS.newCasesPerMillion = Object.values(countryData.data)[index].new_cases_per_million;
                    THIS.totalCasesPerMillion = Object.values(countryData.data)[index].total_cases_per_million;
                    THIS.newDeathsPerMillion = Object.values(countryData.data)[index].new_deaths_per_million;
                    THIS.totalDeatchsPerMillion = Object.values(countryData.data)[index].total_deaths_per_million;
                }
            }
        }
    },
    mounted: function() {
        this.latestDateData();
    },
    template: `
    <div>
        <p><b>{{ this.country }}</b></p>
        <p>New cases: {{ this.newCases }}</p>
        <p>Total cases: {{ this.totalCases }}</p>
        <p>New Deaths: {{ this.newDeaths }}</p>
        <p>Total Deaths: {{ this.totalDeaths }}</p>
        <p>New cases per million: {{ this.newCasesPerMillion }}</p>
        <p>Total cases per million: {{ this.totalCasesPerMillion }}</p>
        <p>New deaths per million: {{ this.newDeathsPerMillion }}</p>
        <p>Total cases per million: {{ this.totalDeatchsPerMillion }}</p>
    </div>
    `
});

/**
* only charts for: new cases, total cases, new detahs and total deaths are currently plotted
* and only for the last 30 days
* possibly more charts and options
*/
// charts section component
Vue.component("charts", {
    extends: VueChartJs.Line,
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
                "DAYS_7": 8,
                "DAYS_30": 31
            })
        }
    },
    computed: {

    },
    methods: {
        preprocessData(id) {
           
            var data = [];
            var countryData;

            // get data of respective country
            for(var index = 0; index < Object.keys(jsonData).length; index++) {

                if(Object.values(jsonData)[index].location == this.country) {

                    countryData = Object.values(jsonData)[index];
                }
            }

            // new cases
            if(id == this.ID.ID_01) {
                for(var index = countryData.data.length - 1; 
                        index > countryData.data.length - this.OPTIONS.DAYS_30; index--) { 

                    var entry = Object.values(countryData.data)[index].new_cases;
                    data.push(entry);
                }
            }
            // total cases
            if(id == this.ID.ID_02) {
                for(var index = countryData.data.length - 1; 
                    index > countryData.data.length - this.OPTIONS.DAYS_30; index--) { 

                var entry = Object.values(countryData.data)[index].new_cases;
                data.push(entry);
                }
            }
            // new deaths
            if(id == this.ID.ID_03) {
                for(var index = countryData.data.length - 1; 
                    index > countryData.data.length - this.OPTIONS.DAYS_30; index--) { 

                var entry = Object.values(countryData.data)[index].new_cases;
                data.push(entry);
                }
            }
            // total deaths
            if(id == this.ID.ID_04) {
                for(var index = countryData.data.length - 1; 
                    index > countryData.data.length - this.OPTIONS.DAYS_30; index--) { 

                var entry = Object.values(countryData.data)[index].new_cases;
                data.push(entry);
                }
            }

            return data;
        },
        plotCharts: function() {

            // plot chart
            for(var index = 0; index < Object.keys(this.ID).length; index++) {

                var chart = new Object;

                // new cases
                if(index == 0) {
                    chart.id = this.ID.ID_01;
                    chart.data = this.preprocessData(chart.id);

                    this.renderChart(chart.data); 
                }
                // total cases
                if(index == 1) {
                    chart.id = this.ID.ID_02;
                    chart.data = this.preprocessData(chart.id);

                    this.renderChart(chart.data);
                }
                // new deaths
                if(index == 2) {
                    chart.id = this.ID.ID_03;
                    chart.data = this.preprocessData(chart.id);

                    this.renderChart(chart.data);
                }
                // total deaths
                if(index == 3) {
                    chart.id = this.ID.ID_04;
                    chart.data = this.preprocessData(chart.id);

                    this.renderChart(chart.data);
                }         
            }
        }
    },
    mounted: function() {
        this.plotCharts();
    },
    template: `

    `
});

// vue
var app = new Vue({

    el: "#app",
    data: {
        jsonData: Object,
        countries: [],
        checkedCountries: []
    },
    methods: {
        updateCheckedCountries: function(checkedCountries) {
            this.checkedCountries = checkedCountries;
        }
    },
    mounted: function() {
        const THIS = this; 
        // get data from web
        const GET_DATA = new Promise(function() {
                        fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json")
                        .then(async function(response) { 
                            jsonData = await response.json(); }) 
                        .then(function() {
                            for(var i = 0; i < Object.keys(jsonData).length; i++) { 

                                THIS.countries.push(Object.values(jsonData)[i].location);                                
                            }
                        })
                        .catch(error => { throw error; })
        });
    }
});

/** 
 * todo:
 * fix chart ploting
 * chach json file (>40mb) -> check if new available 
 * styling 
 * CLI 
 */
