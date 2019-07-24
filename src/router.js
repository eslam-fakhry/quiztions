import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/course/:course_id',
            name: 'course',
            props: true,
            component: () => import('./views/Course.vue')
        },
        {
            path: '/lesson/:lesson_id',
            name: 'lesson',
            props: true,
            component: () => import('./views/LessonPage.vue')
        },
        {
            path: '/login',
            name: 'login',
            props: true,
            component: () => import('./components/auth/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            props: true,
            component: () => import('./components/auth/Register.vue')
        },
        {
            path: '/add-question',
            name: 'add_question',
            props: true,
            component: () => import('./components/create-question/CreateQuestion.vue')
        },
    ]
})
