<template>
    <div class="home">
        <h1>Home</h1>
        <p>{{ information }}</p>
        <p>{{ annotation }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  data: function() {
    return {
        information: "With this Web App you can select countries for which you want to see COVID-19 related data. After plotting the data, you will see the data for the current day and charts for wich you can choose if you want to see the last 7, 30 or all recorded days for each specific country you selected. The used data is from  https://github.com/owid/covid-19-data/tree/master/public/data.",
        annotation: " (Use the 'Plotter' link in the navigation bar to get to the Corona Web Plotter.)"
    }
  },
  methods: {

  },
  computed: {

  },
  mounted: function() {
  } 
}
</script>

<style lang="css">
.home {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
