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
    export default {
        name: "Experiment",
        components:{
            CompletionRightAnswers
        },
        data(){
            return{
                rightAnswer:[],
            }
        }
    }
</script>

<style scoped>

</style>
