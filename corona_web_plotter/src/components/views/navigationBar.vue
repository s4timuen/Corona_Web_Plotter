<template>
    <div class="navigation-bar">
        <div>
            |
            <router-link to="/">Home</router-link> |
            <router-link to="/plotter">Plotter</router-link> |
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavigationBar',
    components: {
        
    },
    data: function() {
        return {

        }
    }
}
</script>

<style lang="css">
.navigation-bar {
    background-color: lightgray;
    margin-bottom: 1%;
}
</style>