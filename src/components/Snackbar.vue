<template>
    <v-snackbar
            v-model="show"
            :color="color"
            top
            right
    >
        {{ message }}
        <v-btn
                text
                @click="show = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar",

        data() {
            return {
                show: false,
                message: "",
                color: "",

            }
        },

        created() {
            this.$store.watch(state => state.snackbars.message, () => {
                const msg = this.$store.state.snackbars.message
                if (msg !== '') {
                    this.show = true
                    this.message = this.$store.state.snackbars.message
                    this.color = this.$store.state.snackbars.color
                    this.$store.commit('snackbars/SET_TOAST', {message: ''})
                }
            })
        }
    }
</script>

<style scoped>

</style>
