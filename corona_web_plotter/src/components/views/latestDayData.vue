<template>
    <div>
        <p><b>{{ country }}</b></p>
        <p>New cases: {{ newCases }}</p>
        <p>Total cases: {{ totalCases }}</p>
        <p>New Deaths: {{ newDeaths }}</p>
        <p>Total Deaths: {{ totalDeaths }}</p>
        <p>New cases per million: {{ newCasesPerMillion }}</p>
        <p>Total cases per million: {{ totalCasesPerMillion }}</p>
        <p>New deaths per million: {{ newDeathsPerMillion }}</p>
        <p>Total cases per million: {{ totalDeathsPerMillion }}</p>
    </div> 
</template>

<script>
export default {
    name: 'LatestDayData',
    components: {

    },
    props: {
        jsonData: {
            type: Object,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            newCases: 0,
            totalCases: 0,
            newDeaths: 0,
            totalDeaths: 0,
            newCasesPerMillion: 0,
            totalCasesPerMillion: 0,
            newDeathsPerMillion: 0,
            totalDeathsPerMillion: 0,
        }
    },
    computed: {

    },
    methods: {
        latestDateData: function() {

            //on update checked countries only country name but not values updated

            const THIS = this;

            let today = new Date();
            let yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            today = today.toISOString().slice(0, 10);
            yesterday = yesterday.toISOString().slice(0, 10);

            let countryData;

            // get single country object for data procession
            for(let index = 0; index < Object.keys(this.jsonData).length; index++) {

                if(Object.values(this.jsonData)[index].location == this.country) {

                    countryData = Object.values(this.jsonData)[index];
                }
            }

            // todays data or if not yet updatet yesterdays data
            for(let index = 0; index < countryData.data.length; index++) {

                if((Object.values(countryData.data)[index].date == today) 
                    || (Object.values(countryData.data)[index].date == yesterday 
                    && !Object.values(countryData.data)[index + 1])) {  

                    this.$emit("last-updated", Object.values(countryData.data)[index].date);

                    THIS.newCases = Object.values(countryData.data)[index].new_cases;
                    THIS.totalCases = Object.values(countryData.data)[index].total_cases;
                    THIS.newDeaths = Object.values(countryData.data)[index].new_deaths;
                    THIS.totalDeaths = Object.values(countryData.data)[index].total_deaths;
                    THIS.newCasesPerMillion = Object.values(countryData.data)[index].new_cases_per_million;
                    THIS.totalCasesPerMillion = Object.values(countryData.data)[index].total_cases_per_million;
                    THIS.newDeathsPerMillion = Object.values(countryData.data)[index].new_deaths_per_million;
                    THIS.totalDeathsPerMillion = Object.values(countryData.data)[index].total_deaths_per_million;
                }
            }
        }
    },
    mounted: function() {
        this.latestDateData();
    }
}
</script>

<style lang="css">

</style>