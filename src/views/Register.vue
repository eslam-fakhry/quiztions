<template>
    <v-container
            class="fill-height d-flex justify-center"
    >
        <v-stepper
                alt-labels
                v-model="currentStep"
        >
            <v-stepper-header>
                <template
                        v-for="(step,index) in steps"
                >
                    <v-divider
                            v-if="index !== 0"
                            :key="index+'divider'"
                    />
                    <v-stepper-step
                            :complete="currentStep > (index+1)"
                            :step="index+1"
                            :key="index"
                    >
                        {{step.label}}
                    </v-stepper-step>
                </template>
            </v-stepper-header>

            <v-layout>
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
                        style="width: 400px;"
                >
                    <v-stepper-items>
                        <template v-for="(step,index) in steps">
                            <v-stepper-content
                                    :step="index+1"
                                    class="pa-4"
                                    :key="index"
                            >
                                <component
                                        :is="step.component"
                                        @continue="goNext"
                                        :init_email="init_email"
                                />
                            </v-stepper-content>
                        </template>
                    </v-stepper-items>
                </v-flex>
            </v-layout>
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
            init_email: {type: String, default: '',},
            step: {type: Number, default: 1,}
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

        computed: {
            steps() {
                return [
                    {component: CredentialsStep, label: 'Credentials'},
                    {component: AccountTypeStep, label: 'Account Type'},
                    {component: InformationStep, label: 'Information'},
                    {component: ImageStep, label: 'Image'},
                ]
            },
            isLastStep() {
                return this.currentStep === this.steps.length
            },
        },

        methods: {
            goNext() {
                if (this.isLastStep) return this.$router.replace('/')
                this.currentStep++
            },
        },
    }
</script>

