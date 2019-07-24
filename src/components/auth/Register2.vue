<template>
    <div>
        <!--<component :is="steps[currentStep]"></component>-->
        <CredentialsStep v-if="currentStep === 0"
                         ref="CredentialsStep"
                         @checkValidation="setValidationFunction($event,'credentials')"
        />

        <InformationStep v-if="currentStep === 1"
                         ref="InformationStep"
                         @checkValidation="setValidationFunction($event,'information')"

        />

        <v-btn @click="goNext" :disabled="! canGoToNext">{{isLastStep?'Finish':'Next'}}</v-btn>
    </div>
</template>

<script>
    import CredentialsStep from './register-steps/CredentialsStep'
    import InformationStep from './register-steps/InformationStep'

    export default {
        name: "Register",
        components: {
            CredentialsStep,
            InformationStep,
        },
        data() {
            return {
                currentStep:0,
                stepValidation:{
                    credentials:false,
                    information:false,
                },
            }
        },
        methods: {
            setValidationFunction(event){
                this.stepValidation.credentials = event
            },
            goNext() {
                if(this.isLastStep) return this.$router.push('/');
                if(this.stepValidation.credentials()) this.currentStep++;
            }
        },
        computed: {
            steps() {
                return ['credentialsStep', 'informationStep',];
            },
            currentStepName(){
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
    }
</script>

<style scoped>

</style>
