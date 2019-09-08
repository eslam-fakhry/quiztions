<template>
    <div>
        <v-layout
                v-for="(option, index) in items"
                :key="`option--${option}--${index}`"
                class="py-1 items-center"
                data-jest="item"
        >
            <v-flex grow>
                <TheTextField
                        :value="items[index]"
                        @change="update($event,index)"
                />
            </v-flex>
            <v-flex shrink class="px-2">
                <v-container class="fill-height">
                    <v-btn
                            icon
                            @click="removeItem(index)"
                            :disabled="deleteDisabled"
                    >
                        <v-icon color="error">delete</v-icon>
                    </v-btn>
                </v-container>
            </v-flex>
        </v-layout>

        <v-layout class="pt-1 pb-3">
            <v-spacer/>
            <v-flex shrink class="px-2">
                <v-container class="fill-height">
                    <v-btn
                            icon
                            @click="addItem"
                            :disabled="addItemDisabled"
                            data-jest="add-item"
                    >
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import TheTextField from "@/components/TheTextField";

    export default {
        name: "CreateList",

        components: {TheTextField},

        props: {
            value: {type: Array, required: true,},
            min: {type: Number, required: true,},
            max: {type: Number, required: true,},
        },

        data() {
            return {
                items: this.value,
            }
        },

        computed: {
            deleteDisabled() {
                return this.items.length <= this.min;
            },
            addItemDisabled() {
                return this.items.length >= this.max;
            }
        },

        watch: {
            value: {
                immediate: true,
                handler(newValue) {
                    if (newValue.length < this.min) {
                        const diff = this.min - newValue.length
                        for (let i = 0; i < diff; i++) {
                            newValue.push('')
                        }
                        this.items = newValue;
                        this.$emit('input', newValue);
                    }
                }
            },
        },

        methods: {
            update(event, index) {
                this.items[index] = event
                this.$emit('input', this.items)
            },
            addItem() {
                this.items.push('')
                this.$emit('input', this.items)

            },
            removeItem(index) {
                this.items.splice(index, 1)
                this.$emit('input', this.items)
            },
        },
    }
</script>

