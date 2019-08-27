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
                    data-jest="name-field"
            />
        </v-flex>
        <v-flex>
            <v-btn @click="next" v-text="`Save`"></v-btn>
        </v-flex>

    </v-layout>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const {mapActions} = createNamespacedHelpers('courses')

    export default {
        name: "EditCourse",

        data() {
            return {
                name: "",
                saved: false,

            }
        },

        methods: {
            ...mapActions(['createCourse']),
            next() {
                return this.saved ? this.addLesson() : this.SaveCourse()
            },
            SaveCourse() {
                this.createCourse({name: this.name}).then(() => {
                    this.saved = true
                })
            },
            addLesson() {
                console.log('addLesson');
                this.$router.push({name: 'add_lesson', params: {courseId: '123'}})
            },
        },
    }
</script>

