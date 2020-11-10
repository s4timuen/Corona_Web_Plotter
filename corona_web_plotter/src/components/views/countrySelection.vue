<template>
    <form @submit.prevent="onSubmit">
        <div class="countrySelectionContainer" >
            <div class="countrySelectionItem" v-for="country in sortedCountryList" :key="country">
                <input type="checkbox" :id="country" :value="country" v-model="checkedCountries"/>
                <label for="country">{{ country }}</label>
            </div>
        </div>
        <input class="submitButton" type="submit" value="Plot Charts"/>
    </form>   
</template>

<script>
export default {
    name: 'CountrySelection',
    components: {

    },
    props: {
        countries: {
            type: Array,
            required: true
        }
    },
    data: function() {
        return {

        }
    },
    computed: {
        sortedCountryList: function() {
            let sortedList = this.countries.slice(0).sort();
            return sortedList;
        }
    },
    methods: {
        // plot charts button
        onSubmit: function() {
            this.$emit("update-checked-countries", this.checkedCountries)
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
.countrySelectionContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: flex-start;
    align-content: flex-start;
}

.countrySelectionItem {
    width: 25%;
    margin: 0px;
    display: flex;
}

.submitButton {
    width: 10%;
    margin-left: 45%;
    margin-right: 45%;
}
</style>