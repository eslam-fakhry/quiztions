<template>
    <div style="height: 100%">
        <Loading
                v-if="loading"
        >
        </Loading>
        <v-layout
                v-else
                column
                class=" justify-center align-center "
                style="height: 100%"
        >

            <v-flex shrink v-if="isBodyString">
                <div class="text-center pb-6 mt-6">{{question.body}}</div>
            </v-flex>
            <v-flex shrink v-else>
                <div
                        v-for="(bodyItem,i) in  question.body"
                        class="text-center pb-6 mt-6"
                        :key="`bodyItem--${i}`"
                >
                    <span v-if="bodyItem.text" v-text="bodyItem.text"></span>
                </div>
            </v-flex>

            <v-flex>
                <v-layout column style="height: 100%">
                    <v-flex shrink>
                        <component
                                :is="answerComponentName"
                                ref="Answer"
                                @answered="answered = true"
                                :key="question.id"
                                :ui-state="uiState"
                        ></component>

                    </v-flex>
                    <v-flex grow class="d-flex justify-center align-center">
                       <QuestionFeedback :ui-state="uiState" :feedback="feedback"/>
                    </v-flex>
                    <v-flex shrink class="text-center pb-4">
                        <v-btn
                                outlined
                                @click="answer"
                                :disabled="uiState.NOT_ANSWERED"
                                :loading="validatingAnswer"
                                v-text="submitBtnText"
                        />
                    </v-flex>
                </v-layout>
            </v-flex>

        </v-layout>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    import Loading from './Loading'

    import QuestionMixin from "./mixins/Question"
    import QuestionFeedback from "./QuestionFeedback";

    import SelectionAnswer from "@/components/SelectionAnswer";
    import CompletionAnswer from "@/components/CompletionAnswer";
    import InputAnswer from "@/components/InputAnswer";

    const {mapActions} = createNamespacedHelpers('questions')
    const {mapGetters} = createNamespacedHelpers('answers')

    // Todo: Add answer component in a separate folder and import them dynamically
    const answerComponents = {
        'selection': SelectionAnswer,
        'completion': CompletionAnswer,
        'input': InputAnswer,
    }

    export default {
        name: "Question",

        components: {
            Loading,
            QuestionFeedback,
            SelectionAnswer,
            CompletionAnswer,
            InputAnswer,
        },

        mixins:[QuestionMixin,],

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
                return answerComponents[this.question.type];
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

