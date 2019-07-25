<template>
    <v-container d-flex justify-center>

        <!--<component :is="steps[currentStep]"></component>-->
        <v-card
                style="width: 100%; max-width: 400px;"
        >

            <CredentialsStep
                    v-if="currentStep === 0"
                    ref="CredentialsStep"
                    @checkValidation="setValidationFunction($event,'credentials')"

            />

            <InformationStep
                    v-if="currentStep === 1"
                    ref="InformationStep"
                    @checkValidation="setValidationFunction($event,'information')"
            />
            <v-card-actions class="pa-4">
                <v-btn
                        outlined
                        @click="goNext"
                        :disabled="! canGoToNext"
                >{{isLastStep?'Finish':'Next'}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import CredentialsStep from './register-steps/CredentialsStep'
    import InformationStep from './register-steps/InformationStep'

    // todo: use stepper from vuetify
    export default {
        name: "Register",
        components: {
            CredentialsStep,
            InformationStep,
        },
        data() {
            return {
                currentStep: 0,
                stepValidation: {
                    credentials: false,
                    information: false,
                },
            }
        },
        methods: {
            setValidationFunction(event) {
                this.stepValidation.credentials = event
            },
            goNext() {
                if (this.isLastStep) return this.$router.push('/');
                // if(this.stepValidation.credentials())
                this.currentStep++;
            }
        },
        computed: {
            steps() {
                return ['credentialsStep', 'informationStep',];
            },
            currentStepName() {
                return this.steps[this.currentStep]
            },
            isLastStep() {
                return this.currentStep === this.steps.length - 1;
            },
            canGoToNext() {
                // return this.stepValidation.credentials
                return true
            }
        },

        mounted() {
            this.stepValidation.credentials = !this.$refs.CredentialsStep.$v.$invalid
        },
    }
</script>

<style scoped>

</style>
