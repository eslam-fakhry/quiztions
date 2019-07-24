<template>
    <div style="width: 100vw;max-width: 300px;">
        <template v-for="(part,i) in templateParts">
            <v-text-field
                    v-if="i>0"
                    :autofocus="i===1"
                    :key="`${part}--${i}--text`"
                    class="d-inline-block"
                    single-line
                    hide-details
                    :value="value[i-1]"
                    @input="update($event,i-1)"
                    :disabled="uiState.ANSWER_CHECKED"
                    :style="textInputStyle(value[i-1])"
            ></v-text-field>
            <span :key="`${part}--${i}`">
                    {{part}}
            </span>
        </template>

    </div>
</template>
<script>
    import {getTextWidth} from "../utils";

    export default {
        name: 'QuestionTemplate',
        props: {
            chosenOption: {},
            value: {
                type: Array,
                required: true
            },
            template: {
                type: String,
                required: true
            },
            uiState: {
                type: Object,
                required: true
            },
        },
        methods: {
            update(e, i) {
                const tmpValue = [...this.value]
                tmpValue[i] = e
                this.$emit('input', tmpValue)
            },
        },
        computed: {
            templateParts() {
                return this.template.split('--blank--');
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
                        width: `${this.textInputWidth(text) + 30}px`,
                        maxWidth: 300 + 'px'
                    }
                }
            }
        },
    }
</script>
