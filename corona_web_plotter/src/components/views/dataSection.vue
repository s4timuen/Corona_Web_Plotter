<template>
    <div class="data-section">
        <div v-if="lastUpdated != 'never'">
            <p>Data is updatet daylie around 11:00 UTC+1 (06:00 AM EST)</p>
            <p>Data has been updatet last: {{ lastUpdated }}</p>
        </div>
        <div class="country-data-container" v-for="country in checkedCountries" :key="country">
            <LatestDayData :jsonData="jsonData" :country="country"
                @last-updated="checkLastUpdated"/>
            <Charts :jsonData="jsonData" :country="country"/>
        </div>
    </div> 
</template>

<script>
import LatestDayData from '@/components/views/latestDayData.vue';
import Charts from '@/components/views/charts.vue';

export default {
    name: 'DataSection',
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
        }
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