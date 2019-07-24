<template>
    <div>
        <!--<div v-for="(option, index) in options" :key="`option&#45;&#45;${option}&#45;&#45;${index}`">-->
            <!--<v-text-field :value="options[index]" @change="update($event,index)"></v-text-field>-->
        <!--</div>-->
        <v-list subheader>
            <v-subheader>Options</v-subheader>
            <v-list-tile
                    v-for="(option, index) in options"
                    :key="`option--${option}--${index}`"
            >

                <v-list-tile-content>
                        <v-text-field solo  :value="options[index]" @change="update($event,index)"></v-text-field>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-btn icon @click="removeOption(index)" :disabled="deleteDisabled">
                        <v-icon color="error">delete</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-btn @click="addOption" :disabled="addOptionDisabled"><v-icon>add</v-icon></v-btn>
    </div>
</template>

<script>
    export default {
        name: "CreateOptions",
        props:{
            value:{
                type:Array,
                required:true,
            }
        },
        data() {
            return {
                options: this.value,
            }
        },
        methods: {
            update(event, index) {
                this.options[index] = event
                this.$emit('input', this.options)
            },
            addOption(){
                this.options.push('')
                this.$emit('input', this.options)

            },
            removeOption(index){
                this.options.splice(index,1)
                this.$emit('input', this.options)
            },
        },

        computed: {
            deleteDisabled() {
                return this.options.length < 3;
            },
            addOptionDisabled(){
                return this.options.length > 5;

            }
        },
    }
</script>

<style scoped>

</style>
