import Vue from 'vue'
import Router from 'vue-router'
import Toolbar from "./layouts/TheToolbar";
import fb from './services/firebase-facade'
import {showError, showSnackbar} from "@/utils";


Vue.use(Router)


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [
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
            path: '/',
            name: 'home',
            components: {
                default: async () => {
                    const job = (await fb.auth.currentUser.getIdTokenResult()).claims.job
                    if (job === 'teacher') {
                        return import('@/views/TeacherCourses')
                    } else if (job === 'student') {
                        return import('@/views/Courses')
                    }
                },
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true},
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     components: {
        //         default: () => import('./views/About.vue'),
        //         toolbar: Toolbar,
        //     },
        // },
        {
            path: '/explore',
            name: 'explore',
            props: { default: true, },
            components: {
                default: () => import('./views/Explore.vue'),
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true, requiresToBeStudent: true},
        },
        {
            path: '/course/:course_id',
            name: 'course',
            props: { default: true, },
            components: {
                default: () => import('./views/Course.vue'),
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true, requiresToBeStudent: true},
        },
        {
            path: '/lesson/:lesson_id',
            name: 'lesson',
            props: true,
            component: () => import('./views/Lesson.vue'),
            meta: {requiresAuth: true, requiresToBeStudent: true},
        },
        {
            path: '/teacher/course/:course_id/edit',
            name: 'edit-course',
            props: { default: true, },
            components: {
                default: () => import('./views/EditCourse.vue'),
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true, requiresToBeTeacher: true}
        },
        {
            path: '/teacher/lesson/:lesson_id/edit',
            name: 'edit-lesson',
            props: { default: true, },
            components: {
                default: () => import('./views/EditLesson.vue'),
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true, requiresToBeTeacher: true}
        },
        {
            path: '/teacher/question/:lesson_id/create',
            name: 'create-question',
            props: { default: true, },
            components: {
                default: () => import('./components/create-question/CreateQuestion.vue'),
                toolbar: Toolbar,
            },
            meta: {requiresAuth: true, requiresToBeTeacher: true}
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
    const requiresToBeStudent = to.matched.some(x => x.meta.requiresToBeStudent)

    if (requiresAuth && !fb.auth.currentUser) {
        next('/login')
        return
    }
    if (requiresToBeStudent || requiresToBeTeacher) {
        const job = await fb.getUserJob()
        try {
            if ((requiresToBeTeacher && job !== 'teacher') || (requiresToBeStudent && job !== 'student')) {
                showSnackbar("HEY! you're not supposed to go there", "warning")
                return next('/')
            }
        } catch (e) {
            showError()
            return next('/')
        }
    }
    next()
})

export default router
