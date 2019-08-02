<template>
    <div>
        <div class="form-group py-3">
            <v-label class="">First Name</v-label>
            <v-text-field
                    class="my-2 form-text-input"
                    outlined
                    single-line
                    label="first name"
                    v-model.lazy="$v.form.firstName.$model"
                    hide-details
                    :error="showFirstNameError"
                    :success="$v.form.lastName.$dirty && ! $v.form.firstName.$invalid"
            ></v-text-field>
            <form-input-error
                    :active="showFirstNameError"
                    :message="firstNameError"
            />
        </div>

        <div class="form-group py-3">
            <v-label class="">Last Name</v-label>
            <v-text-field
                    class="my-2 form-text-input"
                    outlined
                    single-line
                    placeholder="last name"
                    v-model.lazy="$v.form.lastName.$model"
                    hide-details
                    :error="$v.form.lastName.$dirty && $v.form.lastName.$invalid"
                    :success="$v.form.lastName.$dirty && ! $v.form.lastName.$invalid"
            ></v-text-field>
            <form-input-error
                    :active="showLastNameError"
                    :message="lastNameError"
            />
        </div>

        <div class="py-3">
            <v-btn
                    outlined
                    @click="updateUser"
                    :disabled="false"
            >Next
            </v-btn>

        </div>
    </div>
</template>

<script>
    import {createNamespacedHelpers } from 'vuex'
    const {mapState, mapActions} = createNamespacedHelpers('user')
    import {minLength,} from 'vuelidate/lib/validators'
    import FormInputError from '../../FormInputError'

    export default {
        name: "InformationStep",

        components: {
            FormInputError
        },

        data() {
            return {
                form: {
                    firstName: '',
                    lastName: '',
                    birthday: '',
                    gender: '',
                    photoURL: 'sd',
                },
            }
        },

        methods: {
            ...mapActions([
                'updateUserInfo'
            ]),
            updateUser() {
                //  todo implement this function
                if (!this.$v.$invalid) {
                    const payload = {
                        userInfo: this.form,
                        id: this.userUid,
                    };
                    this.updateUserInfo(payload).then((res) => {
                        console.log('[InformationStep -- updateUserInfo]: ', res);
                        this.$emit('continue')
                    })


                }
            }
        },

        computed: {
            ...mapState({
                userUid: state => state.uid
            }),
            showFirstNameError() {
                return this.$v.form.firstName.$dirty && this.$v.form.firstName.$invalid;
            },
            showLastNameError() {
                return this.$v.form.lastName.$dirty && this.$v.form.lastName.$invalid;
            },

            firstNameError() {
                if (this.$v.form.firstName.$dirty && !this.$v.form.firstName.minLength) {

                    return "minimum 3 characters"
                }
                return '';
            },
            lastNameError() {
                if (this.$v.form.lastName.$dirty && !this.$v.form.lastName.minLength) {

                    return "minimum 3 characters"
                }
                return '';
            },
        },

        validations: {
            form: {
                firstName: {
                    minLength: minLength(3),
                },
                lastName: {
                    minLength: minLength(3),
                },

            },
        },
    }
</script>

<style scoped>
    /*noinspection CssUnusedSymbol*/
    .form-text-input /deep/ .v-input__slot {
        border-width: 1px !important;
    }
</style>
