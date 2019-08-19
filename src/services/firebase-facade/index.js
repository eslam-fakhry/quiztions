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



export default {
    ...fb,
    helpers,
    fetchResource,
    fetchUserCourses,
}
