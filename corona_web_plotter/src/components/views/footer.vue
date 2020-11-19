<template>
    <div class="footer">
        <div class="site-notice">
            <h1>{{ $t("footer-title") }}</h1>
            <p>{{ $t("footer-name") }}<br>{{ $t("footer-address") }}<br>{{ $t("footer-city") }}<br></p>
            <p><strong>{{ $t("footer-title-two") }}</strong><br>{{ $t("footer-phone") }}<br>{{ $t("footer-mail") }}<a href='mailto:tim.muenzinger@yahoo.de'>{{ $t("footer-mail-address") }}</a></p>
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
.footer {
    background-color: lightgray;
    margin-top: 2%;
}
.site-notice {
    margin-top: 3%;
}
</style>