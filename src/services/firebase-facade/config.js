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

export default {
    db,
    auth,
    functions,
    storage,
};
