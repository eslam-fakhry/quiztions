import fb from './firebaseConfig'
import helpers from './helpers'

const allowableRefs = ['questions', 'lessons', 'courses', 'teachers', 'students']

// todo move this ta an appropriate place
function fetchResource(resourceName, id) {
    if (!allowableRefs.includes(resourceName)) throw new Error('Reference name is not allowed')

    return fb.db.ref(resourceName)
        .child(id)
        .once('value')
        .then(snap => {
            if (!snap.val()) return Promise.reject('no such thing')
            return {...snap.val(), id}
        })
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
        teacherId: fb.auth.currentUser.uid,
    };
    const newQuestionKey = fb.db.ref('questions').push().key;
    const updates = {};
    updates['/questions/' + newQuestionKey] = questionData;
    updates['/lessons/' + lessonId + '/questions/' + newQuestionKey] = newQuestionKey;
    updates['/rightAnswers/' + newQuestionKey] = rightAnswer;
    await fb.db.ref().update(updates);
    return newQuestionKey
}

async function createLesson({name, courseId}) {

    const lessonData = {
        name,
        teacherId: fb.auth.currentUser.uid,
    }
    const newLessonKey = fb.db.ref('lessons').push().key;
    const updates = {};
    updates['/lessons/' + newLessonKey] = lessonData
    updates['/courses/' + courseId + '/lessons/' + newLessonKey] = {
        name,
    };
    await fb.db.ref().update(updates);
    return {
        key: newLessonKey,
        lesson: lessonData,
    }
}
export default {
    ...fb,
    helpers,
    fetchResource,
    fetchUserCourses,
    createQuestion,
    createLesson,
}
