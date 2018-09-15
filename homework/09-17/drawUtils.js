import * as utils from './utils.js'

export function getRandomColor() {
    let hue = utils.random(0,360);
    return "hsla(+"+ hue +",100%,50%,50%)";
} 
