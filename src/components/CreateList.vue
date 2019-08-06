<template>
    <v-list dense>
        <v-list-item
                v-for="(option, index) in items"
                :key="`option--${option}--${index}`"
                data-jest="item"
        >
            <v-list-item-content>
                <v-text-field
                        solo
                        hide-details
                        :value="items[index]"
                        @change="update($event,index)"
                />
            </v-list-item-content>

            <v-list-item-icon>
                <v-btn
                        icon
                        @click="removeItem(index)"
                        :disabled="deleteDisabled"
                >
                    <v-icon color="error">delete</v-icon>
                </v-btn>
            </v-list-item-icon>
        </v-list-item>

        <v-list-item>
            <v-list-item-icon class="py-1">
                <v-btn
                        icon
                        @click="addItem"
                        :disabled="addItemDisabled"
                        data-jest="add-item"

                >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-list-item-icon>
        </v-list-item>

    </v-list>
</template>

<script>
    export default {
        name: "CreateList",
        props: {
            value: {
                type: Array,
                required: true,
            },
            min: {
                type: Number,
                required: true,
            },
            max: {
                type: Number,
                required: true,
            },

        },
        data() {
            return {
                items: this.value,
            }
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

        computed: {
            deleteDisabled() {
                return this.items.length <= this.min;
            },
            addItemDisabled() {
                return this.items.length >= this.max;
            }
        },
        watch:{
            value:{
                immediate:true,
                handler(newValue){
                    if (newValue.length < this.min) {
                        const diff = this.min - newValue.length
                        for (let i=0;i<diff;i++){
                            newValue.push('')
                        }
                        this.items = newValue;
                        this.$emit('input', newValue);
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>
