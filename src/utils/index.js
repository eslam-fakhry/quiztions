import {getTextWidth} from './textWidth'
import store from "@/store";

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
    showSnackbar,
    showError,
}
