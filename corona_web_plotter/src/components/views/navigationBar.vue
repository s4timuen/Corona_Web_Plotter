<template>
    <div class="navigation-bar">
        <div>
            |
            <router-link to="/">{{ $t("navigation-bar-home") }}</router-link> |
            <router-link to="/plotter">{{ $t("navigation-bar-plotter") }}</router-link> |
            <select v-model="$i18n.locale">
                <option v-for="locale in locales" :key="locale" :value="locale">{{ locale }}</option>
            </select> |
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
.navigation-bar {
    background-color: lightgray;
    margin-bottom: 1%;
}
</style>
