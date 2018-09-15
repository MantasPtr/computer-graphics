import * as utils from './utils.js';
import * as drawUtils from './drawUtils.js'
import {Canvas} from './Canvas.js'

canvas = new Canvas("#canvas");

let x=0;
let y=5;
let dx = 10;
let dy = 10
let color = drawUtils.getRandomColor();
    
setInterval(() => draw(canvas), 1);

async function draw(canvas) {
    dx = utils.random(0,10) * Math.sign(dx)
    dy = utils.random(0,10) * Math.sign(dy)
    canvas.drawCircle(x,y,10, color)
    if (!utils.between_exclusive(x+dx, 0, canvas.width)){
        dx = -dx
        color = drawUtils.getRandomColor();
    }
    if (!utils.between_exclusive(y+dy, 0, canvas.height)) {
        dy = -dy
        color = drawUtils.getRandomColor();
    }
    x += dx;
    y += dy;
}





