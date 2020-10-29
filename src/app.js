Vue.config.devtools = true;
            
// country selection component
Vue.component("country-selection", {
    props: {
        countries: {
            type: Array,
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

    },
    // todo: generate checkboxes with labels
    template: `

    `,
});

// display graphs component
Vue.component("graphs-section", {
    props: {
        jsonData: {
            type: Object,
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
    methods: {
        plottGraphs: function() {
            // todo
        }
    },
    template: `
    <div v-for="graph in graphs">
        <div>{{ graph }}</div>
    </div>
    `,
});

// vue
var app = new Vue({

    el: "#app",
    data: {
        jsonData: [],
        countries: []
    },
    methods: {

    },
    mounted: function() {
        const THIS = this; 
        // get data from web
        const GET_DATA = new Promise(function() {
                        fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json")
                        .then(async function(response) { 

                            this.jsonData = await response.json(); 
                        }) 
                        .then(function() {

                            for(var i = 0; i < Object.keys(this.jsonData).length; i++) {

                                THIS.countries.push(Object.values(this.jsonData)[i].location);                                
                            }
                        })
                        .catch(error => { throw error; })
        });
    }
});
