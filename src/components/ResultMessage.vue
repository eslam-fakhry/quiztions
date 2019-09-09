<template>
    <div class="fill-height">
        <v-container v-if="result ==='success'" class="fill-height">
            <v-layout column>
                <v-flex>
                    <SuccessBadge/>
                </v-flex>
                <v-flex class="text-center">
                    Congratulation <router-link :to="{name:'home'}" replace class="link">Home</router-link>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container v-else class="fill-height flex-col">
            <v-layout column>
                <v-flex>
                    <FailedEmoji/>
                </v-flex>
                <v-flex class="text-center">
                    Sorry you failed the lesson
                    <router-link :to="{name:'home'}" class="link" replace>Home</router-link>
                </v-flex>
            </v-layout>
        </v-container>
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
            result: {type: String, required: true},
        },
    }
</script>

