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

                <Answer
                        @continue="$emit('continue')"
                        @result="$emit('result',$event)"
                />

            </v-flex>

        </v-layout>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapActions} = createNamespacedHelpers('questions')

    import Answer from "../components/Answer";
    import Loading from './Loading'

    export default {
        name: "Question",
        components: {
            Answer,
            Loading,

        },
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

        methods: mapActions(['fetchQuestion']),

        computed: {
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
    }
</script>

