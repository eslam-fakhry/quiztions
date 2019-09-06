<template>
    <div>
        <ImageUploader
                ref="Uploader"
                @uploaded="$emit('continue')"
        />
        <v-btn
                outlined
                @click="upload"
                :disabled="false"
        >Next
        </v-btn>
        <v-btn text @click="$emit('continue')">skip</v-btn>
    </div>
</template>

<script>
    import ImageUploader from '@/components/ImageUploader'

    export default {
        name: "ImageStep",

        components: {ImageUploader},

        methods: {
            upload() {
               this.$refs.Uploader.uploadImage()
            }
        },
    }
</script>

