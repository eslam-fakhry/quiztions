<template>
    <v-container d-flex justify-center class="page">
        <v-stepper alt-labels v-model="currentStep" style="width: 100%; max-width: 400px;">
            <v-stepper-header>
                <template v-for="(step,index) in steps">
                    <v-divider v-if="index !== 0" :key="index+'divider'"></v-divider>
                    <v-stepper-step :complete="currentStep > (index+1)" :step="index+1" :key="index">{{step.label}}
                    </v-stepper-step>
                </template>
            </v-stepper-header>

            <v-stepper-items>
                <template v-for="(step,index) in steps">
                    <v-stepper-content :step="index+1" class="pa-4" :key="index">
                        <component
                                :is="step.component"
                                @continue="goNext"
                                :init_email="init_email"
                        />
                    </v-stepper-content>
                </template>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
    // steps
    import CredentialsStep from '@/components/auth/register-steps/CredentialsStep'
    import AccountTypeStep from '@/components/auth/register-steps/AccountTypeStep'
    import InformationStep from '@/components/auth/register-steps/InformationStep'
    import ImageStep from '@/components/auth/register-steps/ImageStep'


    export default {
        name: "Register",

        props: {
            init_email: {
                type: String,
                default: '',
            },
            step: {
                type: Number,
                default: 1,
            }
        },

        components: {
            CredentialsStep,
            AccountTypeStep,
            InformationStep,
            ImageStep,
        },
        data() {
            return {
                currentStep: this.step,
                loading: false,
            }
        },
        methods: {
            goNext() {
                if (this.isLastStep) return this.$router.replace('/');
                this.currentStep++
            },
        },
        computed: {
            steps() {
                return [{
                    component: CredentialsStep,
                    label: 'Credentials'
                }, {
                    component: AccountTypeStep,
                    label: 'Account Type'
                }, {
                    component: InformationStep,
                    label: 'Information'
                }, {
                    component: ImageStep,
                    label: 'Image'
                },];
            },
            currentStepName() {
                return this.steps[this.currentStep]
            },
            isLastStep() {
                return this.currentStep === this.steps.length;
            },
            canGoToNext() {
                return true
            }
        },

    }
</script>

<style scoped>

</style>
