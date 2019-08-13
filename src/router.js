import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'



Vue.use(Router)


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {requiresAuth: true},
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
            component: () => import('./views/Course.vue'),
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
            path: '/add-course',
            name: 'add_course',
            props: true,
            component: () => import('./components/teacher/EditCourse.vue'),
        },
        {
            path: '/add-lesson',
            name: 'add_lesson',
            props: true,
            component: () => import('./components/teacher/CreateLesson.vue'),
        },
        {
            path: '/experiment',
            name: 'experiment',
            props: true,
            component: () => import('./views/Experiment.vue'),
        },
        {
            path: '/course/edit/:course_id',
            name: 'edit-course',
            props: true,
            component: () => import('./views/EditCourse.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/lesson/edit/:lesson_id',
            name: 'edit-lesson',
            props: true,
            component: () => import('./views/EditLesson.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/question/create/:lesson_id',
            name: 'create-question',
            props: true,
            component: () => import('./components/create-question/CreateQuestion.vue'),
        },
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
