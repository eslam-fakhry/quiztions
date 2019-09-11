<template>
    <v-text-field
            :value="value"
            @input="$emit('input',$event)"
            @change="$emit('change',$event)"
            :label="label"
            :placeholder="placeholder"
            hide-details
            outlined
            :on="$"
            ref="TextField"
    />
</template>

<script>
    export default {
        name: "TheTextField",

        props: {
            value: {},
            label: {},
            placeholder: {}
        },

        methods: {
            focus() {
               this.$refs.TextField.focus()

            }
        },
    }
</script>


