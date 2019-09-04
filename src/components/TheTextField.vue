<template>
    <v-text-field
            :value="value"
            @input="$emit('input',$event)"
            @change="$emit('change',$event)"
            :label="label"
            :placeholder="placeholder"
            hide-details
            outlined
    />
</template>

<script>
    export default {
        name: "TheTextField",

        props: {
            value: {},
            label: {},
            placeholder: {}
        }
    }
</script>


