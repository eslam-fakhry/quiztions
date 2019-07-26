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
                    :error="$v.form.firstName.$dirty && $v.form.firstName.$invalid"
                    :success="$v.form.firstName.$dirty && ! $v.form.firstName.$invalid"
            ></v-text-field>
            <p class="mb-0 ">
                <!--<span class="error&#45;&#45;text" v-if="! $v.form.firstName.required && $v.form.firstName.$dirty">-->
                    <!--firstName field is required-->
                <!--</span>-->
                    <!--<span class="error&#45;&#45;text" v-else-if="! $v.form.firstName.minLength && $v.form.firstName.$dirty">-->
                    <!--firstName must be a least 3 characters-->
                <!--</span>-->
                    <!--<span class="error&#45;&#45;text" v-else-if="! $v.form.firstName.isUsernameUnique && $v.form.firstName.$dirty">-->
                    <!--firstName is already taken-->
                <!--</span>-->
            </p>
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
            <p class="mb-0 ">
                <!--<span class="error&#45;&#45;text" v-if="! $v.form.lastName.required && $v.form.lastName.$dirty">-->
                    <!--lastName field is required-->
                <!--</span>-->
                    <!--<span class="error&#45;&#45;text" v-else-if="! $v.form.lastName.minLength && $v.form.lastName.$dirty">-->
                    <!--lastName must be a least 3 characters-->
                <!--</span>-->
                    <!--<span class="error&#45;&#45;text" v-else-if="! $v.form.lastName.isUsernameUnique && $v.form.lastName.$dirty">-->
                    <!--lastName is already taken-->
                <!--</span>-->
            </p>
        </div>
    </div>
</template>

<script>
    import { minLength,} from 'vuelidate/lib/validators'

    export default {
        name: "InformationStep",
        data() {
            return {
                form: {
                    firstName: '',
                    lastName: '',
                    birthday: '',
                    gender: '',
                    avatar: '',
                },
            }
        },
        validations: {
            form: {
                firstName: {
                    minLength:minLength(3),
                },
                lastName: {
                    minLength:minLength(3),
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
