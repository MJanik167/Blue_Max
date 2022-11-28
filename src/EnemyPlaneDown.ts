import Enemy from "./Enemy.js";
import ObjectRender from "./ObjectRender.js";

export default class EnemyPlaneDown extends Enemy {
    speedMultiplier: number
    constructor(ctx: CanvasRenderingContext2D, altitude: number, positionX: number) {
        super(ctx, positionX, 0)
        this.altitude = altitude
        this.speedMultiplier = 1.6

        let img = document.createElement("img")
        img.setAttribute("src", "/assets/EnemyPlaneDownSprites/idle1.png")
        this.texture = img

        let shorterSide = () => {
            if (this.texture.width < this.texture.height) { return this.texture.width }
            return this.texture.height
        }
        this.hitboxRadius = shorterSide()
        console.log(this.hitboxRadius, this.texture.width, this.texture.height)


        console.log(this.texture.width, this.texture.height, this.hitboxRadius)
    }


    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * this.speedMultiplier * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * this.speedMultiplier * Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    }

    destroy(array: ObjectRender[]): void {
        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
    }
}