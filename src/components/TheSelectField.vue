<template>
    <v-select
            :items="items"
            :label="label"
            :value="value"
            @input="$emit('input',$event)"
            hide-details
            outlined
    />
</template>

<script>
    export default {
        name: "TheSelectField",

        props:{
            items:{},
            label:{},
            value:{},
        }
    }
</script>

