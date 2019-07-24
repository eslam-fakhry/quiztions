import QuestionRepository from './QuestionRepository'

const repositories={
    questions:QuestionRepository,
}

export default {
    get: name=>repositories[name]
}
