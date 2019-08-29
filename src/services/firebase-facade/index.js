import fb from './firebaseConfig'
import helpers from './helpers'
import {showSnackbar} from "@/utils";

const allowableRefs = ['questions', 'lessons', 'courses', 'teachers', 'students', 'rightAnswers']

// todo move this ta an appropriate place
function fetchResource(resourceName, id) {
    if (!allowableRefs.includes(resourceName)) throw new Error('Reference name is not allowed')

    return fb.db.ref(resourceName)
        .child(id)
        .once('value')
        .then(snap => {
            if (!snap.val()) return Promise.reject('no such thing')
            return snap.val()
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

async function fetchSyncedResource(resourceName, id, cb) {
    return await new Promise((resolve, reject) => {
        if (!allowableRefs.includes(resourceName)) reject('Reference name is not allowed')
        fb.db.ref(resourceName)
            .child(id)
            .on('value', (snap) => {
                cb(snap)
                resolve()
            })
    })
}

async function fetchUserCourses(job, cb) {
    return await new Promise((resolve, reject) => {
        if (!['student', 'teacher'].includes(job)) reject('Reference name is not allowed')
        fb.db.ref(job + 's')
            .child(fb.auth.currentUser.uid)
            .child('courses')

            .on('value', (snap) => {
                cb(snap)
                resolve()
            })
    })
}


async function createQuestion({question, rightAnswer, lessonId}) {
    const questionData = {
        ...question,
        lessonId,
        teacherId: fb.auth.currentUser.uid,
    }
    const newQuestionKey = fb.db.ref('questions').push().key
    const updates = {}
    updates['/questions/' + newQuestionKey] = questionData
    updates['/lessons/' + lessonId + '/questions/' + newQuestionKey] = newQuestionKey
    updates['/rightAnswers/' + newQuestionKey] = rightAnswer
    await fb.db.ref().update(updates)
    return newQuestionKey
}

async function createLesson({name, courseId}) {

    const lessonData = {
        name,
        courseId,
        teacherId: fb.auth.currentUser.uid,
    }
    const newLessonKey = fb.db.ref('lessons').push().key
    const updates = {}
    updates['/lessons/' + newLessonKey] = lessonData
    updates['/courses/' + courseId + '/lessons/' + newLessonKey] = {
        name,
    }
    await fb.db.ref().update(updates)
    return {
        key: newLessonKey,
        lesson: lessonData,
    }
}

async function createCourse({name}) {
    const newCourseKey = fb.db.ref('courses').push().key

    const updates = {}
    updates['/courses/' + newCourseKey] = {
        name,
        teacherId: fb.auth.currentUser.uid,
    }
    updates['/teachers/' + fb.auth.currentUser.uid + '/courses/' + newCourseKey] = {
        name,
    }
    await fb.db.ref().update(updates)
    return newCourseKey
}

function enrollInCourse({id: courseId, name}) {
    return toggleEnrollmentInCourse({courseId, name})
}

function leaveCourse({id: courseId}) {
    return toggleEnrollmentInCourse({courseId}, false)
}

async function toggleEnrollmentInCourse({courseId, name}, toEnroll = true) {
    const userId = fb.auth.currentUser.uid
    const updates = {}
    if (toEnroll) {
        updates[`/courseStudents/${courseId}/${userId}`] = true
        updates[`students/${userId}/courses/${courseId}`] = {name}
    } else {
        updates[`/courseStudents/${courseId}/${userId}`] = null
        updates[`students/${userId}/courses/${courseId}`] = null
    }
    await fb.db.ref().update(updates)
}

async function deleteQuestion(questionId, lessonId) {
    let updates = {};
    updates['/lessons/' + lessonId + '/questions/' + questionId] = null;
    updates = Object.assign(updates, questionDeletionDependencies(questionId))

    try {
        await fb.db.ref().update(updates);
    } catch (e) {
        if (e.code === "PERMISSION_DENIED") {
            showSnackbar('You have no authentication to complete this process', 'error')
            return
        }
        showSnackbar('Something went wrong', 'error')
    }
}

async function deleteLesson(lessonId) {
    const value = await fetchResource('lessons', lessonId)
    const questions = value.questions ? Object.keys(value.questions) : []
    const courseId = value.courseId

    let updates = {};
    updates['/courses/' + courseId + '/lessons/' + lessonId] = null;
    updates = Object.assign(updates, lessonDeletionDependencies(lessonId, questions))

    fb.db.ref('lessons/' + lessonId).off('value')

    try {
        await fb.db.ref().update(updates);
    } catch (e) {
        if (e.code === "PERMISSION_DENIED") {
            showSnackbar('You have no authentication to complete this process', 'error')
            return
        }
        showSnackbar('Something went wrong', 'error')
    }
}

async function deleteCourse(courseId) {
    const course = await fetchResource('courses', courseId)
    const lessons = course.lessons ? Object.keys(course.lessons) : []

    let updates = {};
    updates = Object.assign(updates, await courseDeletionDependencies(courseId, lessons))
    updates = Object.assign(updates, await courseEnrolledDeletionDependencies(courseId))
    updates['/teachers/' + fb.auth.currentUser.uid + '/courses/' + courseId] = null;

    fb.db.ref('courses/' + courseId).off('value')

    try {
        await fb.db.ref().update(updates);
    } catch (e) {
        if (e.code === "PERMISSION_DENIED") {
            showSnackbar('You have no authentication to complete this process', 'error')
            return
        }
        showSnackbar('Something went wrong', 'error')
    }
}

/*
* Deletion dependencies
* For multi-path update
*/
function questionDeletionDependencies(id) {
    const updates = {}
    updates['/questions/' + id] = null
    updates['/rightAnswers/' + id] = null
    return updates
}

function lessonDeletionDependencies(lessonId, questions) {
    fb.db.ref('lessons/' + lessonId).off('value')
    let updates = {};
    updates['/lessons/' + lessonId] = null;
    questions.forEach((questionId) => {
        updates = Object.assign(updates, questionDeletionDependencies(questionId))
    })
    return updates
}

async function courseDeletionDependencies(courseId, lessons) {
    fb.db.ref('courses/' + courseId).off('value')
    let updates = {};
    updates['/courses/' + courseId] = null;

    await Promise.all(lessons.map(async (lessonId) => {
        const lesson = await fetchResource('lessons', lessonId)
        const questions = lesson.questions ? Object.keys(lesson.questions) : []
        updates = Object.assign(updates, await lessonDeletionDependencies(lessonId, questions))
    }))
    return updates
}

async function courseEnrolledDeletionDependencies(courseId) {
    let updates = {};

    const enrolledStudents = (await fb.db.ref('courseStudents/' + courseId).once("value")).val()
    if (enrolledStudents) {
        updates['/courseStudents/' + courseId] = null
        Object.keys(enrolledStudents).forEach((studentId) => {
            updates['/students/' + studentId + '/courses/' + courseId] = null
        })
    }
    return updates
}

export default {
    ...fb,
    ...helpers,
    fetchResource,
    fetchUserCourses,
    createQuestion,
    createLesson,
    createCourse,
    fetchSyncedResource,
    fetchCourses,
    enrollInCourse,
    leaveCourse,
    deleteQuestion,
    deleteLesson,
    deleteCourse,
}
