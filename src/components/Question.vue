<template>
    <v-layout
            column
            class=" justify-center align-center "
            style="height: 100%"
    >
        <v-flex shrink>
            <div class="text-center pb-6 mt-6">{{question.body}}</div>
        </v-flex>
        <v-flex>

            <Answer
                    @continue="$emit('continue')"
                    @result="$emit('result',$event)"
            />

        </v-flex>

    </v-layout>
</template>

<script>


    import Answer from "../components/Answer";

    export default {
        name: "Question",
        components: {
            Answer,
        },
        props: {
            question: {type: Object, required: true}
        },
        provide() {
            return {
                question:this.question
            }
        }
    }
</script>

