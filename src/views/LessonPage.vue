<template>
    <v-layout column style="height: 100%;">
        <v-flex shrink>
            <router-link :to="{name:'home'}">go home</router-link>
        </v-flex>
        <v-flex grow>
            <Lesson v-if="! loading"
                    :key="`lesson-${lesson_id}`"
                    :lesson="lesson"
                    :can-navigate="true"
            />
            <Loading v-else/>
        </v-flex>
    </v-layout>
</template>

<script>

    import {mapGetters} from 'vuex'

    import Lesson from '../components/Lesson'
    import Loading from '../components/Loading'
    export default {
        name: "LessonPage",
        props: {
            lesson_id: {
                required: true
            },
        },
        components: {
            Lesson,
            Loading,
        },
        data() {
            return {
                loading: false,
                lesson: {},
            }
        },
        computed: {
            ...mapGetters(['lessons']),
        },
        watch: {
            lesson_id: {
                immediate: true,
                async handler(id) {
                    this.loading = true;
                    this.lesson = await this.$store.dispatch('fetchLesson', {id});
                    this.loading = false;
                }
            }
        },
    }
</script>

<style scoped>

</style>
