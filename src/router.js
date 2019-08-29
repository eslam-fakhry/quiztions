import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Toolbar from "./layouts/TheToolbar";
import fb from './services/firebase-facade'
import mutations from "@/store/mutation-types";
import {showSnackbar} from "@/utils";


Vue.use(Router)


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [


        {
            path: '/',
            name: 'home',
            components: {
                default: Home,
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true},
        },
        {
            path: '/about',
            name: 'about',
            components: {
                default: () => import('./views/About.vue'),
                toolbar: Toolbar,
            },
        },
        {
            path: '/explore',
            name: 'explore',
            props: {
                default: true,
            },
            components: {
                default: () => import('./views/Explore.vue'),
                toolbar: Toolbar,
            },
        },
        {
            path: '/course/:course_id',
            name: 'course',
            props: {
                default: true,
            },
            components: {
                default: () => import('./views/Course.vue'),
                toolbar: Toolbar,
            },

            meta: {requiresAuth: true},
        },
        {
            path: '/lesson/:lesson_id',
            name: 'lesson',
            props: true,
            component: () => import('./views/Lesson.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/login',
            name: 'login',
            props: true,
            component: () => import('./views/Login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            props: true,
            component: () => import('./views/Register.vue'),

        },
        {
            path: '/teacher/course/:course_id/edit',
            name: 'edit-course',
            props: {
                default: true,
            },
            components: {
                default: () => import('./views/EditCourse.vue'),
                toolbar: Toolbar,
            },
            meta: {
                requiresAuth: true,
                requiresToBeTeacher: true
            }
        },
        {
            path: '/teacher/lesson/:lesson_id/edit',
            name: 'edit-lesson',
            props: {
                default: true,
            },
            components: {
                default: () => import('./views/EditLesson.vue'),
                toolbar: Toolbar,
            },
            meta: {
                requiresAuth: true,
                requiresToBeTeacher: true
            }
        },
        {
            path: '/teacher/question/:lesson_id/create',
            name: 'create-question',
            props: {
                default: true,
            },
            components: {
                default: () => import('./components/create-question/CreateQuestion.vue'),
                toolbar: Toolbar,
            },

            meta: {
                requiresAuth: true,
                requiresToBeTeacher: true
            }
        },
        {
            path: '/not-found',
            name: 'not-found',
            components: {
                default: () => import('./views/NotFound.vue'),
                toolbar: Toolbar,
            },
        },
        {
            path: '*',
            redirect: 'not-found'
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const requiresToBeTeacher = to.matched.some(x => x.meta.requiresToBeTeacher)

    if (requiresAuth && !fb.auth.currentUser) {
        next('/login')
        return
    }
    if (requiresToBeTeacher) {
        try {
            const job = (await fb.auth.currentUser.getIdTokenResult()).claims.job
            if (job !== 'teacher') {
                showSnackbar("HEY! you're not supposed to go there", "warning")
                next('/')
            }
        } catch (e) {
            showSnackbar("Something went wrong", "error")
            next('/')
        }
    }
    next()
})

export default router
