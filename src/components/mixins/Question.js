
export default {
    data() {
        return {
            answered:false,
            correct: false,
            answerChecked: false,
            validatingAnswer: false,
            feedback: '',
        }
    },
    methods: {
        async answer() {
            if (!this.answered) return ;
            if (!this.answerChecked) {
                await this.validate()
            } else if (this.answerChecked) {
                this.continueNext()
            }
        },
        async validate() {
            this.validatingAnswer = true;
            this.correct = await this.$refs.Answer.validateAnswer(this.question.id)
            this.$emit('result', {
                question:this.question,
                result:this.correct ? 'right' : 'wrong'
            });
            this.answerChecked = true;
            this.setFeedback();
            this.validatingAnswer = false
        },
        setFeedback() {
            if (this.answerChecked) {
                this.feedback = this.correct ? 'you are right' : 'you are wrong'
            }
        },
        continueNext() {
            this.$emit('continue')
        },
    },
    computed: {
        uiState() {
            return {
                NOT_ANSWERED: !this.answered,
                ANSWER_NOT_CHECKED: this.answered && !this.answerChecked,
                ANSWER_CHECKED: this.answered && this.answerChecked,
                ANSWERED_CORRECTLY: this.answerChecked && this.correct,
                ANSWERED_WRONG: this.answerChecked && !this.correct,
            }
        },
        submitBtnText() {
            return this.uiState.ANSWER_CHECKED ? 'continue' : 'check'
        },
        timed(){
            return !!this.question.time
        },
    },

    created() {
        const enterPressHandler = (event)=>{

            if (event.key === 'Enter') {
                event.preventDefault()
                this.answer();

            }
        };
        document.addEventListener('keypress', enterPressHandler);
        this.$once('hook:activated', () => {
            document.addEventListener('keypress', enterPressHandler)
        })


        this.$once('hook:deactivated', () => {
            document.removeEventListener('keypress', enterPressHandler)
        })
        this.$once('hook:destroyed', ()=> {
            document.removeEventListener('keypress', enterPressHandler)
        })

    },
}
