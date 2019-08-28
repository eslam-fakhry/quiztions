<template>
    <div>
        <v-text-field v-model="template" @input="$emit('input',$event)"></v-text-field>
        <v-btn>add blank</v-btn>
    </div>
</template>

<script>
    export default {
        name: "CreateCompletionTemplate",

        props: {
            value:{
                type:String,
            }
        },

        data() {
            return {
                template: '',
            }
        },

        methods: {
            update(event, index) {
                this.options[index] = event
                // this.$emit('input', this.options)
            }
        },
    }
</script>

