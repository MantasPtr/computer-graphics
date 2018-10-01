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
        this.ctx.clearRect(0,0, this.height, this.width)
    }
}