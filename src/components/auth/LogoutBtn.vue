<script>
    export default {
        name: "LogoutBtn",

        methods: {
            logout() {
                this.$store.dispatch('user/signOut')
            }
        },

        render() {
            return this.$scopedSlots.default({
                logout:this.logout,
            })
        }
    }
</script>

