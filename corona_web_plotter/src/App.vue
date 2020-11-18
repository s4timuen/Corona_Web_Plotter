<template>
  <div id="app" class="container-fluid">
    <NavigationBar/>
    <div id="content">
      <div>
        <router-view :jsonData="jsonData" :countries="countries"></router-view>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavigationBar from '@/components/views/navigationBar.vue';
import Footer from '@/components/views/footer.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
    Footer
  },
  data: function() {
    return {
      jsonData: {},
      countries: []
    }
  },
  methods: {
     
  },
  computed: {

  },
  mounted: function() {

    const THIS = this;
    const SOURCE = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json";

    // cookies
    if(!this.$cookies.isKey("cookies-accepted") || this.$cookies.get("cookies-accepted") == "false") { 

      if(confirm("Do you accept the cookies?")) {
        this.$cookies.set("cookies-accepted", "true", "30d");
      }
      else {
        this.$cookies.set("cookies-accepted", "false", "30d");
      }
    }

    // get data from web
    new Promise(function() {
      fetch(SOURCE)
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:  whitesmoke;
}
</style>
