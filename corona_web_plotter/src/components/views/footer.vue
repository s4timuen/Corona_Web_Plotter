<template>
    <div class="footer">
        <div class="site-notice">
            <h1>Site Notice</h1>
            <p>{{ name }} <br> {{ address }} <br> {{ city }} <br></p>
            <p> <strong>Contact: </strong> <br> Phone: {{ phone }} <br> E-Mail: <a href='mailto:tim.muenzinger@yahoo.de'>{{ mail }}</a> <br> </p>
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
            name: "Tim Münzinger",
            address: "under the bridge",
            city: "90001 Los Angeles",
            phone: "123456789",
            mail: "tim.muenzinger@yahoo.de"
        }
    }
}
</script>

<style lang="css">
.footer {
    margin-top: 2%;
}
.site-notice {
    background-color: lightgray;
    margin-top: 3%;
}
</style>