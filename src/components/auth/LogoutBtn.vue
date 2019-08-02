<template>
    <div @click="logout">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "LogoutBtn",

        methods: {
            logout() {
                this.$store.dispatch('user/signOut')
            }
        },
    }
</script>

<style scoped>

</style>
