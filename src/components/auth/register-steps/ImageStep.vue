<template>
    <div>
        <v-layout justify-center align-center>
            <v-flex shrink>
                <v-avatar
                        class="text-center mx-auto"
                        :size="120"
                >
                    <!--<img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">-->
                    <v-img
                            :width="120"
                            :src="image"
                            :aspect-ratio="1"
                            :gradient="loading?'rgba(25,32,72,.4), rgba(25,32,72,.4)':''"
                            alt="avatar"
                            class="justify-center align-center"
                    >
                        <v-progress-circular
                                v-if="percentage > 0"
                                :value="percentage*0.9"
                                color="success"
                        />
                    </v-img>
                </v-avatar>
            </v-flex>
        </v-layout>
        <v-file-input
                v-model="file"
                color="deep-purple accent-4"
                placeholder="Select your files"
                prepend-icon="mdi-camera"
                outlined
                :display-size="1000"
        />
        <v-btn
                outlined
                @click="uploadImage"
                :disabled="false"
        >Next
        </v-btn>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import fb from '@/services/firebase-facade'
    const {mapActions} = createNamespacedHelpers('user')

    export default {
        name: "ImageStep",

        data() {
            return {
                file: null,
                image: '',
                percentage: 0,
                fullPath: ''
            }
        },

        computed: {
            loading() {
                return this.percentage > 0;
            }
        },

        watch: {
            file(newValue) {
                this.createImage(newValue)
            }
        },

        methods: {
            ...mapActions(['updatePhotoURL']),
            createImage(file) {
                const image = new Image();
                const reader = new FileReader();
                const vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            uploadImage() {
                const name = this.file.name
                const ext = name.substr(name.lastIndexOf('.') + 1);
                const uid = fb.auth.currentUser.uid
                const profilesRef = fb.storage.ref('profiles').child(uid + '.' + ext)

                this.fullPath = profilesRef.fullPath

                const task = profilesRef.put(this.file)

                task.on('state_changed',
                    this.progress,
                    this.errorCallback,
                    this.completeHandler
                )
            },
            progress(snapshot) {
                this.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
            },
            errorCallback(err) {
                showSnackbar('Something went wrong', 'error')
            },

            completeHandler() {
                this.updatePhotoURL(this.fullPath).then(() => {
                    this.$emit('continue')
                })
            },
        },
    }
</script>

