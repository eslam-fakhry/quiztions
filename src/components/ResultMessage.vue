<template>
    <div>
        <h6>{{message || (result ==='success'?'you succeeded':'you failed')}}</h6>
        <div v-if="result ==='success'">
            <router-link :to="{name:'home'}">Go to home page</router-link>
        </div>
        <div v-else>

        </div>

    </div>
</template>

<script>
    export default {
        name: "ResultMessage",

        props: {
            message: {type: String},
            result: { type: String, required: true },
        },
    }
</script>

