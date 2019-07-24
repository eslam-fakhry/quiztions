let canvas;

function getTextWidth(text, font = '400 16px Roboto') {
    // re-use canvas object for better performance
     canvas = canvas || (canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
}
export {getTextWidth,}
