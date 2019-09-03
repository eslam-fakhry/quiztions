<template>
    <div>
        <h6>{{message || (result ==='success'?'you succeeded':'you failed')}}</h6>
        <div v-if="result ==='success'">
            <router-link :to="{name:'home'}">Go to home page</router-link>
            <SuccessBadge/>
        </div>
        <div v-else>
            <router-link :to="{name:'home'}">Go to home page</router-link>
            <FailedEmoji/>
        </div>

    </div>
</template>

<script>
    import SuccessBadge from "@/components/SuccessBadge";
    import FailedEmoji from "@/components/Failed-emoji";
    export default {
        name: "ResultMessage",
        components: {FailedEmoji, SuccessBadge},
        props: {
            message: {type: String},
            result: { type: String, required: true },
        },
    }
</script>

