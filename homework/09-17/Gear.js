import * as utils from './utils.js';
import * as draw_utils from './drawUtils.js'

export class Gear {
    constructor(gear_count, rotation_time, clockwise = true){
        this.gear_count = gear_count;
        this.creation_time = new Date()
        this.rotation = clockwise ? 1 : -1;
        this.rotation_time = rotation_time;
    }


    draw(ctx, time){
        ctx.save()
        let gear_rotation = (Math.PI * 2 /this.rotation_time) * (time % this.rotation_time)
        ctx.translate(300, 200);
        
        ctx.rotate(gear_rotation)
        let angle = Math.PI * 2 / this.gear_count ;
        for (let i = 0; i < this.gear_count; i++) {
            ctx.fillStyle = "blue"
            ctx.moveTo(200, 0);
            ctx.lineTo(20, 50);
            ctx.lineTo(20, -50);
            ctx.fill();
            ctx.moveTo(0,0);
            ctx.rotate(angle)
        }
        ctx.restore()
    }
}