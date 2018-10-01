import * as utils from './utils.js';
import * as drawUtils from './drawUtils.js'
import {Canvas} from './Canvas.js'
import { Gear } from './Gear.js';

init()
function init() {
    canvas = new Canvas("#canvas");
    let color = drawUtils.getRandomColor();
    const ref = (time) => draw(canvas,time)
    window.requestAnimationFrame(ref);
}


function draw(canvas, time) {
    utils.logs(time)
    let gear = new Gear(12,10000);
    gear.draw(canvas.ctx, time);
}





