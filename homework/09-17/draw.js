import * as utils from './utils.js';
import {Canvas} from './Canvas.js'

canvas = new Canvas("#canvas");

let x=0;
let y=5;
let dx = 10
let dy = 10
setInterval(() => draw(canvas), 10);

async function draw(canvas) {
    canvas.clear()
    canvas.drawCircle(x,y,10, "green")
    if (!utils.between_exclusive(x+dx, 0, canvas.width))
        dx = -dx
    if (!utils.between_exclusive(y+dy, 0, canvas.height))
        dy = -dy
    x += dx;
    y += dy;
}





