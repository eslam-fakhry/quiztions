<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-navigation-drawer
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
                color="blue darken-3"
                dark
        >
            <v-toolbar-title
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <span class="hidden-sm-and-down">Quiztions</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>



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
                            <v-img
                                    src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                                    alt="Vuetify"
                            >
                            </v-img>
                        </v-avatar>
                    </v-btn>

                </template>

                <v-list :min-width="200">
                    <!--v-for="(item, index) in items"-->
                    <!--:key="index"-->
                    <v-list-item
                            @click=""
                    >
                        <LogoutBtn>
                            <v-list-item-title>logout</v-list-item-title>
                            <!--<v-btn>logout</v-btn>-->
                        </LogoutBtn>
                    </v-list-item>
                </v-list>
            </v-menu>


        </v-app-bar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <!--<v-btn-->
        <!--bottom-->
        <!--color="pink"-->
        <!--dark-->
        <!--fab-->
        <!--fixed-->
        <!--right-->
        <!--@click="dialog = !dialog"-->
        <!--&gt;-->
        <!--<v-icon>add</v-icon>-->
        <!--</v-btn>-->
        <!--<v-dialog-->
        <!--v-model="dialog"-->
        <!--width="800px"-->
        <!--&gt;-->
        <!--<v-card>-->
        <!--<v-card-title class="grey darken-2">-->
        <!--Create contact-->
        <!--</v-card-title>-->
        <!--<v-container grid-list-sm>-->
        <!--<v-layout-->
        <!--wrap-->
        <!--&gt;-->
        <!--<v-flex-->
        <!--xs12-->
        <!--align-center-->
        <!--justify-space-between-->
        <!--&gt;-->
        <!--<v-layout align-center>-->
        <!--<v-avatar-->
        <!--size="40px"-->
        <!--class="mr-4"-->
        <!--&gt;-->
        <!--<img-->
        <!--src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"-->
        <!--alt=""-->
        <!--&gt;-->
        <!--</v-avatar>-->
        <!--<v-text-field-->
        <!--placeholder="Name"-->
        <!--&gt;</v-text-field>-->
        <!--</v-layout>-->
        <!--</v-flex>-->
        <!--<v-flex xs6>-->
        <!--<v-text-field-->
        <!--prepend-icon="business"-->
        <!--placeholder="Company"-->
        <!--&gt;</v-text-field>-->
        <!--</v-flex>-->
        <!--<v-flex xs6>-->
        <!--<v-text-field-->
        <!--placeholder="Job title"-->
        <!--&gt;</v-text-field>-->
        <!--</v-flex>-->
        <!--<v-flex xs12>-->
        <!--<v-text-field-->
        <!--prepend-icon="mail"-->
        <!--placeholder="Email"-->
        <!--&gt;</v-text-field>-->
        <!--</v-flex>-->
        <!--<v-flex xs12>-->
        <!--<v-text-field-->
        <!--type="tel"-->
        <!--prepend-icon="phone"-->
        <!--placeholder="(000) 000 - 0000"-->
        <!--&gt;</v-text-field>-->
        <!--</v-flex>-->
        <!--<v-flex xs12>-->
        <!--<v-text-field-->
        <!--prepend-icon="notes"-->
        <!--placeholder="Notes"-->
        <!--&gt;</v-text-field>-->
        <!--</v-flex>-->
        <!--</v-layout>-->
        <!--</v-container>-->
        <!--<v-card-actions>-->
        <!--<v-btn-->
        <!--text-->
        <!--color="primary"-->
        <!--&gt;More</v-btn>-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn-->
        <!--text-->
        <!--color="primary"-->
        <!--@click="dialog = false"-->
        <!--&gt;Cancel</v-btn>-->
        <!--<v-btn-->
        <!--text-->
        <!--@click="dialog = false"-->
        <!--&gt;Save</v-btn>-->
        <!--</v-card-actions>-->
        <!--</v-card>-->
        <!--</v-dialog>-->
    </div>
</template>

<script>

    import LogoutBtn from '@/components/auth/LogoutBtn'

    export default {
        name: 'Dashboard',

        components: {LogoutBtn},


        props: {
            source: String,
        },
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
