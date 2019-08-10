import {getTextWidth} from './textWidth'
import store from "@/store";

function showSnackbar(message,color){
    store.commit('snackbars/SET_TOAST',{
        message,
        color,
    })
}

export {
    getTextWidth,
    showSnackbar
}
