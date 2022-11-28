import ObjectRender from "./ObjectRender.js";

export default class Enemy extends ObjectRender {
    constructor(ctx: CanvasRenderingContext2D, positionX?: number, positionY?: number) {
        super(ctx, undefined, positionX, positionY);
        this.hitboxRadius = 30

    }

    render(speed: number): void {
        this.ctx.beginPath()
        this.ctx.font = "12px Arial orange";
        this.ctx.fillText(`bośniackie`, this.coordinates.x - this.hitboxRadius * .5 + 5, this.coordinates.y + this.hitboxRadius * .5);
        this.ctx.fillText(`dziecko`, this.coordinates.x - this.hitboxRadius * .5 + 5, this.coordinates.y + this.hitboxRadius * .5 + 15);
        this.ctx.arc(this.coordinates.x + this.hitboxRadius * .5, this.coordinates.y + this.hitboxRadius * .5, this.hitboxRadius, 0, Math.PI * 2)
        this.ctx.stroke()
    }

    destroy(array: ObjectRender[]): void {
        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
    }
}