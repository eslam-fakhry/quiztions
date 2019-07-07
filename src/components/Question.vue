<template>
    <div>
        <div class="question">what is the longest river in africa</div>
        <div class="options">
            <v-btn v-for="(option,index) in options"
                   :key="option"
                   @click.prevent="answer(index)"
            >{{option}}</v-btn>
        </div>
        <div class="feedback" v-if="feedback"> {{feedback}}</div>
    </div>
</template>

<script>
    export default {
        name: "Question",
        data() {
            return {
                options: ['Nile','Rhine','amazon'],
                feedback:'',
            }
        },
        methods: {
            validate(index) {
                return index ===1
            },
            answer(index){

                this.feedback = this.validate(index)?'you are right': 'you are wrong haha'
            },
        },
    }
</script>

<style scoped>

</style>
