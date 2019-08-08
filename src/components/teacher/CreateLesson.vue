<template>
    <v-layout column>
        <v-flex>
            Create Lesson
        </v-flex>
        <v-flex>
            <v-label>Name</v-label>
            <v-text-field
                    outlined
                    v-model="name"
            />
        </v-flex>
        <v-flex>
            <v-btn @click="next" v-text="`Save`"></v-btn>
        </v-flex>

    </v-layout>
</template>

<script>
    export default {
        name: "CreateLesson",

        props:{
            lesson_id: {
                type:String,
            }
        },

        data() {
            return {
                name: "",
                saved: false,
                loading:false,

            }
        },

        methods: {
            next(){
              return this.saved ? this.addQuestion :this.SaveLesson()
            },
            SaveLesson() {
                console.log('Lesson saved')
                this.saved = true
            },
            addQuestion() {
                console.log('Lesson saved')
                this.saved = true
            },
        },
    }
</script>

<style scoped>

</style>
