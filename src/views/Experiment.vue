<template>
    <div>
        <v-btn @click="doSomthing">do somthing</v-btn>
    </div>

</template>

<script>
    import CompletionRightAnswers from '../components/create-question/CompletionRightAnswers'
    import layoutMixin from "@/layouts/layoutMixin"
    import fb from '@/services/firebase-facade';
    export default {
        name: "Experiment",
        mixins: [layoutMixin,],
        components: {
            CompletionRightAnswers
        },
        data() {
            return {
                rightAnswer: [],
            }
        },

        methods: {
            doSomthing() {
                fb.auth.onAuthStateChanged((user)=>{
                    console.log(user);
                })
            }
        },

    }
</script>

<style scoped>

</style>
