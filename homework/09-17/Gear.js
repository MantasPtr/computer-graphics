import * as utils from './utils.js';
import * as draw_utils from './drawUtils.js'

export class Gear {
    constructor(gear_count){
        this.gear_count = gear_count;
        this.creation_time = new Date()
    }


    draw(ctx){
        ctx.save()
        const sin = Math.sin(Math.PI / 6);
        const cos = Math.cos(Math.PI / 6);
        ctx.translate(100, 100);
        for (let i = 0; i <= this.gear_count; i++) {
            ctx.fillStyle = "blue"
            ctx.fillRect(0, 0, 30, 100);
            ctx.transform(cos, sin, -sin, cos, 0, 0);
        }
        ctx.restore()
    }
}