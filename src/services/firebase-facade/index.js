import fb from './firebaseConfig'
import helpers from './helpers'

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

function fetchSyncedResource(resourceName, id, cb) {
    if (!allowableRefs.includes(resourceName)) throw new Error('Reference name is not allowed')
    fb.db.ref(resourceName)
        .child(id)
        .on('value', cb)
}

function fetchUserCourses(job, cb) {
    if (!['student', 'teacher'].includes(job)) throw new Error('Reference name is not allowed')
    fb.db.ref(job + 's')
        .child(fb.auth.currentUser.uid)
        .child('courses')
        .on('value', cb)
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


async function toggleEnrollmentInCourse({courseId, name}, toEnroll = true) {
    const userId = fb.auth.currentUser.uid
    const updates = {}
    if (toEnroll) {
        updates[`/courseUsers/${courseId}/${userId}`] = true
        updates[`students/${userId}/courses/${courseId}`] = {name}
    } else {
        updates[`/courseUsers/${courseId}/${userId}`] = null
        updates[`students/${userId}/courses/${courseId}`] = null
    }
    await fb.db.ref().update(updates)
}

function enrollInCourse({id: courseId, name}) {
    return toggleEnrollmentInCourse({courseId, name})
}

function leaveCourse({id: courseId}) {
    return toggleEnrollmentInCourse({courseId}, false)
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
}
