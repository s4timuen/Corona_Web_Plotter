<template>
    <div class="plotter">
      <div>
        <h1>Corona Web Plotter</h1>
      </div>
      <CountrySelection :countries="countries" 
              @update-checked-countries="updateCheckedCountries"/>
            
      <DataSection :jsonData="jsonData"
              :checkedCountries="checkedCountries"/>
    </div>
</template>

<script>
import CountrySelection from '@/components/views/countrySelection.vue';
import DataSection from '@/components/views/dataSection.vue';

export default {
  name: 'Plotter',
  components: {
    CountrySelection,
    DataSection
  },
  data: function() {
    return {
      jsonData: {},
      countries: [],
      checkedCountries: []
    }
  },
  methods: {
      updateCheckedCountries: function(checkedCountries) {
          this.checkedCountries = checkedCountries;
      }
  },
  computed: {

  },
  mounted: function() {
      const THIS = this;
      // get data from web
      new Promise(function() {
            fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json")
            .then(async function(response) { 
                THIS.jsonData = await response.json(); 
            })           
            .then(function() {
                // get countries
                for(let index = 0; index < Object.keys(THIS.jsonData).length; index++) { 
                 THIS.countries.push(Object.values(THIS.jsonData)[index].location);                                
                }
            })
            .catch(error => { throw error; })
      });
  } 
}
</script>

<style lang="css">
.plotter {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
