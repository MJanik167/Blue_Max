import ObjectRender from "./ObjectRender.js";

export default class Texture extends ObjectRender {
    constructor(ctx: CanvasRenderingContext2D, texture: string, positionX: number, positionY: number) {
        super(ctx, texture, positionX, positionY)
    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    }

    destroy(array: ObjectRender[], targets?: ObjectRender[] | undefined): void {

    }
}