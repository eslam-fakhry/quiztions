<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="orange darken-3"
                dark
        >
            <v-toolbar-title
                    items-center
                    style="width: 300px;cursor:pointer;"
                    class="ml-0 pl-4"
                    @click="$router.push({name:'home'})"
            >
                <v-icon class="mr-2">help</v-icon>
                <span class="hidden-sm-and-down">Quiztions</span>
            </v-toolbar-title>

            <v-spacer/>
            <v-btn
                    icon
                    small
                    :to="{name:'explore'}"
            >
                <v-icon>explore</v-icon>
            </v-btn>

            <v-menu open-on-hover1 buttom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            large
                            v-on="on"
                    >
                        <v-avatar
                                size="45px"
                                item
                        >
                            <UserPicture/>
                        </v-avatar>
                    </v-btn>
                </template>

                <v-list :min-width="200">
                    <v-list-item
                            @click=""
                    >
                        <LogoutBtn>
                            <v-list-item-title>logout</v-list-item-title>
                        </LogoutBtn>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
    import LogoutBtn from '@/components/auth/LogoutBtn'
    import UserPicture from "@/components/UserPicture";

    export default {
        name: "TheToolbar",

        components: {UserPicture, LogoutBtn},
    }
</script>

