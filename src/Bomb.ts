import ObjectRender from "./ObjectRender.js";
import Plane from "./Plane.js";
import Projectile from "./Projectile.js";
import Texture from "./Texture.js";

export default class Bomb extends Projectile {
    fallingSpeed: number
    blastingRadiusMultiplier: number
    createObject: (e: ObjectRender) => void
    constructor(ctx: CanvasRenderingContext2D, parent: ObjectRender, altitude: number, createObject: (e: ObjectRender) => void, positionX: number, positionY: number) {
        super(ctx, parent, altitude, positionX, positionY)
        this.texture.setAttribute('src', '/assets/bomb.png')
        this.createObject = createObject
        this.blastingRadiusMultiplier = 1.8
        this.fallingSpeed = 2.5
    }


    checkForCollision = (entities: ObjectRender[]): ObjectRender | undefined => {
        let object = undefined
        entities.forEach(e => {
            if (Math.sqrt((this.coordinates.x - e.coordinates.x) ** 2 + (this.coordinates.y - e.coordinates.y) ** 2) < this.hitboxRadius + e.hitboxRadius
                && e !== this.origin
                && e.altitude <= this.altitude + 10 && e.altitude >= this.altitude - 15) {
                object = e
            }
        })
        if ((this as ObjectRender).altitude <= 0) {
            object = this
        }
        return object
    }

    destroy(array: ObjectRender[], targets?: ObjectRender[]): void {
        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
        this.explode(targets!)
        this.createObject(new Texture(this.ctx, "dziura", this.coordinates.x, this.coordinates.y, (this.hitboxRadius + 30) * this.blastingRadiusMultiplier))
    }

    explode = (entities: ObjectRender[]): void => {
        let inBlast: ObjectRender[] = []
        entities.forEach(e => {
            if (Math.sqrt((this.coordinates.x - e.coordinates.x) ** 2 + (this.coordinates.y - e.coordinates.y) ** 2) < (this.hitboxRadius + e.hitboxRadius) * this.blastingRadiusMultiplier
                && e.altitude < 25)
                inBlast.push(e)
        })
        inBlast.forEach(element => {
            if (element === this.origin)
                (element as Plane).planeState.destroyed = true
            else
                element.destroy(entities)
            document.getElementById("score")!.innerText = String(parseInt(document.getElementById("score")!.innerText) + 10)
        });
    }

    render = (speed: number): void => {
        this.coordinates = {
            x: this.coordinates.x, //+ Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + this.fallingSpeed
        }
        this.altitude -= 1
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
    }
}