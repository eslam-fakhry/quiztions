<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="justify-center">
        <v-dialog v-model="modal" persistent max-width="350">
            <template v-slot:activator="{ on }">
                <slot name="activator" :on="on"/>
            </template>
            <v-card>
                <v-card-title class="headline"> <slot name="title"/> </v-card-title>
                <v-card-text> <slot/> </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn text @click="modal = false">Cancel</v-btn>
                    <v-btn color="error darken-1" @click="confirm"><slot name="action-text">Delete</slot></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "ConfirmModal",

        data() {
            return {
                modal: false
            }
        },

        methods: {
            confirm() {
                this.modal = false
                this.$emit('confirmed')
            }
        },
    }
</script>

