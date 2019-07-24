<template>
    <div @input="update">
        <p class="mt-3 mb-2 text-xs-center grey--text body-1" ><span>Already registered? </span>
            <router-link class="light-blue--text " :to="{name:'login'}">login</router-link>
        </p>

        <v-card-text class="form-group">
            <v-label class="">Username</v-label>

            <v-text-field
                    class="my-2 form-text-input"
                    outline
                    single-line
                    label="username"
                    v-model.lazy="$v.form.username.$model"
                    hide-details
                    :error="$v.form.username.$dirty && $v.form.username.$invalid"
                    :success="! $v.form.username.$invalid"
            ></v-text-field>
            <p class="mb-0 ">
            <span class="error--text" v-if="! $v.form.username.required && $v.form.username.$dirty">
                username field is required
            </span>
                <span class="error--text" v-else-if="! $v.form.username.minLength && $v.form.username.$dirty">
                username must be a least 3 characters
            </span>
                <span class="error--text" v-else-if="! $v.form.username.isUsernameUnique && $v.form.username.$dirty">
                username is already taken
            </span>
            </p>
        </v-card-text>
        <v-card-text class="form-group">
            <v-label class="">Email</v-label>
            <v-text-field
                    class="my-2 form-text-input"
                    outline
                    single-line
                    label="email"
                    v-model.lazy="$v.form.email.$model"
                    hide-details
                    :error="$v.form.email.$dirty && $v.form.email.$invalid"
                    :success="! $v.form.email.$invalid"
            ></v-text-field>
            <p class="mb-0 ">
                <span class="primary--text" v-if="checkingEmail">checking email</span>
                <span class="error--text" v-else-if="! $v.form.email.required && $v.form.email.$dirty">
                email field is required
            </span>
                <span class="error--text" v-else-if="! $v.form.email.email && $v.form.email.$dirty">
                please provide a valid email
            </span>
                <span class="error--text" v-else-if="! $v.form.email.isEmailUnique && $v.form.email.$dirty">
                this email is already taken
            <router-link :to="{name:'login',params:{init_email: form.email} }">login instead</router-link>
        </span>
            </p>
        </v-card-text>
        <v-card-text class="form-group">
            <v-label class="">password</v-label>
            <v-text-field
                    class="my-2 form-text-input"
                    outline
                    single-line
                    label="password"
                    v-model.lazy="$v.form.password1.$model"
                    type="password"
                    hide-details
                    :error="$v.form.password1.$dirty && $v.form.password1.$invalid"
                    :success="! $v.form.password1.$invalid"
            ></v-text-field>

            <p class="mb-0 ">
            <span class="error--text" v-if="! $v.form.password1.required && $v.form.password1.$dirty">password field is
            required
            </span>

                <span class="error--text" v-else-if="! $v.form.password1.strongPassword && $v.form.password1.$dirty">
                password must contain a letter, a number, a special characters, and minimum length of 8 characters
            </span>
            </p>
        </v-card-text>
        <v-card-text class="form-group">
            <v-label class="">confirm password</v-label>
            <v-text-field
                    class="my-2 form-text-input"
                    outline
                    single-line
                    label="confirm password"
                    v-model.lazy="$v.form.password2.$model"
                    type="password"
                    hide-details
                    :error="$v.form.password2.$dirty && $v.form.password2.$invalid"
                    :success="! $v.form.password2.$invalid"
            ></v-text-field>
            <p class="mb-0 ">
            <span class="error--text" v-if="! $v.form.password2.required && $v.form.password2.$dirty">
                password field is required
            </span>
                <span class="error--text" v-else-if="! $v.form.password2.samePassword && $v.form.password2.$dirty">
                passwords must match
            </span>
            </p>
        </v-card-text>
    </div>
</template>

<script>
    import {required, minLength, email, sameAs} from 'vuelidate/lib/validators'

    export default {
        name: "CredentialsStep",
        props: {

            init_username: {type: String, default: ''},
            init_email: {type: String, default: ''},
            init_password: {type: String, default: ''},
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
                    username: this.init_username,
                    email: this.init_email,
                    password1: this.init_password,
                    password2: this.init_password,
                },
                errors: this.init_errors,
                checkingEmail: false,
                checkingUsername: false,
                existingEmail: 'eslam1000man@gmail.com',
                existingUsername: 'eslam',
            }
        },
        methods: {
            // delayTouch($v) {
            // $v.$reset()
            // if (touchMap.has($v)) {
            //     clearTimeout(touchMap.get($v))
            // }
            // touchMap.set($v, setTimeout($v.$touch, 1000))
            // },

            update() {
                console.log('update');
                this.$emit('input', !this.$v.$invalid)
                // this.$emit('input',true)

            },
            checkValidity() {
                return !this.$v.$invalid
            },

            async checkEmail(value) {
                // eslint-disable-next-line
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(typeof value === 'string' && value.length % 2 !== 0)
                    }, 350 + Math.random() * 300)
                })
                // .then(res => {
                //     this.checkingEmail = false
                //     return res
                // })

            },
            checkusername() {

            },
            wait(ms) {
                return new Promise(r => setTimeout(r, ms));
            }

        },
        watch: {
            // ['form.username']:function(){
            //     console.log('form watch');
            //     this.$emit('input',! this.$v.$invalid)
            // },
            // ['form.email']:function(){
            //     console.log('form watch');
            //     this.$emit('input',! this.$v.$invalid)
            // },
            // ['form.password1']:function(){
            //     console.log('form watch');
            //     this.$emit('input',! this.$v.$invalid)
            // },
            // ['form.password2']:function(){
            //     console.log('form watch');
            //     this.$emit('input',! this.$v.$invalid)
            // },
        },
        validations: {
            form: {
                username: {
                    required,
                    minLength: minLength(3),
                    // todo add valid username rule i.e. have no spaces
                    isUsernameUnique(username) {

                        // todo: add debounce
                        console.log('isUsernameUnique called');

                        return username !== this.existingUsername
                    },
                },
                email: {
                    required,
                    email,
                    async isEmailUnique(value) {
                        // todo: add debounce
                        console.log('isEmailUnique called');

                        // standalone validator ideally should not assume a field is required
                        if (value === '') return true
                        console.log('isEmailUnique called after');


                        // simulate async call, fail for all logins with even length
                        this.checkingEmail = true

                        const result = await this.checkEmail(value)
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

        created() {
            // this.$emit('checkValidation',this.checkValidity.bind(this))
        }
    }
</script>

<style scoped>
    /*noinspection CssUnusedSymbol*/
    .form-text-input /deep/ .v-input__slot {
        border-width:1px!important;
    }
</style>
