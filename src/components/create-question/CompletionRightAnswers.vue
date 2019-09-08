<template>
    <div>
        <div class="px-4 py-4">
            <template v-for="(part,i) in templateParts">
                <v-chip
                        v-if="i>0"
                        :key="`blank--${i}`"
                        v-text="i"
                        @click="focusTextField(i)"
                        class="mx-1 px-4"
                        outlined
                        data-jest="blank"
                />
                <span
                        :key="`${part}--${i}`"
                        v-text="part"
                        v-if="part.length"
                        data-jest="text-part"

                />
            </template>
        </div>

        <div>
            <v-layout
                    v-for=" index in blankNum"
                    :key="index"
                    class="py-1"
            >
                <v-flex shrink><v-container class="fill-height">
                    <v-chip
                            v-text="index"
                            @click="focusTextField(index)"
                            class="mx-2 px-4"
                            outlined
                    />
                </v-container></v-flex>
                <v-flex>
                    <TheTextField
                            v-model="items[index-1]"
                            ref="blankTextField"
                            data-jest="blank-text-field"
                    />
                </v-flex>
            </v-layout>
        </div>
        <v-list dense v-if="false">
            <v-list-item
                    v-for=" index in blankNum"
                    :key="`blank-text-field--${index}`"
            >
                <v-list-item-content class="d-flex">
                    <v-flex shrink>
                        <v-chip
                                v-text="index"
                                @click="focusTextField(index)"
                                class="mx-2 px-4"
                                outlined
                        />
                    </v-flex>
                   <v-flex>
                       <v-text-field
                               :autofocus="index===1"
                               v-model="items[index-1]"
                               data-jest="blank-text-field"
                               ref="blankTextField"
                               outlined
                               hide-details
                       />
                   </v-flex>

                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
    import TheTextField from "@/components/TheTextField";
    export default {
        name: "CompletionRightAnswers",

        components: {TheTextField},

        props: {
            template: { type: String, required: true },
            value:{ type:Array, required: true, },
            blankSymbol: { type: String, default: '--blank--' }
        },

        data() {
            return {
                items: this.value
            }
        },

        computed: {
            blankNum() {
                // noinspection JSCheckFunctionSignatures
                const re = new RegExp(this.blankSymbol, "g");
                return (this.template.match(re) || []).length
            },
            templateParts() {
                return this.template.split(this.blankSymbol);
            },
        },

        watch: {
            items:{
                immediate:true,
                handler() {
                    this.items.length = this.blankNum
                    this.$emit('input',this.items)
                }
            }
        },

        methods: {
            focusTextField(index) {
                this.$nextTick(this.$refs.blankTextField[index-1].focus)
            }
        },
    }
</script>

