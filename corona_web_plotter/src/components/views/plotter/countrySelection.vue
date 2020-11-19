<template>
    <form @submit.prevent="onSubmit">
        <div class="country-selection-container" >
            <div class="country-selection-item" v-for="country in sortedCountryList" :key="country">
                <input class="checkbox" type="checkbox" :value="country" v-model="checkedCountries">
                <label class="label" >{{ country }}</label>
            </div>
        </div>
        <input class="submit-button" type="submit" value="Plot Charts"/>
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
            checkedCountries: []
        };
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
.country-selection-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: flex-start;
    align-content: flex-start;
    margin-top: 3%;
}

.country-selection-item {
    width: 25%;
    margin: 0px;
    display: flex;
}

.submit-button {
    width: 10%;
    margin-left: 45%;
    margin-right: 45%;
    margin-top: 2%;
}

.checkbox{
    margin-top: 1%;
    margin-right: 2%;
}

.label {
    margin-bottom: 0%;
}
</style>