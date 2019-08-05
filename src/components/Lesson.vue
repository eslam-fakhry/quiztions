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
                          :question-id="lesson.questions[currentIndex]"
                          @continue="currentIndex++"
                          v-if="uiState.SHOW_QUESTION"
                ></Question>

            </keep-alive>

            <ResultMessage :result="uiState.SHOW_SUCCESS?'success':'failure'"
                           v-if="uiState.SHOW_RESULT"
            />
        </v-flex>
    </v-layout>
</template>

<script>
    //todo fix can-navigate
    /*
     we can use include or exclude props of keep alive to decide when to cache
     or to set max to 0 when not caching

     */
    import Question from './Question'
    import ResultMessage from './ResultMessage'

    export default {
        name: "Lesson",

        components: {
            Question,
            ResultMessage,
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
                currentIndex: 0,
                score: [],
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
            addScoreResult(payload) {
                // todo add  question from the event
                // todo add index to check if we can go next
                this.score.push({
                    ...payload,
                    index:this.currentIndex,
                })
            },
        },

        computed: {
            componentKey() {
                return this.canNavigate ? this.currentIndex : 'component'
            },
            progressPercentage() {
                return this.score.length / (this.lesson.questions.length) * 100
            },
            uiState() {
                return {
                    SHOW_QUESTION: this.showQuestion,
                    SHOW_SUCCESS: this.showSuccess,
                    SHOW_FAILURE: this.showFailure,
                    SHOW_RESULT: this.showSuccess || this.showFailure,
                }
            },
            showQuestion() {
                return  !this.showSuccess && !this.showFailure
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
                // todo check for failed to continue
                return -1 !== this.score.findIndex(score => score.index === this.currentIndex)
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



                }
            },
        },



    }
</script>

