<template>
    <div style="width: 100vw;max-width: 300px;">
        <template v-for="(part,i) in templateParts">
            <v-text-field
                    v-if="i>0"
                    :key="`${part}--${i}--text`"
                    :autofocus="i===1"
                    :value="value[i-1]"
                    @input="update($event,i-1)"
                    :disabled="uiState.ANSWER_CHECKED"
                    :style="textInputStyle(value[i-1])"
                    class="d-inline-block deep-purple--text text--accent-4"
                    single-line
                    hide-details
                    data-jest="blank"

            />
            <span
                    :key="`${part}--${i}`"
                    v-if="part.length"
                    data-jest="text-part"
                    v-text="part"
            />
        </template>

    </div>
</template>

<script>
    import {getTextWidth} from "../utils";

    export default {
        name: 'QuestionTemplate',

        inject: ['question'],

        props: {
            chosenOption: {},
            value: {type: Array, required: true},
            uiState: {type: Object, required: true},
        },

        computed: {
            templateParts() {
                const template = this.question.template;
                return template ? template.split('--blank--') : [];
            },
            textInputWidth() {
                return text => {
                    // check existence of text so that it doesn't get passed as the string 'undefined'
                    return text ? Math.max(40, getTextWidth(text)) : 40
                }
            },
            textInputStyle() {
                return text => {
                    return {
                        width: `${this.textInputWidth(text)}px`,
                        maxWidth: '300px'
                    }
                }
            }
        },

        methods: {
            update(e, i) {
                const tmpValue = [...this.value]
                tmpValue[i] = e
                this.$emit('input', tmpValue)
            },
        },
    }
</script>

