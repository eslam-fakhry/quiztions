<template>
    <div @input="update">
        <v-text-field label="username"
                      v-model.lazy="$v.form.username.$model"
        ></v-text-field>
        <p class="error--text" v-if="! $v.form.username.required && $v.form.username.$dirty">username field is
            required</p>
        <p class="error--text" v-else-if="! $v.form.username.minLength && $v.form.username.$dirty">username must be a
            least 3 characters</p>

        <p class="error--text" v-else-if="! $v.form.username.isUsernameUnique && $v.form.username.$dirty">username is already
            taken</p>

        <v-text-field label="email"
                      v-model.lazy="$v.form.email.$model"
        ></v-text-field>
        <p class="primary--text" v-if="checkingEmail">checking email</p>
        <p class="error--text" v-else-if="! $v.form.email.required && $v.form.email.$dirty">email field is required</p>
        <p class="error--text" v-else-if="! $v.form.email.email && $v.form.email.$dirty">please provide a valid
            email</p>
        <p class="error--text" v-else-if="! $v.form.email.isEmailUnique && $v.form.email.$dirty">this email is already taken
            <router-link :to="{name:'login',params:{init_email: form.email} }">login instead</router-link>
        </p>

        <v-text-field password
                      outlined
                      single-line
                      label="password"
                      v-model.lazy="$v.form.password1.$model"
                      type="password"
        ></v-text-field>
        <p class="error--text" v-if="! $v.form.password1.required && $v.form.password1.$dirty">password field is
            required</p>

        <p class="error--text" v-else-if="! $v.form.password1.strongPassword && $v.form.password1.$dirty">password must
            contain a letter, a number, a special characters, and minimum length of 8 characters</p>

        <v-text-field password
                      label="confirm password"
                      v-model.lazy="$v.form.password2.$model"
                      type="password"
        ></v-text-field>
        <p class="error--text" v-if="! $v.form.password2.required && $v.form.password2.$dirty">password field is
            required</p>
        <p class="error--text" v-else-if="! $v.form.password2.samePassword && $v.form.password2.$dirty">passwords must
            match</p>

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
                this.$emit('input',! this.$v.$invalid)
                // this.$emit('input',true)

            },
            checkValidity(){
                return ! this.$v.$invalid
            },

            async checkEmail(value) {
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

                        const result = await  this.checkEmail(value)
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

</style>
