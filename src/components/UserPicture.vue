<template>
    <v-img
            :src="photo"
    />
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const {mapState} = createNamespacedHelpers('user')

    export default {
        name: "UserPicture",

        computed: {
            ...mapState(['photoURL']),
            photo(){
                return  this.photoURL || require('../assets/default-profile-picture.png')
            }
        }
    }
</script>

