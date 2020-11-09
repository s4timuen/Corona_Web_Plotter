<template>
  <div id="app">
    <CountrySelection :countries="countries" 
            @update-checked-countries="updateCheckedCountries"/>
        
    <DataSection :jsonData="jsonData"
            :checked-countries="checkedCountries"/>
  </div>
</template>

<script>
import CountrySelection from '@/components/views/countrySelection.vue'
import DataSection from '@/components/views/dataSection.vue'

export default {
  name: 'App',
  components: {
    CountrySelection,
    DataSection
  },
  data: function() {
    return {
      jsonData: Object,
      countries: [],
      checkedCountries: []
    }
  },
  methods: {
      updateCheckedCountries: function(checkedCountries) {
          this.checkedCountries = checkedCountries;
      }
  },
  mounted: function() {
      // get data from web
      const THIS = this;
      new Promise(function() {
            fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json")
            .then(async function(response) { 
                THIS.jsonData = await response.json(); }) 
            .then(function() {
                for(let index = 0; index < Object.keys(THIS.jsonData).length; index++) { 

                 THIS.countries.push(Object.values(THIS.jsonData)[index].location);                                
                }
            })
            .catch(error => { throw error; })
      });
  } 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
