import ObjectRender from "./ObjectRender.js";


export default class Projectile extends ObjectRender {
    constructor(ctx: CanvasRenderingContext2D, positionX: number, positionY: number) {
        super(ctx, undefined, positionX, positionY);
        let texture = document.createElement("img")
        texture.setAttribute("src", "/assets/projectile.png")
        this.texture = texture
    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * 5 * -Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * 5 * -Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    }

    destroy(array: ObjectRender[]): void {
        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
    }
}