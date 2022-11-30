import ObjectRender from "./ObjectRender.js";
import Texture from "./Texture.js";

export default class Tank extends ObjectRender {
    addObject: (e: Texture) => void
    constructor(ctx: CanvasRenderingContext2D, positionX: number, addObject: (e: Texture) => void) {
        super(ctx, "tank", positionX, -100)
        this.addObject = addObject
        this.hitboxRadius = 8
    }


    destroy(array: ObjectRender[], targets?: ObjectRender[] | undefined): void {
        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
        this.leaveRubble()
    }

    leaveRubble = (): void => {
        for (let i = 0; i < this.texture.width / 32; i++) {
            for (let j = 0; j < this.texture.height / 32; j++) {
                this.addObject(new Texture(this.ctx, "rubble", this.coordinates.x - this.texture.width * .25 + i * 32, this.coordinates.y - this.texture.height * .25 + j * 32, 1))
            }
        }
    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
    }
}