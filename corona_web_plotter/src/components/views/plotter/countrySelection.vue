<template>
    <div id="country-selection" class="container-fluid">
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="onSubmit">
                    <div class="row">
                        <div class="col-12 col-md-4 col-lg-2 d-flex justify-content-start" v-for="country in sortedCountryList" :key="country">
                            <input type="checkbox" :value="country" v-model="checkedCountries">
                            <label v-if="$te(country)">{{ $t(country) }}</label>
                            <label v-if="!$te(country)">{{ country }}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-12 d-flex justify-content-center">
                            <input class="submit-button" type="submit" :value="localeButton" :disabled="!this.$store.getters.countries.length"/>
                        </div>
                    </div>
                </form> 
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'CountrySelection',
    components: {

    },
    data: function() {
        return {
            checkedCountries: []
        };
    },
    computed: {
        sortedCountryList: function() {
            let sortedList = this.$store.getters.countries.slice(0).sort();
            return sortedList;
        },
        localeButton: function() {
            return this.$t("country-selection-button");
        }
    },
    methods: {
        // plot charts button
        onSubmit: function() {
            this.$emit("update-checked-countries", this.checkedCountries);
            localStorage.setItem("checkedCountries", JSON.stringify(this.checkedCountries));
        }
    },
    mounted: function() {
        // get preselection from local storage
        if(localStorage.getItem("checkedCountries")) {
            this.checkedCountries = JSON.parse(localStorage.getItem("checkedCountries"));
        }
    } 
}
</script>

<style lang="css">

</style>
