<template>
    <div>
        <p class="mt-4 mb-2 text-center grey--text body-1"><span>Already registered? </span>
            <router-link class="light-blue--text " :to="{name:'login'}">login</router-link>
        </p>

        <div class="form-group py-3">
            <v-label class="">Email</v-label>
            <v-text-field
                    class="my-2"
                    outlined
                    single-line
                    label="email"
                    :value="$v.form.email.$model"
                    hide-details
                    :error="showEmailError"
                    :success="! $v.form.email.$invalid"
                    @blur="$v.form.email.$touch()"
                    @input="onEmailInput"

            ></v-text-field>

            <form-input-error
                    :loading="checkingEmail"
                    :active="showEmailError"
                    :message="emailError.message"

                    :route="{name:'login',params:{init_email: form.email} }"
                    :show-link="emailError.showLink "
                    link-text="login"
            />

        </div>
        <div class="form-group py-3">
            <v-label class="">password</v-label>
            <v-text-field
                    class="my-2"
                    outlined
                    single-line
                    label="password"
                    v-model="$v.form.password1.$model"
                    type="password"
                    hide-details
                    :error="showPassword1Error"
                    :success="! $v.form.password1.$invalid"
                    @input="delayTouch($v.form.password1)"
                    @blur="$v.form.password1.$touch()"

            ></v-text-field>
            <!--@input="errors.password1 = ''"-->
            <form-input-error
                    :loading="false"
                    :active="showPassword1Error"
                    :message="password1Error"

            />
        </div>
        <div class="form-group py-3">
            <v-label class="">confirm password</v-label>
            <v-text-field
                    class="my-2"
                    outlined
                    single-line
                    label="confirm password"
                    v-model="$v.form.password2.$model"
                    type="password"
                    hide-details
                    :error="showPassword2Error"
                    :success="! $v.form.password2.$invalid"
                    @blur="$v.form.password2.$touch()"
                    @input="delayTouch($v.form.password2)"

            ></v-text-field>
            <form-input-error
                    :loading="false"
                    :active="showPassword2Error"
                    :message="password2Error"

            />
        </div>
        <div class="py-3">
            <v-btn
                    outlined
                    @click="register"
                    :disabled="false"
                    :loading="registering"
            >Next
            </v-btn>

        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import {required, minLength, email, sameAs} from 'vuelidate/lib/validators'
    import fb from '@/services/firebase-facade'
    import FormInputError from '@/components/FormInputError'
    import {showSnackbar} from "../../../utils";

    const touchMap = new WeakMap()

    export default {
        name: "CredentialsStep",

        components: {
            FormInputError
        },

        props: {
            init_email: {type: String, default: ''},
            init_errors: {
                type: Object,
                default() {
                    return {
                        username: '',
                        email: '',
                        password1: '',
                        password: '',

                    }
                }
            },
        },

        data() {
            return {
                form: {
                    email: this.init_email,
                    password1: '',
                    password2: '',
                },
                errors: this.init_errors,
                checkingEmail: false,
                registering: false,
                existingEmail: 'eslam1000man@gmail.com',
            }
        },

        computed: {
            showEmailError() {
                return (this.$v.form.email.$dirty && this.$v.form.email.$invalid) || !!this.errors.email.length;
            },
            showPassword1Error() {
                return (this.$v.form.password1.$dirty && this.$v.form.password1.$invalid) || !!this.errors.password1.length;
            },
            showPassword2Error() {
                return (this.$v.form.password2.$dirty && this.$v.form.password2.$invalid);
            },
            emailError() {
                if (this.$v.form.email.$dirty && !this.$v.form.email.required) {
                    return {message: 'email field is required', showLink: false}
                } else if (this.$v.form.email.$dirty && !this.$v.form.email.email) {
                    return {message: 'please provide a valid email', showLink: false}
                } else if (this.$v.form.email.$dirty && !this.$v.form.email.isEmailUnique) {
                    return {message: 'this email is already taken', showLink: true}
                } else if (this.errors.email.length) {
                    return {message: this.errors.email, showLink: false}
                }
                return ''
            },
            password1Error() {
                if (this.$v.form.password1.$dirty && !this.$v.form.password1.required) {
                    return 'password field is required'
                } else if (this.$v.form.password1.$dirty && !this.$v.form.password1.strongPassword) {
                    return 'password must contain a letter, a number, a special characters, and minimum length of 8 characters'
                } else if (this.errors.password1.length) {
                    return this.errors.password1
                }
                return ''
            },
            password2Error() {
                if (this.$v.form.password2.$dirty && !this.$v.form.password2.required) {
                    return 'password field is required'
                } else if (this.$v.form.password2.$dirty && !this.$v.form.password2.samePassword) {
                    return 'passwords must match'
                }
                return ''
            },
        },

        methods: {
            // to delay client-side validation for better user experience
            delayTouch($v) {
                $v.$reset();
                if (touchMap.has($v)) clearTimeout(touchMap.get($v));
                touchMap.set($v, setTimeout($v.$touch, 1000));
            },
            // to delay server-side validation for performance
            onEmailInput: _.debounce(function (event) {
                this.$v.form.email.$model = event
            }, 1000),
            register() {
                if (!this.$v.$invalid) {
                    this.registering = true;
                    this.$store.dispatch('user/signUp', {
                        email: this.form.email,
                        password: this.form.password1,
                    })
                        .then(() => {
                            this.registering = false;
                            this.$emit('continue');
                        })
                        .catch(err => {
                            console.log('err: ', err);
                            if (err.code === 'auth/email-already-in-use') {
                                this.errors.email = "User already registered"
                            } else if (err.code === "auth/weak-password") {
                                this.errors.password1 = "Weak password"
                            }
                            this.registering = false;
                        })
                }
            },
        },

        validations: {
            form: {
                email: {
                    required,
                    email,
                    async isEmailUnique(value) {
                        // standalone validator ideally should not assume a field is required
                        if (value === '') return true
                        this.checkingEmail = true
                        const result = await fb.isEmailUnique(value)
                        this.checkingEmail = false
                        return Boolean(result)
                    },
                },
                password1: {
                    required,
                    strongPassword(password1) {
                        return (
                            /[a-zA-z]/.test(password1) && // checks for a-z
                            /[0-9]/.test(password1) && // checks for 0-9
                            /\W|_/.test(password1) &&// checks for special char
                            minLength(8)
                        );
                    }
                },
                password2: {
                    required,
                    samePassword: sameAs('password1')
                },
            },
        },
    }
</script>
