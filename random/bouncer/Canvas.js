import * as utils from './utils.js';
import * as draw_utils from './drawUtils.js'

export class Canvas {
    constructor(css_canvas_selector){
        let html_canvas = document.querySelector(css_canvas_selector);
        this.ctx = html_canvas.getContext("2d");
        this.width = html_canvas.width;
        this.height = html_canvas.height;

    }

    clear() {
        this.ctx.clearRect(0,0, this.width,  this.height)
    }

    drawCircle(x,y, radius, color = draw_utils.getRandomColor()){
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillStyle = color
        this.ctx.arc(x,y,radius,0, Math.PI*2);
        this.ctx.closePath();
        this.ctx.fill();
    }
}