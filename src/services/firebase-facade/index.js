import fb from './config'
import {showError} from "@/utils";

const allowableRefs = ['questions', 'lessons', 'courses', 'teachers', 'students', 'rightAnswers']

function fetchResource(resourceName, id) {
    if (!allowableRefs.includes(resourceName)) throw new Error('Reference name is not allowed')
    return fb.db.ref(`${resourceName}/${id}`)
        .once('value')
        .then(snap => {
            if (!snap.val()) return Promise.reject('no such thing')
            return snap.val()
        })
}

async function fetchSyncedResource(resourceName, id, cb) {
    return await new Promise((resolve, reject) => {
        if (!allowableRefs.includes(resourceName)) reject('Reference name is not allowed')
        fb.db.ref(`${resourceName}/${id}`)
            .on('value', (snap) => {
                cb(snap)
                resolve()
            })
    })
}

function fetchCourses() {
    return fb.db.ref('courses')
        .once('value')
        .then(snap => {
            if (!snap.val()) return Promise.reject('nothing returned')
            return snap.val()
        })
}

async function fetchUserCourses(job, cb) {
    return await new Promise((resolve, reject) => {
        if (!['student', 'teacher'].includes(job)) reject('Reference name is not allowed')
        const userId = fb.auth.currentUser.uid;
        fb.db.ref(job + 's')
            .child(userId)
            .child('courses')
            .on('value', (snap) => {
                cb(snap)
                resolve()
            })
    })
}

function enrollInCourse({id: courseId, name}) {
    return toggleEnrollmentInCourse({courseId, name})
}

function leaveCourse({id: courseId}) {
    return toggleEnrollmentInCourse({courseId}, false)
}

async function toggleEnrollmentInCourse({courseId, name}, toEnroll = true) {
    const userId = fb.auth.currentUser.uid
    const updates = buildCourseEnrollmentUpdates(toEnroll, courseId, userId, name);
    await fb.db.ref().update(updates)
}

async function createCourse({name}) {
    const newCourseKey = fb.db.ref('courses').push().key
    const updates = buildNewCourseUpdates(newCourseKey, name);
    await fb.db.ref().update(updates)
    return newCourseKey
}

async function createLesson({name, courseId,canNavigate,tolerance}) {
    const teacherId = fb.auth.currentUser.uid;
    const lessonData = {
        name,
        courseId,
        teacherId,
        canNavigate,
        tolerance,
    }
    const newLessonKey = fb.db.ref('lessons').push().key
    const updates = buildNewLessonUpdates(newLessonKey, lessonData, courseId, name);
    await fb.db.ref().update(updates)
    return {key: newLessonKey, lesson: lessonData,}
}

async function createQuestion({question, rightAnswer, lessonId}) {
    const questionData = {
        ...question,
        lessonId,
        teacherId: fb.auth.currentUser.uid,
    }
    const newQuestionKey = fb.db.ref('questions').push().key
    const updates = buildNewQuestionUpdates(newQuestionKey, questionData, lessonId, rightAnswer);
    await fb.db.ref().update(updates)
    return newQuestionKey
}

async function deleteCourse(courseId) {
    const course = await fetchResource('courses', courseId)
    const lessons = course.lessons ? Object.keys(course.lessons) : []
    let updates = await buildCourseDeletionUpdates(courseId, lessons);
    try {
        await fb.db.ref().update(updates);
    } catch (e) {
        showError(e.code);
    }
}

async function deleteLesson(lessonId) {
    const value = await fetchResource('lessons', lessonId)
    const questions = value.questions ? Object.keys(value.questions) : []
    const {courseId} = value

    let updates = buildLessonDeletionUpdates(lessonId, courseId, questions);

    try {
        await fb.db.ref().update(updates);
    } catch (e) {
        showError(e.code)
    }
}

async function deleteQuestion(questionId, lessonId) {
    let updates = buildQuestionDeletionUpdates(lessonId, questionId);
    try {
        await fb.db.ref().update(updates);
    } catch (e) {
       showError(e.code)
    }
}

function buildNewCourseUpdates(courseId, name) {
    const updates = {}
    const teacherId = fb.auth.currentUser.uid;
    updates[`/courses/${courseId}`] = {name, teacherId,}
    updates[`/teachers/${teacherId}/courses/${courseId}`] = {name,}
    return updates;
}

function buildNewLessonUpdates(lessonId, lessonData, courseId, name) {
    const updates = {}
    updates[`/lessons/${lessonId}`] = lessonData
    updates[`/courses/${courseId}/lessons/${lessonId}`] = {name,}
    return updates;
}

function buildNewQuestionUpdates(questionId, questionData, lessonId, rightAnswer) {
    const updates = {}
    updates[`/questions/${questionId}`] = questionData
    updates[`/lessons/${lessonId}/questions/${questionId}`] = questionId
    updates[`/rightAnswers/${questionId}`] = rightAnswer
    return updates;
}

function buildCourseEnrollmentUpdates(toEnroll, courseId, userId, name) {
    const updates = {}
    updates[`/courseStudents/${courseId}/${userId}`] = toEnroll ? true : null
    updates[`students/${userId}/courses/${courseId}`] = toEnroll ? {name} : null
    return updates;
}

async function buildCourseDeletionUpdates(courseId, lessons) {
    let updates = {};
    const teacherId = fb.auth.currentUser.uid
    updates = Object.assign(updates, await courseDeletionDependencies(courseId, lessons))
    updates = Object.assign(updates, await courseEnrolledDeletionDependencies(courseId))
    updates[`/teachers/${teacherId}/courses/${courseId}`] = null;
    return updates;
}

function buildLessonDeletionUpdates(lessonId, courseId, questions) {
    let updates = {};
    updates[`/courses/${courseId}/lessons/${lessonId}`] = null;
    updates = Object.assign(updates, lessonDeletionDependencies(lessonId, questions))
    return updates;
}

function buildQuestionDeletionUpdates(lessonId, questionId) {
    let updates = {};
    updates[`/lessons/${lessonId}/questions/${questionId}`] = null;
    updates = Object.assign(updates, questionDeletionDependencies(questionId))
    return updates;
}

// Deletion dependencies for multi-path update

async function courseDeletionDependencies(courseId, lessons) {
    fb.db.ref('courses/' + courseId).off('value')
    let updates = {};
    updates[`/courses/${courseId}`] = null;
    await Promise.all(lessons.map(async (lessonId) => {
        const lesson = await fetchResource('lessons', lessonId)
        const questions = lesson.questions ? Object.keys(lesson.questions) : []
        updates = Object.assign(updates, await lessonDeletionDependencies(lessonId, questions))
    }))
    return updates
}

function lessonDeletionDependencies(lessonId, questions) {
    fb.db.ref('lessons/' + lessonId).off('value')
    let updates = {};
    updates[`/lessons/${lessonId}`] = null;
    questions.forEach((questionId) => {
        updates = Object.assign(updates, questionDeletionDependencies(questionId))
    })
    return updates
}

function questionDeletionDependencies(id) {
    const updates = {}
    updates['/questions/' + id] = null
    updates['/rightAnswers/' + id] = null
    return updates
}

async function courseEnrolledDeletionDependencies(courseId) {
    let updates = {};
    const enrolledStudents = (await fb.db.ref(`courseStudents/${courseId}`).once("value")).val()
    if (enrolledStudents) {
        updates[`courseStudents/${courseId}`] = null
        Object.keys(enrolledStudents).forEach((studentId) => {
            updates[`/students/${studentId}/courses/${courseId}`] = null
        })
    }
    return updates
}

//check if email exists
async function isEmailUnique(email) {
    const methods = await fb.auth.fetchSignInMethodsForEmail(email)
    return !methods.length
}


async function getUserJob() {
    return (await fb.auth.currentUser.getIdTokenResult()).claims.job;
}

export default {
    ...fb,
    isEmailUnique,
    getUserJob,
    fetchResource,
    fetchSyncedResource,
    fetchCourses,
    fetchUserCourses,
    enrollInCourse,
    leaveCourse,
    createQuestion,
    createLesson,
    createCourse,
    deleteQuestion,
    deleteLesson,
    deleteCourse,
}
