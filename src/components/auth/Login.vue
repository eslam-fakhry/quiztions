<template>

    <v-container d-flex justify-center>
        <v-card
                style="width: 100%; max-width: 400px;"
        >
            <p class="mt-3 mb-2 text-xs-center grey--text body-1" ><span>Not registered? </span>
                <router-link class="light-blue--text " :to="{name:'register'}">register</router-link>
            </p>

            <v-card-text class="form-group">
                <v-label class="">Email</v-label>

                <v-text-field
                        class="my-2 form-text-input"
                        outline
                        single-line
                        placeholder="email@example.com"
                        v-model="$v.form.email.$model"
                        hide-details
                        :error="$v.form.email.$dirty && $v.form.email.$invalid"
                        :success="! $v.form.email.$invalid"
                        @keyup.enter="login"

                ></v-text-field>
                <p class="mb-0 ">

                        <span class="error--text" v-if="! $v.form.email.required && $v.form.email.$dirty">email field is
                            required</span>
                    <span class="error--text" v-if="! $v.form.email.email && $v.form.email.$dirty">please provide a
                            valid
                            email</span>
                </p>

            </v-card-text>
            <v-card-text class="form-group">
                <v-label class="mb-2">Password</v-label>
                <v-text-field
                        class="my-2 form-text-input"
                        outline
                        single-line
                        placeholder="enter password here"
                        hide-details
                        v-model="$v.form.password.$model"
                        type="password"
                        :error="$v.form.password.$dirty && $v.form.password.$invalid"
                        :success="! $v.form.password.$invalid"
                        @keyup.enter="login"
                ></v-text-field>
                <p class="mb-0 ">
                            <span
                                    class="error--text"
                                    v-if="! $v.form.password.required && $v.form.password.$dirty"
                            >
                            password field is required
                            </span>
                    <span
                            class="error--text"
                            v-if="! $v.form.password.minLength && $v.form.password.$dirty"
                    >
                            password length is min 8 character
                            </span>
                </p>
            </v-card-text>
            <v-card-actions class="pa-3">
                <v-btn
                        outline
                        @click="login"
                >
                    Login
                </v-btn>
                <v-spacer/>
                <router-link class="light-blue--text " :to="{name:'home'}">Forgot password?</router-link>
            </v-card-actions>

        </v-card>
    </v-container>
</template>

<script>
    import {required, minLength, email} from 'vuelidate/lib/validators'

    export default {
        name: "Login",

        props: {
            init_email: {type: String, default: ''}
        },

        data() {
            return {
                form: {
                    email: this.init_email,
                    password: '',
                },
            }
        },

        methods: {
            login() {
                if (!this.$v.$invalid) {
                    console.log('logging in');
                }
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

<style scoped>
    /*noinspection CssUnusedSymbol*/
    .form-text-input /deep/ .v-input__slot {
        border-width:1px!important;
    }
</style>
