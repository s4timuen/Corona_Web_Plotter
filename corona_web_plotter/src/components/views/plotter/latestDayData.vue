<template>
    <div id="last-day-data" class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-12">
                <p><b>{{ $t(country) }}</b></p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-new-cases") + newCases }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-total-cases") + totalCases }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-new-deaths") + newDeaths }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-total-deaths") + totalDeaths }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-new-cases-per-million") + newCasesPerMillion }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-total-cases-per-million") + totalCasesPerMillion }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-new-deaths-per-million") + newDeathsPerMillion }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-total-deaths-per-million") + totalDeathsPerMillion }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-new-tests") + newTests }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-total-test") + totalTests }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-new-tests-per-thousand") + newTestsPerThousand }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-total-tests-per-thousand") + totalTestsPerThousand }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-positive-rate") + positiveRate }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("last-day-data-test-per-case") + testsPerCase }}</p>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'LatestDayData',
    components: {

    },
    props: {
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
            newTests: 0, 
            totalTests: 0, 
            newTestsPerThousand: 0, 
            totalTestsPerThousand: 0, 
            positiveRate: 0, 
            testsPerCase: 0 
        };
    },
    computed: {

    },
    methods: {
        latestDateData: function() {
            const THIS = this;

            let today = new Date();
            let yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            today = today.toISOString().slice(0, 10);
            yesterday = yesterday.toISOString().slice(0, 10);

            let countryData;

            // get single country object for data procession
            for(let index = 0; index < Object.keys(this.$store.getters.jsonData).length; index++) {

                if(Object.values(this.$store.getters.jsonData)[index].location == this.country) {
                    
                    countryData = Object.values(this.$store.getters.jsonData)[index];
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
                    THIS.newTests = Object.values(countryData.data)[index].new_tests;
                    THIS.totalTests = Object.values(countryData.data)[index].total_tests;
                    THIS.newTestsPerThousand = Object.values(countryData.data)[index].new_test_per_thousand;
                    THIS.totalTestsPerThousand = Object.values(countryData.data)[index].total_tests_per_thousand;
                    THIS.positiveRate = Object.values(countryData.data)[index].positive_rate;
                    THIS.testsPerCase = Object.values(countryData.data)[index].test_per_case;
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