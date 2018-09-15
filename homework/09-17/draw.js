import * as utils from './utils.js';
import * as drawUtils from './drawUtils.js'
import {Canvas} from './Canvas.js'
import { Gear } from './Gear.js';

canvas = new Canvas("#canvas");

let x=0;
let y=5;
let dx = 10;
let dy = 10
let color = drawUtils.getRandomColor();
    
// setInterval(() => draw(canvas), 1);
draw(canvas)

async function draw(canvas) {
    let gear = new Gear(12);
    gear.draw(canvas.ctx)   

}





