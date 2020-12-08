<template>
    <div id="plotter" class="container-fluid">
      <div class="row">
        <div class="col-xs-12 col-md-12">
          <h1>{{ $t("plotter-title") }}</h1>
        </div>
      </div>
      <div class="row">
        <CountrySelection class="col-xs-12" @update-checked-countries="updateCheckedCountries"/>
      </div>
      <div class="row">     
        <DataSection class="col-xs-12" :checkedCountries="checkedCountries"/>
      </div>
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

</style>
