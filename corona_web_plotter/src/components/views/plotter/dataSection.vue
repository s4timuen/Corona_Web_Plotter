<template>
    <div class="data-section">
        <div v-if="lastUpdated != 'never'">
            <p>{{ $t("data-section-update-time") }}</p>
            <p>{{ $t("data-section-last-updated") + lastUpdated }}</p>
        </div>
        <div class="country-data-container" v-for="country in checkedCountries" :key="country">
            <LatestDayData :jsonData="jsonData" :country="country"
                @last-updated="checkLastUpdated"/>
            <Charts :jsonData="jsonData" :country="country"/>
        </div>
    </div> 
</template>

<script>
import LatestDayData from '@/components/views/plotter/latestDayData.vue';
import Charts from '@/components/views/plotter/charts.vue';

export default {
    name: "DataSection",
    components: {
        LatestDayData,
        Charts
    },
    props: {
        jsonData: {
            type: Object,
            required: true
        },
        checkedCountries: {
            type: Array,
            required: true
        }
    },
    data: function() {
        return {
            lastUpdated: "never"
        };
    },
    computed: {

    },
    methods: {
        checkLastUpdated: function(lastUpdated) {
            this.lastUpdated = lastUpdated;
        }
    } 
}
</script>

<style lang="css">
.data-section {
    margin-top: 3%;
    margin-bottom: 1%;
}
.country-data-container {
    margin-top: 3%;
    margin-bottom: 1%;
}
</style>