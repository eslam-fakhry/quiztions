<template>
    <div
            class="outer grey lighten-2"
    >
        <div
                :style="`transform: scale( ${(progressPercentage)/100},1);`"
                class="inner success"
        />
    </div>
</template>
<script>
    export default {
        name: 'TheProgressBar',

        props: {
            progressPercentage: {type: Number, default: 0}
        }
    }
</script>

<style scoped>
    .outer {
        width: 100%;
        height: 10px;
        border-radius: 500px;
        overflow: hidden;
        position: relative;
    }

    .inner {
        height: 10px;
        width: 100%;
        border-radius: 500px;
        position: absolute;
        transform-origin: left center;
        transition: transform .3s ease-in;
        left: 0;
    }
</style>
