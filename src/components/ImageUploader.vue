<template>

    <div>

        <v-container class="fill-height justify-center items-center">
            <v-avatar
                    class="photo-container elevation-7 my-3"
                    :size="120"
            >
                <v-img
                        :width="120"
                        :src="showedImage"
                        :aspect-ratio="1"
                        alt="User profile picture preview"
                >
                    <v-overlay
                            absolute
                            :value="loading"
                    >
                        <v-progress-circular
                                v-if="percentage > 0"
                                :value="percentage*0.9"
                                color="success"
                        />
                    </v-overlay>
                </v-img>
            </v-avatar>
        </v-container>
        <v-file-input
                v-model="file"
                @click:clear="reset"
                color="deep-purple accent-4"
                placeholder="Select your photo"
                prepend-icon="mdi-camera"
                outlined
                :display-size="1000"
        />
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import fb from '@/services/firebase-facade'
    import {showError} from "@/utils";

    const defaultImage = require('@/assets/default-profile-picture.png')
    const {mapActions} = createNamespacedHelpers('user')

    export default {
        name: "UploadImage",

        props: {
            existingImage: {}
        },

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
            },
            showedImage() {
                return this.image || this.existingImage || defaultImage
            }
        },

        watch: {
            file(newValue) {
                this.createImage(newValue)
            }
        },

        methods: {
            ...mapActions(['updatePhotoURL']),
            reset() {
                this.file = null
                this.image = ''
                this.percentage = 0
                this.fullPath = ''
            },
            createImage(file) {
                if (!this.file) return;
                const reader = new FileReader();
                reader.onload = (e) => this.image = e.target.result
                reader.readAsDataURL(file);
            },
            uploadImage() {
                if (!this.file) return;
                const ext = this.getExtension(this.file.name)
                const profilesRef = this.getProfileRef(ext)
                this.fullPath = profilesRef.fullPath
                const task = profilesRef.put(this.file)
                task.on('state_changed', this.progress, this.errorCallback, this.completeHandler)
            },
            getExtension: function (fileName) {
                return fileName.substr(fileName.lastIndexOf('.') + 1);
            },
            getProfileRef: function (extension) {
                const userId = fb.auth.currentUser.uid
                return fb.storage.ref('profiles').child(userId + '.' + extension);
            },
            progress(snapshot) {
                this.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
            },
            errorCallback(err) {
                showError(err.code)
            },
            completeHandler() {
                this.updatePhotoURL(this.fullPath).then(() => {
                    this.reset()
                    this.$emit('uploaded')
                })
            },
        },
    }
</script>

<style scoped>
    .photo-container {
        border: 2px solid white;
    }
</style>
