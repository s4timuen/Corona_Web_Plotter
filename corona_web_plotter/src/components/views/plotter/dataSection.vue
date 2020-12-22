<template>
    <div id="data-section" class="container-fluid">
        <div class="row" v-if="lastUpdated != 'never'">
            <div class="col-12 col-md-12">
                <p>{{ $t("data-section-update-time") }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("data-section-update-notice") }}</p>
            </div>
            <div class="col-12 col-md-12">
                <p>{{ $t("data-section-last-updated") + lastUpdated }}</p>
            </div>
        </div>
        <div class="row" v-for="country in checkedCountries" :key="country">
            <LatestDayData class="col-12" :country="country"
                @last-updated="checkLastUpdated"/>
            <Charts class="col-12" :country="country"/>
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

</style>