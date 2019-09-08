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

function showError(code = 'GENERIC', msg = "Something went wrong") {
    switch (code) {
        case "PERMISSION_DENIED":
            msg = 'You have no authentication to complete this process'
            break;
        case "CAN_NOT_FETCH_COURSES":
            msg = 'Error fetching courses'
            break;
    }
    showSnackbar(msg, 'error')
}

export {
    getTextWidth,
    shuffle,
    showSnackbar,
    showError,
}
