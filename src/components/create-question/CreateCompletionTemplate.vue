<template>
    <div>
        <TheTextField
                v-model="template"
                @input="$emit('input',$event)"
        />
        <v-btn>add blank</v-btn>
    </div>
</template>

<script>
    import TheTextField from "@/components/TheTextField";
    export default {
        name: "CreateCompletionTemplate",
        components: {TheTextField},
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

