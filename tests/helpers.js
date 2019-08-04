export default {
    select(dataJest,wrapper) {
        return wrapper.find(`[data-jest=${dataJest}]`)
    },

    selectAll(dataJest,wrapper) {
        return wrapper.findAll(`[data-jest=${dataJest}]`)
    },

}
