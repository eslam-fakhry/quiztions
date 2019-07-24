import Repository from "./Repository"

const resources = "./questions"

export default {
    get(){
        return Repository.get(`${resources}`)
    },
    getQuestion(questionId){
        return Repository.get(`${resources}/${questionId}`)
    },
    createQuestion(payload){
        return Repository.post(`${resources}`,payload)
    }
}
