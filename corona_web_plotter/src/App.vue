<template>
  <div id="app" class="container-fluid">
    <NavigationBar/>
    <div id="content">
      <div>
        <router-view></router-view>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:  whitesmoke;
}
</style>
