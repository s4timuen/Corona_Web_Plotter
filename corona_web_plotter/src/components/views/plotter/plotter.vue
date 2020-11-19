<template>
    <div class="plotter">
      <div>
        <h1>{{ $t("plotter-title") }}</h1>
      </div>
      <CountrySelection :countries="countries" 
              @update-checked-countries="updateCheckedCountries"/>
            
      <DataSection :jsonData="jsonData"
              :checkedCountries="checkedCountries"/>
    </div>
</template>

<script>
import CountrySelection from "@/components/views/plotter/countrySelection.vue";
import DataSection from "@/components/views/plotter/dataSection.vue";

export default {
  name: "Plotter",
  components: {
    CountrySelection,
    DataSection
  },
    props: {
      jsonData: {
          type: Object,
          required: true
      },
      countries: {
          type: Array,
          required: true
      }
    },
  data: function() {
    return {
      checkedCountries: []
    };
  },
  methods: {
      updateCheckedCountries: function(checkedCountries) {
          this.checkedCountries = checkedCountries;
      }
  },
  computed: {

  },
  mounted: function() {

  }
}
</script>

<style lang="css">
.plotter {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
