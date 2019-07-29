import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

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

// firebase collections
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')


//check if email exists
// isEmailUnique('islam1000man@gmail.com').then(res=>console.log(res))

async function isEmailUnique(email) {

    const methods = await auth.fetchSignInMethodsForEmail(email)
    return ! methods.length
}

const publicAPI = {
    db,
    auth,
    isEmailUnique
    // postsCollection,
    // commentsCollection,
    // likesCollection
};
export default publicAPI
