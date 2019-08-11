<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div class="form-group py-3">
            <v-label class="">Full Name</v-label>
            <v-text-field
                    class="my-2 form-text-input"
                    outlined
                    single-line
                    label="Full name"
                    hide-details
                    v-model="$v.form.fullName.$model"
                    :error="showFullNameError"
                    :success="$v.form.fullName.$dirty && ! $v.form.fullName.$invalid"
            ></v-text-field>
            <form-input-error
                    :active="showFullNameError"
                    :message="fullNameError"
            />
        </div>

        <div class="form-group py-3">
            <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="form.birthday"
                    persistent
                    full-width
                    width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="form.birthday"
                            label="Picker in dialog"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="form.birthday" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(form.birthday)">OK</v-btn>
                </v-date-picker>
            </v-dialog>
        </div>

        <div v-if="false" class="form-group py-3">
            <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="birthday"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="form.birthday"
                            label="Picker in menu"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="form.birthday" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(form.birthday)">OK</v-btn>
                </v-date-picker>
            </v-menu>
        </div>

        <div class="form-group py-3">

            <v-radio-group
                    hide-details
                    class="mt-0"
                    v-model="form.gender"
            >
                <!--suppress HtmlUnknownBooleanAttribute -->
                <template v-slot:label>
                    <div>Gender</div>
                </template>
                <v-radio value="m">
                    <template v-slot:label>
                        <div>Male</div>
                    </template>
                </v-radio>
                <v-radio value="f">
                    <template v-slot:label>
                        <div>Female</div>
                    </template>
                </v-radio>
            </v-radio-group>
        </div>


        <!--<div class="form-group py-3">-->
        <!--<v-label class="">Last Name</v-label>-->
        <!--<v-text-field-->
        <!--class="my-2 form-text-input"-->
        <!--outlined-->
        <!--single-line-->
        <!--placeholder="last name"-->
        <!--v-model.lazy="$v.form.lastName.$model"-->
        <!--hide-details-->
        <!--:error="$v.form.lastName.$dirty && $v.form.lastName.$invalid"-->
        <!--:success="$v.form.lastName.$dirty && ! $v.form.lastName.$invalid"-->
        <!--&gt;</v-text-field>-->
        <!--<form-input-error-->
        <!--:active="showLastNameError"-->
        <!--:message="lastNameError"-->
        <!--/>-->
        <!--</div>-->


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
    import {createNamespacedHelpers} from 'vuex'

    const {mapState, mapActions} = createNamespacedHelpers('user')
    import {minLength,} from 'vuelidate/lib/validators'
    import FormInputError from '@/components/FormInputError'


    export default {
        name: "InformationStep",

        components: {
            FormInputError
        },

        data() {
            return {
                modal: false,
                form: {
                    fullName: '',
                    birthday: '',
                    gender: '',
                },
            }
        },

        methods: {
            ...mapActions([
                'updateUserInfo',
            ]),
            async updateUser() {
                //  todo implement this function
                if (!this.$v.$invalid) {
                    try {
                        await this.updateUserInfo(this.form)
                        this.$emit('continue')
                    } catch (e) {
                        console.log('[InformationStep:error]',e);
                    }


                }
            },

        },

        computed: {
            ...mapState({
                userUid: state => state.uid
            }),
            showFullNameError() {
                return this.$v.form.fullName.$dirty && this.$v.form.fullName.$invalid;
            },
            fullNameError() {
                if (this.$v.form.fullName.$dirty && !this.$v.form.fullName.minLength) {

                    return "minimum 3 characters"
                }
                return '';
            },
        },

        validations: {
            form: {
                fullName: {
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
