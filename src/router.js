import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Toolbar  from "./layouts/TheToolbar";




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
            path: '/course/:course_id',
            name: 'course',
            props: {
                default:true,
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
            path: '/course/edit/:course_id',
            name: 'edit-course',
            props: {
                default:true,
            },
            components: {
                default: () => import('./views/EditCourse.vue'),
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true}
        },
        {
            path: '/lesson/edit/:lesson_id',
            name: 'edit-lesson',
            props: {
                default:true,
            },
            components: {
                default: () => import('./views/EditLesson.vue'),
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true}
        },
        {
            path: '/question/create/:lesson_id',
            name: 'create-question',
            props: {
                default:true,
            },
            components: {
                default: () => import('./components/create-question/CreateQuestion.vue'),
                toolbar: Toolbar,
            },
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
            path:'*',
            redirect:'not-found'
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    const loggedIn = store.getters['user/loggedIn']
    if (requiresAuth && !loggedIn) {
        next('/login')
    } else if (requiresAuth && loggedIn) {
        next()
    } else {
        next()
    }
})


export default router
