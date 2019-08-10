<template>
    <div>
        <CompletionRightAnswers
                template="--blank-- is longest river in --blank--."
                :value="[...rightAnswer]"
                @input="rightAnswer = $event"
        />
    </div>

</template>

<script>
    import CompletionRightAnswers from '../components/create-question/CompletionRightAnswers'
    import layoutMixin from "@/layouts/layoutMixin"

    export default {
        name: "Experiment",
        mixins: [layoutMixin,],
        components: {
            CompletionRightAnswers
        },
        data() {
            return {
                rightAnswer: [],
            }
        }
    }
</script>

<style scoped>

</style>
