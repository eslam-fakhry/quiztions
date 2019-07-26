import questionValidator from '../../services/question-validator'

export default {
    data() {
        return {
            userAnswer: [],
            correct: false,
            answerChecked: false,
            loading: false,
            feedback: '',
            timed: !!this.question.time,
        }
    },
    methods: {
        async answer() {
            if (!this.notAnswered && !this.answerChecked) {
                console.log('validating');
                await this.validate()
            } else if (!this.notAnswered && this.answerChecked) {
                console.log('continue');
                this.continueNext()
            }
        },
        async validate() {
            this.loading = true
            this.correct = await questionValidator.validate(this.userAnswer, this.question, this.question.serverValidate)
            this.$emit('result', this.correct ? 'right' : 'wrong');
            this.answerChecked = true
            this.setFeedback();
            this.loading = false
        },
        setFeedback() {
            if (this.answerChecked) {
                this.feedback = this.correct ? 'you are right' : 'you are wrong'
            }
        },
        continueNext() {
            this.$emit('continue')
        },
        updateAnswer(e){
            this.userAnswer = e
        },
    },
    computed: {
        uiState() {
            return {
                NOT_ANSWERED: this.notAnswered,
                ANSWER_NOT_CHECKED: !this.notAnswered && !this.answerChecked,
                ANSWER_CHECKED: !this.notAnswered && this.answerChecked,
                ANSWERED_CORRECTLY: this.answerChecked && this.correct,
                ANSWERED_WRONG: this.answerChecked && !this.correct,
            }
        },
        notAnswered() {
            return !this.userAnswer.length
        },
        submitBtnText() {
            return this.uiState.ANSWER_CHECKED ? 'continue' : 'check'
        },
    },

    activated() {
        const enterPressHandler = ()=>{

            if (event.key === 'Enter') {
                event.preventDefault()
                this.answer();
                // console.log(_this.question);

            }
        }
        document.addEventListener('keypress', enterPressHandler)

        this.$once('hook:deactivated', ()=> {
            document.removeEventListener('keypress', enterPressHandler)
            console.log('event removed');
        })

    },
}
