import ObjectRender from "./ObjectRender.js";


export default class Projectile extends ObjectRender {
    origin: ObjectRender
    speedMultiplier: number
    constructor(ctx: CanvasRenderingContext2D, origin: ObjectRender, altitude: number, positionX: number, positionY: number) {
        super(ctx, undefined, positionX, positionY);
        let texture = document.createElement("img")
        texture.setAttribute("src", "/assets/projectile.png")
        this.speedMultiplier = 20
        this.altitude = altitude
        this.origin = origin
        this.texture = texture
        this.hitboxRadius = 10
    }

    checkForCollision = (entities: ObjectRender[]): ObjectRender | undefined => {
        let object = undefined
        entities.forEach(e => {
            if (Math.sqrt(Math.pow(this.coordinates.x - e.coordinates.x, 2) + Math.pow(this.coordinates.y - e.coordinates.y, 2)) < this.hitboxRadius + e.hitboxRadius
                && e !== this.origin
                && (this.altitude <= e.altitude + 15 && this.altitude >= e.altitude - 15)
            )
                object = e
        })
        return object
    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * this.speedMultiplier * -Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * this.speedMultiplier * -Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    }

    destroy(myArray: ObjectRender[]): void {
        let index = myArray.findIndex(e => e === this)
        myArray.splice(index, 1)
    }
}