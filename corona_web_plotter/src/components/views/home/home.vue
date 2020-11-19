<template>
    <div class="home">
        <h1>{{ $t("home-title") }}</h1>
        <p>{{ $t("home-information") }}</p> 
        <p>{{ $t("home-annotation") }}</p> 
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
.home {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
