<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="deep-purple accent-4"
                dark
        >
            <v-toolbar-title
                    items-center
                    style="cursor:pointer;"
                    class="ml-0 pl-4 d-flex items-center"
                    @click="$router.push({name:'home'})"
            >
                <v-img
                        :src="require('@/assets/logo-light.svg')"
                        :width="30"
                        class="d-inline-block mr-1"
                />
                <span class="hidden-sm-and-down">Quiztions</span>
            </v-toolbar-title>

            <v-spacer/>
            <v-btn
                    v-if="job === 'student'"
                    small
                    text
                    class="mx-2"
                    :to="{name:'explore'}"
            >
                <v-icon left>
                    explore
                </v-icon>
                <span class="hidden-sm-and-down">explore</span>
            </v-btn>

            <v-menu buttom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                            icon
                            large
                            v-on="on"
                    >
                        <v-avatar
                                size="45px"
                                item
                                color="white"
                        >
                            <UserPicture/>
                        </v-avatar>
                    </v-btn>
                </template>

                <v-list :min-width="200">
                    <LogoutBtn>
                        <template v-slot="{logout}">
                            <v-list-item @click="logout">
                                <v-list-item-title>logout</v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon>logout</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </template>
                    </LogoutBtn>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
    import LogoutBtn from '@/components/auth/LogoutBtn'
    import UserPicture from "@/components/UserPicture";
    import {createNamespacedHelpers} from 'vuex'
    const { mapState } = createNamespacedHelpers('user')
    export default {
        name: "TheToolbar",

        components: {UserPicture, LogoutBtn},

        computed:mapState(['job']),
    }
</script>

