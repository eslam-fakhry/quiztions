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
                            :init_email="init_email"
                            @continue="goNext"

                    />

                    <!--<div class="py-3">-->
                        <!--<v-btn-->
                                <!--outlined-->
                                <!--@click="goNext"-->
                                <!--:disabled="! canGoToNext"-->
                        <!--&gt;{{isLastStep?'Finish':'Next'}}-->
                        <!--</v-btn>-->

                        <!--<v-btn text>Cancel</v-btn>-->
                    <!--</div>-->

                </v-stepper-content>

                <v-stepper-content step="2" class="pa-4">
                    <InformationStep
                            @continue="goNext"

                    />
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

        props:{
            init_email:{
                type:String,
                default:'',
            },
            step:{
                type:Number,
                default:1,
            }
        },

        components: {
            CredentialsStep,
            InformationStep,
        },
        data() {
            return {
                currentStep: this.step,
                loading:false,
            }
        },
        methods: {
            goNext() {
                if (this.isLastStep) return this.$router.push('/');
                this.currentStep++
            },
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
                return true
            }
        },

    }
</script>

<style scoped>

</style>
