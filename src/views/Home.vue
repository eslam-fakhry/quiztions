<template>
    <div>
        <div>
            {{question.body}}
            <div v-if="question.type === 'choice'">

                <div class=""
                     :class="{
                 blue: ! answered && option === chosenOption ,
                 green: answered && option === question.rightAnswer,
                 red: answered && !correct && option === chosenOption
                 }"
                     v-for="option in question.options"
                     :key="option"
                     @click="! answered && (chosenOption[0] = option)"

                >{{option}}
                </div>

                <v-btn @click="verify" :disabled1="! chosenOption.length">{{answered?'continue':'submit'}}</v-btn>
                <div class="feedback" v-if="answered">{{correct?`you were right, "${chosenOption}" is the answer`:`sorry
                    but
                    "${question.rightAnswer}" is the right answer`}}
                </div>
            </div>
            <div v-else-if="question.type === 'input'">
                <v-textarea v-model="chosenOption" :disabled="answered"></v-textarea>
                <v-btn @click="verify" :loading="loading" :disabled="! chosenOption.length">
                    {{answered?'continue':'submit'}}
                </v-btn>
                <div class="feedback" v-if="answered">{{correct?`you were right, "${chosenOption}" is the answer`:`sorry
                    but
                    "${question.rightAnswer}" is the right answer`}}
                </div>
            </div>
            <div v-else-if="question.type === 'complete'">

                <div>
                    <template v-for="(part,i) in templateParts">
                        <v-text-field v-if="i>0"
                                      :key="`${part}--${i}--text`"
                                      class="d-inline-block"
                                      solo
                                      hide-details
                                      v-model="chosenOption[i-1]"
                        ></v-text-field>
                        <span :key="`${part}--${i}`">

                    {{part}}
                    </span>
                    </template>
                </div>

                <v-btn @click="verify" :loading="loading" :disabled="! chosenOption.length">
                    {{answered?'continue':'submit'}}
                </v-btn>
                <div class="feedback" v-if="answered">{{correct?`you were right, "${chosenOption}" is the answer`:`sorry
                    but
                    "${question.rightAnswer}" is the right answer`}}
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                question: {
                    body: 'complete',
                    serverValidate: false,
                    type: 'complete',
                    template: '--blank-- is the --blank-- darkest color',
                    rightAnswer: ['black', 'blue']
                },
                question2: {
                    body: 'what is the longest river in Africa?',
                    serverValidate: true,
                    type: 'input',
                    rightAnswer: 'Nile'
                },
                question1: {
                    body: 'what is the longest river in Africa?',
                    serverValidate: false,
                    type: 'choice',
                    options: ['Nile', 'Rhine', 'Amazon'],
                    rightAnswer: ['Nile']
                },
                chosenOption: [],
                inputsArray: [],
                correct: false,
                answered: false,
                loading: false,
            }
        },
        methods: {
            verify() {
                this.loading = true

                if (this.question.serverValidate) {
                    this.verifyWithServer()
                    return
                }
                this.correct = this.arraysEqual( this.chosenOption ,this.question.rightAnswer)
                this.answered = true
                this.loading = false
            },
            async verifyWithServer() {
                const _this = this
                await setTimeout(function () {
                    _this.correct = false
                    _this.answered = true
                    _this.loading = false
                }, 2000)

            },
            arraysEqual(a1, a2) {
                /* WARNING: arrays must not contain {objects} or behavior may be undefined */
                return JSON.stringify(a1) == JSON.stringify(a2);
            }
        },
        computed: {
            templateParts() {
                return this.question.template.split('--blank--');
            }
        },
    }
</script>
