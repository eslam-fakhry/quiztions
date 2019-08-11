import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

// firebase init goes here
const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.database()
const auth = firebase.auth()
const functions = firebase.functions()
const storage = firebase.storage()

// functions.httpsCallable('setJob')('Student').then(res=>{
//     console.log(res);
// })

// firebase collections
const coursesRef = db.ref('courses')
const lessonsRef = db.ref('lessons')
const questionsRef = db.ref('questions')
const rightAnswersRef = db.ref('rightAnswers')
const studentsRef = db.ref('students')
const teachersRef = db.ref('teachers')

// studentsRef.child("mv0x7P86mLTCfpMF0lQVeyAfsEu2").update({email:'green'}).then(res=>{
//     console.log(res);
// })


export default {
    db,
    auth,
    functions,
    storage,
    refs: {
        coursesRef,
        lessonsRef,
        questionsRef,
        rightAnswersRef,
        studentsRef,
        teachersRef,
    },

};
