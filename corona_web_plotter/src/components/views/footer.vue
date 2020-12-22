<template>
    <div id="footer" class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <h1>{{ $t("footer-title") }}</h1>
            </div>

            <div class="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <p>{{ $t("footer-description") }}<br>{{ $t("footer-mail") }}<a href='mailto:tim.muenzinger@yahoo.de'>{{ $t("footer-mail-address") }}</a></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    components: {

    },
    data: function() {
        return {

        };
    }
}
</script>

<style lang="css">

</style>
