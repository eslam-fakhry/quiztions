<template>
    <v-container
            class="fill-height d-flex justify-center"
    >
        <v-card
                @input="resetServerMessages"
        >
            <v-layout wrap>
                <v-flex
                        xs12 md6
                        class="hidden-sm-and-down"
                        style=" width: 400px;"
                >
                    <v-container class="fill-height">
                        <v-img
                                :src="require('@/assets/logo.svg')"
                                class="logo-cover"
                        />
                    </v-container>
                </v-flex>
                <v-flex
                        xs12 md6
                        style=" width: 400px;"
                >
                    <p class="mt-4 mb-2 text-center grey--text body-1">
                        <span>Not registered? </span>
                        <router-link class="link" :to="{name:'register'}">register</router-link>
                    </p>
                    <v-card-text class="form-group">
                        <v-label>Email</v-label>
                        <v-text-field
                                class="my-2 form-text-input"
                                outlined
                                single-line
                                placeholder="email@example.com"
                                v-model="$v.form.email.$model"
                                hide-details
                                :error="showEmailError"
                                :success="! $v.form.email.$invalid"
                                @keyup.enter="login"

                        />
                        <form-input-error
                                :active="showEmailError"
                                :message="emailError.message"
                                :route="{name:'register',params:{init_email: form.email}}"
                                :show-link="emailError.showLink "
                                link-text="register"
                                @input="serverMessages.email = null"
                        />
                    </v-card-text>
                    <v-card-text class="form-group">
                        <v-label class="mb-2">Password</v-label>
                        <v-text-field
                                class="my-2 "
                                outlined
                                single-line
                                placeholder="enter password here"
                                hide-details
                                v-model="$v.form.password.$model"
                                type="password"
                                :error="showPasswordError"
                                :success="! $v.form.password.$invalid"
                                @keyup.enter="login"
                        />
                        <form-input-error
                                :active="showPasswordError"
                                :message="passwordError"
                                @input="serverMessages.password = ''"
                        />
                    </v-card-text>
                    <v-card-actions class="pa-4">
                        <v-btn
                                outlined
                                @click="login"
                        >
                            Login
                        </v-btn>
                        <v-spacer/>
                        <router-link class="link" :to="{name:'home'}">Forgot password?</router-link>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
    import {required, minLength, email} from 'vuelidate/lib/validators'
    import FormInputError from '@/components/FormInputError'

    export default {
        name: "Login",

        components: {
            FormInputError
        },

        props: {
            init_email: {type: String, default: ''}
        },

        data() {
            return {
                form: {
                    email: this.init_email,
                    password: '',
                },
                serverMessages: {
                    email: '',
                    password: '',
                }
            }
        },

        computed: {
            showEmailError() {
                return (this.$v.form.email.$dirty && this.$v.form.email.$invalid) || !!this.serverMessages.email
            },
            showPasswordError() {
                return (this.$v.form.password.$dirty && this.$v.form.password.$invalid) || !!this.serverMessages.password.length
            },
            emailError() {
                if (this.$v.form.email.$dirty && !this.$v.form.email.required) {
                    return {message: 'email field is required', showLink: false}
                } else if (this.$v.form.email.$dirty && !this.$v.form.email.email) {
                    return {message: 'please provide a valid email', showLink: false}
                } else if (this.serverMessages.email) {
                    return {message: this.serverMessages.email.message, showLink: this.serverMessages.email.showLink}
                }
                return ''
            },
            passwordError() {
                if (this.$v.form.password.$dirty && !this.$v.form.password.required) {
                    return 'password field is required'
                } else if (this.$v.form.password.$dirty && !this.$v.form.password.minLength) {
                    return 'password length is min 8 character'
                } else if (this.serverMessages.password.length) {
                    return this.serverMessages.password
                }
                return ''
            },
        },

        methods: {
            login() {
                if (!this.$v.$invalid) {
                    this.$store.dispatch('user/signIn', {
                        email: this.form.email,
                        password: this.form.password,
                    })
                        .then(() => {
                            this.$router.replace('/')
                        })
                        .catch(err => {
                            if (err.code === 'auth/user-not-found') {
                                this.serverMessages.email = {
                                    message: "User not found",
                                    showLink: true
                                }
                            } else if (err.code === "auth/wrong-password") {
                                this.serverMessages.password = "Wrong password"

                            }
                        })

                }
            },
            resetServerMessages() {
                this.serverMessages.email = ''
                this.serverMessages.password = ''

            }
        },

        validations: {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(8)
                },
            },
        },
    }
</script>

