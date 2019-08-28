
import {createNamespacedHelpers} from 'vuex'
const {mapActions} = createNamespacedHelpers('user')
export default {
    data() {
        return {
            loading: true
        }
    },

    async created() {
        this.loading = true
        await this.fetchUserCourses()
        this.loading = false
    },

    methods: {
        ...mapActions(['fetchUserCourses']),

    },
}
