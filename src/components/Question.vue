<template>
    <v-layout
            column
            class=" justify-center align-center"
            style="height: 100%"
    >
        <div class="text-xs-center pb-4 mt-6">{{question.body}}</div>
        <v-flex>
            <component
                    :is="answerComponentName"
                    :question="question"
                    @continue="$emit('continue')"
                    @result="$emit('result',$event)"
                    :key="question.id"
            ></component>
        </v-flex>
    </v-layout>
</template>

<script>
    import _ from "lodash"

    import SelectionAnswer from "../components/SelectionAnswer";
    import CompletionAnswer from "../components/CompletionAnswer";
    import InputAnswer from "../components/InputAnswer";

    export default {
        name: "Question",
        components: {
            SelectionAnswer,
            CompletionAnswer,
            InputAnswer,
        },
        props: {
            question: {type: Object, required: true}
        },
        computed: {
            /**
             * @return {string}
             */
            answerComponentName() {
                return _.camelCase(this.question.type) + "Answer";
            }
        },
    }
</script>

