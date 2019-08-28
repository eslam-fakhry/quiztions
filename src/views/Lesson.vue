<template>
    <div style="height: 100%">
        <Loading
                v-if="loading"
        />
        <v-layout
                v-else
                column
                style="height: 100%"
        >
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
                              :question-id="questions[currentIndex]"
                              @continue="currentIndex++"
                              v-if="uiState.SHOW_QUESTION"
                    ></Question>

                </keep-alive>

                <ResultMessage :result="uiState.SHOW_SUCCESS?'success':'failure'"
                               v-if="uiState.SHOW_RESULT"
                />
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    //todo fix can-navigate
    /*
     we can use include or exclude props of keep alive to decide when to cache
     or to set max to 0 when not caching

     */
    import {createNamespacedHelpers} from 'vuex'

    import Question from '@/components/Question'
    import ResultMessage from '@/components/ResultMessage'
    import Loading from '@/components/Loading'


    const {mapActions} = createNamespacedHelpers('lessons')

    export default {
        name: "Lesson",
        performance: true,

        components: {
            Question,
            ResultMessage,
            Loading,
        },

        props: {
            lesson_id: {
                type: String,
                required: true,
            }
            // todo: add shuffle on retake option
        },

        data() {
            return {
                loading: true,
                currentIndex: 0,
                score: [],
            }
        },

        methods: {
            ...mapActions(['fetchLesson']),
            prevQuestion() {
                this.currentIndex--
            },
            nextQuestion() {
                this.canGoToNext && this.currentIndex++
                // this.currentIndex++
            },
            addScoreResult(payload) {
                this.score.push({
                    ...payload,
                    index: this.currentIndex,
                })
            },
        },

        computed: {
            componentKey() {
                return this.canNavigate ? this.currentIndex : 'component'
            },
            progressPercentage() {
                return this.score.length / (this.questions.length) * 100
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
                return !this.showSuccess && !this.showFailure
            },
            showSuccess() {
                return this.completed && this.isLastSlide
            },
            showFailure() {
                return this.failed && this.isLastSlide
            },
            completed() {
                return !this.failed && (this.score.length === (this.questions.length))
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
                return this.failed ? this.score.length : this.questions.length;
            },
            canNavigate() {
                return true
            },
            tolerance() {
                return 1
            },
            lesson() {
                return this.$store.state.lessons.lessons[this.lesson_id]
            },
            questions() {
                const questions = this.lesson.questions
                if (questions) {
                    return Object.values(this.lesson.questions)
                }
                return []
            },
        },

        watch: {
            lesson_id: {
                immediate: true,
                async handler(id) {
                    this.loading = true;
                    await this.fetchLesson({id});
                    if (this.lesson) this.loading = false;
                }
            },
            currentIndex(newValue) {
                if (this.failed) return;
                // control the range of currentIndex property
                if (newValue < 0) {
                    this.currentIndex = 0
                } else if (newValue > this.lastSlideIndex) {
                    this.currentIndex = this.lastSlideIndex
                }
            },
        },

        beforeRouteLeave (to, from, next) {
            if (this.completed || this.failed) {
                next()
                return
            }
             window.confirm('Do you really want to leave? you will lose progress!') && next()
        },
    }
</script>

