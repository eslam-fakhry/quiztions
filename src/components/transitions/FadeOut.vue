<template>
    <transition
            name="fade-out"
    >
        <slot/>
    </transition>
</template>

<script>
    export default {
        name: "FadeOut"
    }
</script>

<style scoped>
    .fade-out-enter-active,
    .fade-out-leave-active {
        transition: opacity .3s ease;
    }

    .fade-out-enter,
    .fade-out-leave-to {
        opacity: 0;
    }
</style>
