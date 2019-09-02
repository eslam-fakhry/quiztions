<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-navigation-drawer
                v-if="false"
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-layout
                            v-if="item.heading"
                            :key="item.heading"
                            align-center
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex
                                xs6
                                class="text-center"
                        >
                            <a
                                    href="#!"
                                    class="body-2 black--text"
                            >EDIT</a>
                        </v-flex>
                    </v-layout>
                    <v-list-group
                            v-else-if="item.children"
                            :key="item.text"
                            v-model="item.model"
                            :prepend-icon="item.model ? item.icon : item['icon-alt']"
                            append-icon=""
                    >
                        <template v-slot:activator>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <v-list-item
                                v-for="(child, i) in item.children"
                                :key="i"
                                @click=""
                        >
                            <v-list-item-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item
                            v-else
                            :key="item.text"
                            @click=""
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="orange darken-3"
                dark
        >
            <v-toolbar-title
                    items-center
                    style="width: 300px"
                    class="ml-0 pl-4"
                    @click="$router.push({name:'home'})"
            >
                <v-icon class="mr-2">help</v-icon>
                <!--                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
                <span class="hidden-sm-and-down">Quiztions</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
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
                                size="32px"
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
        data: () => ({
            dialog: false,
            drawer: null,
            items: [
                {icon: 'home', text: 'Home'},
                {icon: 'book', text: 'Browse Courses'},
                // {icon: 'content_copy', text: 'Duplicates'},
                // {
                //     icon: 'keyboard_arrow_up',
                //     'icon-alt': 'keyboard_arrow_down',
                //     text: 'Labels',
                //     model: true,
                //     children: [
                //         {icon: 'add', text: 'Create label'},
                //     ],
                // },

            ],
        }),
    }
</script>

