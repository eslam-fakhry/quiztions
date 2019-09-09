<!--suppress CheckEmptyScriptTag -->
<template>
    <p class="mb-0 ">
        <v-progress-circular
                v-if="loading"
                indeterminate
        />
        <span
                v-else-if="active"
                class="error--text"
                v-text="message"
        >
            <router-link
                    v-if="showLink"
                    class="link"
                    :to="route"
                    v-text="linkText"
            />
        </span>
        <span
                v-else
                class="hidden-sm-and-up hidden-xs-only"
        >
            hidden
        </span>
    </p>
</template>

<script>
    export default {
        name: "FormInputError",

        props: {
            message: {type: String,},
            active: {type: Boolean, default: true,},
            loading: {type: Boolean, default: false,},
            route: {type: Object,},
            showLink: {type: Boolean, default: false,},
            linkText: {type: String,}
        }
    }
</script>

