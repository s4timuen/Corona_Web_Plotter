<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <NavigationBar class="col-xs-12 bg-dark text-light"/>
    </div>  
    <div class="row">
      <div class="col-xs-12 bg-warning">
        <router-view></router-view>
      </div>
    </div>
    <div class="row">
      <Footer class="col-xs-12 bg-dark text-light"/>
    </div>
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

    };
  },
  methods: {
     
  },
  computed: {

  },
  watch: {

  },
  mounted: function() {
    const THIS = this;
    const SOURCE = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json";

    // cookies
    if(!this.$cookies.isKey("cookies-accepted") || this.$cookies.get("cookies-accepted") == "false") { 

      if(confirm(this.$t("app-cookies-question"))) { 
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
        THIS.$store.commit('setJsonData', await response.json());
      })           
      .then(function() {
          // get countries
          for(let index = 0; index < Object.keys(THIS.$store.getters.jsonData).length; index++) { 
          THIS.$store.commit('addCountry', Object.values(THIS.$store.getters.jsonData)[index].location);                                
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
}
</style>
