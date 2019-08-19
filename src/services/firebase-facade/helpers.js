import firebaseConfig from './firebaseConfig'

const auth = firebaseConfig.auth

const {studentsRef,teachersRef} = firebaseConfig.refs

//check if email exists
async function isEmailUnique(email) {
    const methods = await auth.fetchSignInMethodsForEmail(email)
    return ! methods.length
}


// helpers functions
function addTeacher({name,email}) {
    teachersRef.push({name,email})
}
function addStudent({name,email}) {
    studentsRef.push({name,email})
}


// queryQuestionOfLesson('lesson1')
//     .once('value')
//     .then(snap=>{
//     console.log(snap.val());
// })




export default {
    isEmailUnique,
}

