<template>
    <div>
        <v-text-field label="course id" v-model="courseId" />
        <v-btn @click="enroll" >Enroll</v-btn>
    </div>

</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const { mapActions} = createNamespacedHelpers('user')

    export default {
        name: "Enrollment",
        data() {
            return {
                courseId: '-Lmltqjkrwhvb4A-IRG7',
            }
        },
        methods:{
            ...mapActions(['enrollInCourse']),
            enroll(){
                this.enrollInCourse({id:this.courseId})
            }
        }

    }
</script>

<style scoped>

</style>
