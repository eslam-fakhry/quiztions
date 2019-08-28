import {createNamespacedHelpers} from 'vuex'
const {mapActions} = createNamespacedHelpers('answers')

export default {
    data() {
        return {
            userAnswer: [],
        }
    },

    methods: {
        ...mapActions(['fetchRightAnswer']),
        validateAnswer(questionId) {
            return this.fetchRightAnswer({id: questionId})
                .then((rightAnswer) =>{
                    return JSON.stringify(this.userAnswer) === JSON.stringify(rightAnswer);
                })
        },
        answer(value){
            this.userAnswer = value
            this.$emit('answered')
        }
    },
}
// TODO: customize userAnswer
