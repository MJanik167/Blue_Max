import ObjectRender from "./ObjectRender.js";

export default class Enemy extends ObjectRender{
    constructor(ctx:CanvasRenderingContext2D, positionX?:number, positionY?:number){
        super(ctx, undefined, positionX, positionY);
    }

    render(speed: number): void {
        this.ctx.beginPath()
        this.ctx.arc(this.coordinates.x, this.coordinates.y, 20, 0, Math.PI * 2)
        this.ctx.stroke()
    }

    destroy(array: ObjectRender[]): void {
     
        
    }
}