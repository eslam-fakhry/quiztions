import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.setJob = functions.https.onCall((data, context) => {
    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const email = context.auth.token.email;
    const job = data.job;
    return setUserJob(email, job)
})


async function setUserJob(email: string, job: string) {
    const user = await admin.auth().getUserByEmail(email);
    if (user.customClaims && (user.customClaims as any).job) {
        throw new functions.https.HttpsError('already-exists', 'Job is already defined');
    }

    if (!['teacher', 'student'].includes(job)) {
        throw new functions.https.HttpsError('invalid-argument', 'Job provided is not correct');

    }
    await admin.auth().setCustomUserClaims(user.uid, {
        job
    })
    return {
        success: 'success'
    }
}


exports.onCourseDelete = functions.database
    .ref('/courses/{courseId}').onDelete((snap, context) => {
        const courseId = context.params.courseId
        admin.database()
            .ref("/students/")
            .once('value')
            .then(res => {
                res.forEach(function (child) {
                    child.ref
                        .update({
                            [`courses/${courseId}`]: null
                        })
                        .catch(err => {
                            console.error(err);
                        })
                })
            })
            .catch(err => {
                console.error(err);
            })
    })

