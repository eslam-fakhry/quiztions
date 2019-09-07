import {getTextWidth} from './textWidth'
import store from "@/store";

function shuffle(arr) {
    const array = arr.slice(0)
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function showSnackbar(message, color) {
    store.commit('snackbars/SET_TOAST', {
        message,
        color,
    })
}

function showError(code = 'GENERIC') {
    switch (code) {
        case "PERMISSION_DENIED":
            showSnackbar('You have no authentication to complete this process', 'error')
            break;
        case "GENERIC":
        default:
            showSnackbar('Something went wrong', 'error')
            break;
    }
}

export {
    getTextWidth,
    shuffle,
    showSnackbar,
    showError,
}
