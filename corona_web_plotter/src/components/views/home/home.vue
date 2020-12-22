<template>
  <div id="home" class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <h1>{{ $t("home-title") }}</h1>
      </div>
      <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <p>{{ $t("home-information") }}</p>
      </div>  
      <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 bg-info">
        <p>{{ $t("home-annotation") }}</p>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  data: function() {
    return {

    };
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

</style>
