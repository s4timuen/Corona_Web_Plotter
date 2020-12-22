<template>
    <div id="navigation-bar" class="container-fluid">
        <div class="row"> 
            <div class="col-1 col-md-4">
                <router-link to="/">{{ $t("navigation-bar-home") }}</router-link>
            </div> 
            <div class="col-1 col-md-4">
                <router-link to="/plotter">{{ $t("navigation-bar-plotter") }}</router-link>
            </div> 
            <div class="col-1 col-md-4">
                <label for="locale">{{ $t("navigation-bar-locale") }}</label>
                <select id="locale" v-model="$i18n.locale">
                    <option v-for="locale in locales" :key="locale" :value="locale">{{ locale }}</option>
                </select> 
            </div> 
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
            locales: ["en", "de"]
        };
    }
}
</script>

<style lang="css">

</style>
