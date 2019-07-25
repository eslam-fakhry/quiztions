<template>
    <v-layout column style="height: 100%" >
        <v-flex shrink>
            <v-layout justify-space-between class="lesson-nav align-center" v-if="canNavigate">
                <v-btn icon small grey rounded @click="prevQuestion" :disabled="prevDisabled">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-progress-linear :value="progressPercentage"></v-progress-linear>
                <v-btn icon small grey rounded @click="nextQuestion" :disabled="nextDisabled">
                    <v-icon>chevron_right</v-icon>
                </v-btn>
            </v-layout>
        </v-flex>
        <v-flex grow>
            <keep-alive>
                <Question :key="componentKey"
                          @result="addScoreResult"
                          :question="questions[currentIndex]"
                          @continue="currentIndex++"
                          v-if="uiState.SHOW_QUESTION"
                ></Question>
                <Loading key="loading"
                         v-if="uiState.LOADING_QUESTION"
                >
                </Loading>
            </keep-alive>

            <ResultMessage :result="uiState.SHOW_SUCCESS?'success':'failure'"
                           v-if="uiState.SHOW_RESULT"
            />
        </v-flex>
    </v-layout>
</template>

<script>

    import Question from './Question'
    import ResultMessage from './ResultMessage'
    import Loading from './Loading'

    export default {
        name: "Lesson",

        components: {
            Question,
            ResultMessage,
            Loading,
        },

        props: {
            lesson: {
                type: Object,
                required: true
            },
            canNavigate: {
                type: Boolean,
                default: true
            },
            tolerance: {
                type: Number
            },
            // todo: add shuffle on retake option
        },

        data() {
            return {
                questions: [],
                currentIndex: 0,
                score: [],
                loading: true,
            }
        },

        methods: {
            prevQuestion() {
                this.currentIndex--
            },
            nextQuestion() {
                this.canGoToNext && this.currentIndex++
                // this.currentIndex++
            },
            addScoreResult(result) {
                this.score.push({
                    question: this.currentQuestion,
                    result
                })
            },
        },

        computed: {
            componentKey() {
                return this.canNavigate ? this.currentIndex : 'component'
            },
            currentQuestion() {
                return this.questions[this.currentIndex]
            },
            progressPercentage() {
                return this.score.length / (this.lesson.questions.length) * 100
            },
            uiState() {
                return {
                    LOADING_QUESTION: this.loading,
                    SHOW_QUESTION: this.showQuestion,
                    SHOW_SUCCESS: this.showSuccess,
                    SHOW_FAILURE: this.showFailure,
                    SHOW_RESULT: this.showSuccess || this.showFailure,
                }
            },
            showQuestion() {
                return !this.loading && !this.showSuccess && !this.showFailure
            },
            showSuccess() {
                return this.completed && this.isLastSlide
            },
            showFailure() {
                return this.failed && this.isLastSlide
            },
            completed() {
                return !this.failed && (this.score.length === (this.lesson.questions.length))
            },
            failed() {
                return this.wrongAnswerNum > (this.tolerance || 3)
            },
            wrongAnswerNum() {
                return this.score.filter(item => item.result === 'wrong').length
            },
            prevDisabled() {
                return this.currentIndex < 1
            },
            nextDisabled() {
                return !this.canGoToNext || this.isLastSlide
            },
            canGoToNext() {
                return -1 !== this.score.findIndex(score => score.question === this.currentQuestion)
            },
            isLastSlide() {
                return this.currentIndex === this.lastSlideIndex
            },
            lastSlideIndex() {
                return this.failed ? this.score.length : this.lesson.questions.length;
            }
        },

        watch: {
            currentIndex: {
                immediate: true,
                handler: function (newValue) {
                    if (this.failed) return;

                    // control the range of currentIndex property
                    if (newValue < 0) {
                        this.currentIndex = 0
                    } else if (newValue > this.lastSlideIndex) {
                        this.currentIndex = this.lastSlideIndex
                    }


                    // todo: add fetchInAdvance to fetch more questions in background to reduce loading states

                    // check if question is already in component state
                    if (!this.isLastSlide && !this.questions[this.currentIndex]) {

                        this.loading = true

                        const questionId = this.lesson.questions[this.currentIndex]
                        // todo: add error handler
                        this.$store.dispatch('fetchQuestion', {id: questionId})
                            .then((question) => {
                                !this.questions[this.currentIndex] && this.questions.push(question);
                            })
                            .finally(() => this.loading = false)
                    }
                }
            },
        },



    }
</script>

