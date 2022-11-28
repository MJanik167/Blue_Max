import ObjectRender from "./ObjectRender.js";
import Projectile from "./Projectile.js";

export default class Bomb extends Projectile {
    fallingSpeed: number
    constructor(ctx: CanvasRenderingContext2D, parent: ObjectRender, altitude: number, positionX: number, positionY: number) {
        super(ctx, parent, altitude, positionX, positionY)

        this.fallingSpeed = 2.5
    }

    explode = (): void => {

    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x, //+ Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + this.fallingSpeed
        }
        this.altitude -= 1
        if (this.altitude < 0)
            this.explode()
        else
            this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    }
}