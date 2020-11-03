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
            required: true
        },
        checkedCountries: {
            type: [],
            required: true
        }
    },
    data: function() {
        return {

        }
    },
    computed: {
       updateDay: function() {
            //return Object.values(this.jsonData[0].data)[this.jsonData[0].data.length - 1].date;
       }
    },
    template: `
    <div>
        <p>Data is updatet daylie around 11:00 UTC+1 (06:00 AM EST).</p>
        <p>Data was last updatet: {{ updateDay }}</p>
        <div v-for="country in checkedCountries">
            <current-day-data :jsonData="jsonData"
                :country="country"></current-day-data>
            <chart></chart>
        </div>
    </div>
    `
});

Vue.component("current-day-data", {
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
        currentDateData: function() {

            const THIS = this;

            var today = new Date();
            var yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            today = today.toISOString().slice(0, 10);
            yesterday = yesterday.toISOString().slice(0, 10);

            var countryData;

            // get single country object for plotting
            for(var i = 0; i < Object.keys(jsonData).length; i++) {

                if(Object.values(jsonData)[i].location == this.country) {

                    countryData = Object.values(jsonData)[i];
                }
            }

            // todays data or if not yet updatet yesterdays data
            for(var index = 0; index < countryData.data.length; index++) {

                if((Object.values(countryData.data)[index].date == today) 
                    || (Object.values(countryData.data)[index].date == yesterday 
                    && !Object.values(countryData.data)[index + 1])) {  

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
        this.currentDateData();
    },
    template: `
    <div>
        <p>{{ this.country }}</p>
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

Vue.component("chart", {
    props: {

    },
    data: function() {
        return {
            
        }
    },
    computed: {

    },
    methods: {
        plotCharts: function() {



            // plot all charts

                
                // pre process data for plotting

                
    
                // plot charts

      
        }
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
 * plot and display charts
 * check if new data available and cach json (>40mb file)
 * CLI 
 * styling 
 */
