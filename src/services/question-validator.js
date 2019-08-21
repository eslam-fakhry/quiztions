import store from '../store'

function validate(userAnswer, questionId, isValidateRemotely = false) {
    return store.dispatch('answers/fetchRightAnswer', {id: questionId})
        .then((rightAnswer) => {
            return arraysEqual(userAnswer, rightAnswer)
        })
}
function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
}
export default {
    validate,
}
