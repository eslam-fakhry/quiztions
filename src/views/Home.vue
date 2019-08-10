<template>
    <div>
        <Courses></Courses>
        <div>
            <div class="ma-12 " style="width: 300px;">
            </div>
        </div>
    </div>
</template>

<script>

    import Courses from "@/components/Courses";
    import layoutMixin from "@/layouts/layoutMixin"

    export default {
        mixins: [layoutMixin,],
        components: {Courses},
        data() {
            return {
                // question: {
                //     body: 'complete',
                //     serverValidate: false,
                //     type: 'completion',
                //     template: '--blank-- is the --blank-- darkest color',
                //     rightAnswer: ['black', 'blue']
                // },
                // question2: {
                //     body: 'what is the longest river in Africa?',
                //     serverValidate: false,
                //     type: 'input',
                //     rightAnswer: ['Nile']
                // },
                // question1: {
                //     body: 'what is the longest river in Africa?',
                //     serverValidate: false,
                //     type: 'selection',
                //     options: ['Nile', 'Rhine', 'Amazon'],
                //     rightAnswer: ['Nile']
                // },
            }
        },
    }
</script>
