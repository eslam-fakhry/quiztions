
<script>
    export default {
        name: "Question",
        data() {
            return {
                options: ['Nile','Rhine','amazon'],
                feedback:'',
            }
        },
        methods: {
            validate(index) {
                return index ===1
            },
            answer(index){

                this.feedback = this.validate(index)?'you are right': 'you are wrong haha'
            },
        },
        render(){
            return this.$scopedSlots.default({

            })
        }
    }
</script>

<style scoped>

</style>
