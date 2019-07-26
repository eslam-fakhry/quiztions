<template>
    <v-container d-flex justify-center>


        <v-stepper v-model="currentStep" style="width: 100%; max-width: 400px;">
            <v-stepper-header>
                <v-stepper-step :complete="currentStep > 1" step="1">Account</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="currentStep > 2" step="2">Information</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1" class="pa-4" >
                            <!--v-if="currentStep === 0"-->
                    <CredentialsStep
                            ref="CredentialsStep"
                            @checkValidation="setValidationFunction($event,'credentials')"

                    />

                    <div class="py-3">
                        <v-btn
                                outlined
                                @click="goNext"
                                :disabled="! canGoToNext"
                        >{{isLastStep?'Finish':'Next'}}
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </div>

                </v-stepper-content>

                <v-stepper-content step="2" class="pa-4">
                    <InformationStep
                            ref="InformationStep"
                            @checkValidation="setValidationFunction($event,'information')"
                    />
                    <div class="py-3">
                        <v-btn
                                outlined
                                @click="goNext"
                                :disabled="! canGoToNext"
                        >{{isLastStep?'Finish':'Next'}}
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </div>
                </v-stepper-content>

            </v-stepper-items>
        </v-stepper>


        <!--&lt;!&ndash;<component :is="steps[currentStep]"></component>&ndash;&gt;-->
        <!--<v-card-->
        <!--style="width: 100%; max-width: 400px;"-->
        <!--&gt;-->

        <!--<CredentialsStep-->
        <!--v-if="currentStep === 0"-->
        <!--ref="CredentialsStep"-->
        <!--@checkValidation="setValidationFunction($event,'credentials')"-->

        <!--/>-->

        <!--<InformationStep-->
        <!--v-if="currentStep === 1"-->
        <!--ref="InformationStep"-->
        <!--@checkValidation="setValidationFunction($event,'information')"-->
        <!--/>-->
        <!--<v-card-actions class="pa-4">-->
        <!--<v-btn-->
        <!--outlined-->
        <!--@click="goNext"-->
        <!--:disabled="! canGoToNext"-->
        <!--&gt;{{isLastStep?'Finish':'Next'}}</v-btn>-->
        <!--</v-card-actions>-->
        <!--</v-card>-->
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
                currentStep: 1,
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
                return this.currentStep === this.steps.length ;
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
