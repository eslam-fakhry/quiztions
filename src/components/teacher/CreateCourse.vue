<template>
    <v-layout column>
        <v-flex>
            Create Course
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
        name: "CreateCourse",



        data() {
            return {
                name: "",
                saved: false,

            }
        },

        methods: {
            next(){
              return this.saved ? this.addLesson() :this.SaveCourse()
            },
            SaveCourse() {
                console.log('course saved')
                this.saved = true
            },
            addLesson() {
                console.log('addLesson');
                this.$router.push({ name: 'add_lesson', params: { courseId: '123' } })
            },
        },
    }
</script>

<style scoped>

</style>
