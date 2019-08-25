import {createNamespacedHelpers} from 'vuex'
const {mapActions} = createNamespacedHelpers('answers')
export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['fetchRightAnswer']),
        validateAnswer(userAnswer, questionId) {
            return this.fetchRightAnswer({id: questionId})
                .then((rightAnswer) =>{
                    return JSON.stringify(userAnswer) === JSON.stringify(rightAnswer);
                })
        }
    },
}
