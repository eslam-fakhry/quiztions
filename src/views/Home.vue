<template>
    <div>
        <Courses v-if="job === 'student'"></Courses>
        <TeacherCourses v-else-if="job === 'teacher'"></TeacherCourses>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    import Courses from "@/components/Courses";
    import TeacherCourses from "@/components/TeacherCourses";

    const {mapState} = createNamespacedHelpers('user')

    export default {
        components: {Courses, TeacherCourses},
        data() {
            return {}
        },

        computed: mapState({
            job: state => state.job
        }),
    }
</script>
