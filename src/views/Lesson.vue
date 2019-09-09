<template>
    <div class="page">
        <Loading
                v-if="loading"
        />
        <v-layout
                v-else
                column
                style="height: 100%"
        >
            <v-flex shrink>
                <v-layout justify-space-between class="lesson-nav align-center">
                    <v-btn
                            icon small grey rounded
                            @click="prevQuestion"
                            :disabled="prevDisabled"
                            v-if="canNavigate"
                    >
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <TheProgressBar :progress-percentage="progressPercentage"/>
                    <v-btn
                            icon small grey rounded
                            @click="nextQuestion"
                            :disabled="nextDisabled"
                            v-if="canNavigate"
                    >
                        <v-icon>chevron_right</v-icon>
                    </v-btn>
                </v-layout>
            </v-flex>

            <v-flex grow>
                <FadeOut
                        name="question"
                        mode="out-in"
                >
                    <!--Setting exclude=Question for optimization when navigation not allowed-->
                    <keep-alive
                            :exclude="!canNavigate?'Question':''"
                    >
                        <Question
                                :key="`${keyPrefix}--${currentIndex}`"
                                @result="addScoreResult"
                                :question-id="questions[currentIndex]"
                                @continue="currentIndex++"
                                v-if="uiState.SHOW_QUESTION"
                        />
                    </keep-alive>
                </FadeOut>
                <ResultMessage
                        :result="uiState.SHOW_SUCCESS?'success':'failure'"
                        v-if="uiState.SHOW_RESULT"
                />
            </v-flex>
        </v-layout>
        <v-dialog
                v-model="isConfirmationModalOpen"
                persistent
                max-width="350"
        >
            <v-card>
                <v-card-title class="headline">
                    Confirm
                </v-card-title>
                <v-card-text>Do you really want to leave? <br> You will lose progress!</v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn text @click="exit(false)">Cancel</v-btn>
                    <v-btn color="error darken-1" @click="exit(true)">Exit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import {shuffle} from "@/utils";
    import Question from '@/components/Question'
    import ResultMessage from '@/components/ResultMessage'
    import Loading from '@/components/Loading'
    import FadeOut from '@/components/transitions/FadeOut'
    import TheProgressBar from "@/components/TheProgressBar";

    const {mapActions} = createNamespacedHelpers('lessons')

    export default {
        name: "Lesson",
        performance: true,

        components: {
            TheProgressBar,
            Question,
            ResultMessage,
            Loading,
            FadeOut,
        },

        props: {
            lesson_id: {type: String, required: true,}
        },

        data() {
            return {
                isConfirmationModalOpen: false,
                loading: true,
                currentIndex: 0,
                score: [],
                exitCallback: null,
                // used to clear cached questions when lesson is retaken
                keyPrefix: '--'
            }
        },

        computed: {
            lesson() {
                return this.$store.state.lessons.lessons[this.lesson_id]
            },
            questions() {
                const questions = this.lesson.questions
                // keyPrefix is used to reshuffle the questions when lesson is retaken
                return (questions && this.keyPrefix) ? shuffle(Object.values(this.lesson.questions)) : []
            },
            canNavigate() {
                return this.lesson.canNavigate
            },
            tolerance() {
                return this.lesson.tolerance || 3
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
                return this.succeeded && this.isLastSlide
            },
            showFailure() {
                return this.failed && this.isLastSlide
            },
            succeeded() {
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
                return -1 !== this.score.findIndex(score => score.index === this.currentIndex)
            },
            isLastSlide() {
                return this.currentIndex === this.lastSlideIndex
            },
            lastSlideIndex() {
                return this.failed ? this.score.length : this.questions.length;
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

        async beforeRouteLeave(to, from, next) {
            if (this.succeeded || this.failed) return next()
            await this.confirm(next)
        },

        methods: {
            ...mapActions(['fetchLesson']),
            prevQuestion() {
                this.currentIndex--
            },
            nextQuestion() {
                this.canGoToNext && this.currentIndex++
            },
            addScoreResult(payload) {
                this.score.push({
                    ...payload,
                    index: this.currentIndex,
                })
            },
            confirm(cb) {
                const vm = this
                this.isConfirmationModalOpen = true;
                return new Promise((resolve) => {
                    vm.exitCallback = (toProceed) => {
                        cb(toProceed)
                        resolve()
                    }
                })
            },
            exit(toExit) {
                if (this.exitCallback) this.exitCallback(toExit)
                this.resetExitCallback()
            },
            resetExitCallback() {
                this.exitCallback = null
                this.isConfirmationModalOpen = false
            },
            reset() {
                this.score = []
                this.exitCallback = null
                this.currentIndex = 0
                this.isConfirmationModalOpen = false
                this.keyPrefix = Math.random() + '--'
            },
        },
    }
</script>

