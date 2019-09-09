<template>
    <div style="height: 100%">
        <Loading
                v-if="loading"
        />
        <v-layout
                v-else
                column
                class=" justify-center align-center "
                style="height: 100%"
        >
            <v-flex shrink>
                <div
                        v-if="isBodyString"
                        class="text-center pb-6 mt-6"
                        v-text="question.body"
                />
                <div
                        v-else
                        v-for="(bodyItem,i) in  question.body"
                        class="text-center pb-6 mt-6"
                        :key="`bodyItem--${i}`"
                >
                    <span
                            v-if="bodyItem.text"
                            v-text="bodyItem.text"
                    />
                </div>
            </v-flex>

            <v-flex shrink>
                <component
                        :is="answerComponentName"
                        ref="Answer"
                        @answered="answered = true"
                        :key="question.id"
                        :ui-state="uiState"
                />
            </v-flex>

            <v-flex
                    grow
                    class="d-flex justify-center align-center"
            >
                <QuestionFeedback :ui-state="uiState" :feedback="feedback"/>
            </v-flex>

            <v-flex
                    shrink
                    class="text-center pb-4"
            >
                <v-btn
                        outlined
                        @click="answer"
                        :ripple="false"
                        :disabled="uiState.NOT_ANSWERED"
                        :loading="validatingAnswer"
                        v-text="submitBtnText"
                />
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import QuestionMixin from "./mixins/Question"
    import Loading from './Loading'
    import QuestionFeedback from "./QuestionFeedback";

    const {mapActions} = createNamespacedHelpers('questions')
    const {mapGetters} = createNamespacedHelpers('answers')

    const answerComponentsLoader = {
        'selection': () => import( "@/components/SelectionAnswer"),
        'completion': () => import( "@/components/CompletionAnswer"),
        'input': () => import( "@/components/InputAnswer"),
    }

    export default {
        name: "Question",

        components: {
            Loading,
            QuestionFeedback,
        },

        mixins: [QuestionMixin,],

        props: {
            questionId: {type: String}
        },

        provide() {
            return {
                question: this.question
            }
        },

        data() {
            return {
                loading: true,
                question: {},
            }
        },

        computed: {
            ...mapGetters(['getRightAnswer']),
            /**
             * @return {string}
             */
            answerComponentName() {
                return answerComponentsLoader[this.question.type];
                // return _.camelCase(this.question.type) + "Answer";
            },
            isBodyString() {
                return typeof this.question.body === 'string';
            },
        },

        watch: {
            questionId: {
                immediate: true,
                async handler(val) {
                    this.loading = true
                    const question = await this.fetchQuestion({id: val})
                    if (question) {
                        // noinspection JSUnusedGlobalSymbols
                        this._provided = {question}
                        this.question = Object.assign({}, question);
                        this.loading = false
                    }
                }
            },
        },

        methods: mapActions(['fetchQuestion']),
    }
</script>

