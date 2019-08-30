<template>
    <div class="d-flex justify-center align-center fill-height">

<!--        <span>asdfdaf</span>-->
        <looping-rhombuses-spinner
                :animation-duration="2500"
                :rhombus-size="15"
                color="#ff1d5"
        />
    </div>
</template>

<script>
    import { LoopingRhombusesSpinner } from 'epic-spinners'
    export default {
        name: "Loading",

        components: {LoopingRhombusesSpinner}
    }
</script>

<style>
    .loading {
        height: 100%;
        width: 100%;
    }

    .spinner {
        position:static;
    }
</style>
