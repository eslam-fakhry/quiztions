<!--suppress HtmlUnknownBooleanAttribute -->
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div class="form-group py-3">

            <v-radio-group hide-details v-model="job">
                <!--suppress HtmlUnknownBooleanAttribute -->
                <template v-slot:label>
                    <div>What are you?</div>
                </template>
                <v-radio value="student">
                    <template v-slot:label>
                        <div>A student</div>
                    </template>
                </v-radio>
                <v-radio value="teacher">
                    <template v-slot:label>
                        <div>A teacher</div>
                    </template>
                </v-radio>
            </v-radio-group>
        </div>
        <v-btn
                outlined
                @click="setJob"
                :disabled="false"
        >Next
        </v-btn>

    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import {showError, showSnackbar} from "@/utils";

    const {mapActions} = createNamespacedHelpers('user')

    export default {
        name: "AccountTypeStep",

        data() {
            return {
                job: 'student'
            }
        },

        methods: {
            ...mapActions(['setUserJob']),
            async setJob() {
                try {
                    await this.setUserJob({job: this.job})
                    this.$emit('continue')
                } catch (e) {
                    if (e.code === 'already-exists') {
                        showSnackbar('Account type is already set', 'warning')
                        this.$emit('continue')
                    } else {
                        showError(e.code)
                    }
                }
            },
        },
    }
</script>

