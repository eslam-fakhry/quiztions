<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="">
        <h1 class="text-center">Lessons</h1>
        <v-layout wrap v-if="! loading">
            <v-flex class="child-flex" v-for="lesson in course.lessons" :key="lesson.id">
                <!--v-model="value"-->
                <v-menu
                        :disabled="false"
                        :absolute="false"
                        open-on-hover
                        :close-on-click="false"
                        :close-on-content-click="false"
                        :offset-y="true"
                >
                    <template v-slot:activator="{ on }">
                        <v-layout column align-center class="ma-2">
                            <v-avatar
                                    v-on="on"
                                    to="/"
                                    :size="70"
                                    color="indigo"
                                    class="ma-2"
                            >
                                <v-icon>home</v-icon>
                            </v-avatar>
                            <v-label class="text-center py-1" v-on="on" >{{lesson.name}}</v-label>
                        </v-layout>
                    </template>
                    <v-card>
                        <v-card-text>
                            laksdjfla
                        </v-card-text>
                        <v-card-actions>
                            <v-btn :to="{name:'lesson',params:{lesson_id:lesson.id}}">enter</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-flex>
        </v-layout>
        <Loading v-else></Loading>
    </v-container>
</template>

<script>
    import Loading from '../components/Loading'

    export default {
        name: "Course",
        props: {
            course_id: {
                required: true
            }
        },
        components: {
            Loading
        },
        data() {
            return {
                course: {},
                loading: false,
            }
        },
        watch: {
            course_id: {
                immediate: true,
                async handler(id) {
                    this.loading = true;
                    this.course = await this.$store.dispatch('fetchCourse', {id});
                    this.loading = false;
                }
            }
        },


    }
</script>

<style scoped>

</style>
