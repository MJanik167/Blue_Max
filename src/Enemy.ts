import ObjectRender from "./ObjectRender.js";

type states = "idle" | "left" | "right"

export default class Enemy extends ObjectRender {
    speedMultiplier: number
    sprites: { [state in states]: HTMLImageElement[] }
    constructor(ctx: CanvasRenderingContext2D, positionX?: number, positionY?: number) {
        super(ctx, undefined, positionX, positionY);
        this.speedMultiplier = 1.3
        this.hitboxRadius = 30
        this.sprites = {
            idle: [],
            left: [],
            right: []
        }
    }



    render(speed: number): void {
        this.ctx.beginPath()
        this.ctx.font = "12px Arial orange";
        this.ctx.fillText(`bośniackie`, this.coordinates.x - this.hitboxRadius * .7, this.coordinates.y);
        this.ctx.fillText(`dziecko`, this.coordinates.x - this.hitboxRadius * .7, this.coordinates.y + 15);
        this.ctx.arc(this.coordinates.x, this.coordinates.y, this.hitboxRadius, 0, Math.PI * 2)
        this.ctx.stroke()
    }
}