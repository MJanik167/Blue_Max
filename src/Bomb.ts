import ObjectRender from "./ObjectRender.js";
import Projectile from "./Projectile.js";
import Texture from "./Texture.js";

export default class Bomb extends Projectile {
    fallingSpeed: number
    blastingRadiusMultiplier: number
    createObject: (e: ObjectRender) => void
    constructor(ctx: CanvasRenderingContext2D, parent: ObjectRender, altitude: number, createObject: (e: ObjectRender) => void, positionX: number, positionY: number) {
        super(ctx, parent, altitude, positionX, positionY)

        this.createObject = createObject
        this.blastingRadiusMultiplier = 1.8
        this.fallingSpeed = 2.5
    }


    checkForCollision = (entities: ObjectRender[]): ObjectRender | undefined => {
        let object = undefined
        entities.forEach(e => {
            if (Math.sqrt((this.coordinates.x - e.coordinates.x) ** 2 + (this.coordinates.y - e.coordinates.y) ** 2) < this.hitboxRadius + e.hitboxRadius
                && e !== this.origin
                && (this.altitude <= e.altitude + 25 && this.altitude >= e.altitude - 25)
            ) {
                object = this
            }
        })
        console.log(this.altitude)
        if ((this as ObjectRender).altitude <= 0) {
            object = this
        }
        return object
    }

    destroy(array: ObjectRender[], targets?: ObjectRender[]): void {
        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
        console.log(targets)
        this.explode(targets!)
        this.createObject(new Texture(this.ctx, "dziura", this.coordinates.x, this.coordinates.y))
    }

    explode = (entities: ObjectRender[]): void => {
        console.log("bumba")
        let inBlast: ObjectRender[] = []
        entities.forEach(e => {
            console.log(Math.sqrt((this.coordinates.x - e.coordinates.x) ** 2 + (this.coordinates.y - e.coordinates.y) ** 2) < (this.hitboxRadius + e.hitboxRadius) * this.blastingRadiusMultiplier)
            if (Math.sqrt((this.coordinates.x - e.coordinates.x) ** 2 + (this.coordinates.y - e.coordinates.y) ** 2) < (this.hitboxRadius + e.hitboxRadius) * this.blastingRadiusMultiplier)
                inBlast.push(e)
        })
        console.log(inBlast)
        inBlast.forEach(element => {
            element.destroy(entities)
        });
    }

    render = (speed: number): void => {
        this.coordinates = {
            x: this.coordinates.x, //+ Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + this.fallingSpeed
        }
        this.altitude -= 1
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    }
}