import firebase from 'firebase'
import database from 'firebase/database'

// firebase init goes here
const config = {
    apiKey: "AIzaSyAgKowHMv5RFWrpeQewcy0a_WvVoerLRBA",
    authDomain: "quiztions-85803.firebaseapp.com",
    databaseURL: "https://quiztions-85803.firebaseio.com",
    projectId: "quiztions-85803",
    storageBucket: "",
    messagingSenderId: "46038711368",
    appId: "1:46038711368:web:9c1d046a772190dd"
}
firebase.initializeApp(config)

// firebase utils
// const db = firebase.database()
const db = database()
const auth = firebase.auth()
const currentUser = auth.currentUser

// // date issue fix according to firebase
// const settings = {
//     timestampsInSnapshots: true
// }
// db.settings(settings)

// firebase collections
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export default {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}
