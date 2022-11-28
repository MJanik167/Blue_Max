import ObjectRender from "./ObjectRender.js";

export default class Texture extends ObjectRender {
    radius: number
    constructor(ctx: CanvasRenderingContext2D, texture: string, positionX: number, positionY: number, radius: number) {
        super(ctx, texture, positionX, positionY)
        this.radius = radius
    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
        this.ctx.beginPath()
        this.ctx.arc(this.coordinates.x, this.coordinates.y, this.radius, 0, Math.PI * 2)
        this.ctx.stroke()
    }
}