<template>
    <div id="footer" class="container-fluid">
        <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <h1>{{ $t("footer-title") }}</h1>
            </div>
            <div class="col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <p>{{ $t("footer-name") }}<br>{{ $t("footer-address") }}<br>{{ $t("footer-city") }}<br></p>
            </div>
            <div class="col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <p><strong>{{ $t("footer-title-two") }}</strong><br>{{ $t("footer-phone") }}<br>{{ $t("footer-mail") }}<a href='mailto:tim.muenzinger@yahoo.de'>{{ $t("footer-mail-address") }}</a></p>
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
