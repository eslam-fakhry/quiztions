<!--suppress CheckEmptyScriptTag -->
<template >
    <p class="mb-0 ">
        <v-progress-circular indeterminate v-if="loading"/>
        <span class="error--text" v-text="message" v-else-if="active">
            <router-link
                    v-if="showLink"
                    class="light-blue--text "
                    :to="route"
            >{{ linkText }}
            </router-link>
        </span>
        <span v-else class="hidden-sm-and-up hidden-xs-only">
            hidden
        </span>
    </p>
</template>

<script>
    export default {
        name: "FormInputError",

        props:{
            message:{
                type:String,
            },
            active:{
                type:Boolean,
                default:true,
            },
            loading:{
                type:Boolean,
                default:false,
            },
            route:{
                type:Object,
            },
            showLink:{
                type:Boolean,
                default:false,
            },
            linkText:{
                type:String,
            }

        }
    }
</script>

