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
        }
    },
    template: `
    <form @submit.prevent="onSubmit">
        <div v-for="country in countries">
            <input type="checkbox" id="country" :value="country" v-model="checkedCountries"></input>
            <label for="country">{{ country }}</label>
        </div>
        <input type="submit" value="Submit"></input>
    </form>  
    `
});

// display graphs component
Vue.component("graphs-section", {
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
            graphs: []
        }
    },
    computed: {
       
    },
    watch: {
        checkedCountries: function() {
            this.plottCharts();
        }
    },
    methods: {
        plottCharts: function() {

            var charts = [];

            // plot all charts
            this.checkedCountries.forEach(function(countryName) {
                
                var dataToPlot;

                // get single object to plot
                this.jsonDataforEach(function(countryObject) {
                    
                    if(countryObject.location == countryName) {
                        dataToPlot = countryObject;
                    }
                });

                //todo

                // plot single chart
                // from current day data
 
                // set context (canvasId)
                var context = document.getElementById().getContext("2d");
                var cahrt = new Chart(context, {
                    type: "line"
                });


                charts.push(chart);
            });
        }
    },
    template: `
    <div>
        <div v-for="chart in charts">
            <canvas id="" width="200px" height="200px"></canvas>
        </div>
    </div>
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
 * plot and sisplay charts
 * sessioning
 * check if new data available and cach json (>40mb file) 
 * styling
 */
