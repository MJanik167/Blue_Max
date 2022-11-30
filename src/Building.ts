import ObjectRender from "./ObjectRender.js";
import Texture from "./Texture.js";

type BuildingTexture = 1 | 2 | 3 | 4

const textures: { [texture in BuildingTexture]: string } = {
    1: "buildings/bigGreen",
    2: "buildings/bigPink",
    3: "buildings/smallGray",
    4: "buildings/smallGreen"
}


export default class Building extends ObjectRender {
    addObject: (e: Texture) => void
    constructor(ctx: CanvasRenderingContext2D, building: BuildingTexture, positionX: number, addObject: (e: Texture) => void) {
        super(ctx, textures[building as BuildingTexture], positionX, 0)
        this.addObject = addObject
        let shorterSide = () => {
            if (this.texture.width < this.texture.height) { return this.texture.width / 2 }
            return this.texture.height / 2
        }
        this.hitboxRadius = shorterSide()

        this.coordinates = {
            x: this.coordinates.x,
            y: this.coordinates.y - this.texture.height
        }
    }

    destroy(array: ObjectRender[], targets?: ObjectRender[] | undefined): void {
        console.log("trafiony")
        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
        if (this.coordinates.y < 480) this.leaveRubble()
    }

    leaveRubble = (): void => {
        for (let i = 0; i < this.texture.width / 32; i++) {
            for (let j = 0; j < this.texture.height / 32; j++) {
                console.log('dziura')
                this.addObject(new Texture(this.ctx, "dziura", this.coordinates.x - this.texture.width * .25 + i * 32, this.coordinates.y - this.texture.height * .25 + j * 32, 1))
            }
        }
    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
        this.ctx.beginPath()
        this.ctx.arc(this.coordinates.x, this.coordinates.y, this.hitboxRadius, 0, Math.PI * 2)
        this.ctx.arc(this.coordinates.x, this.coordinates.y, 2, 0, Math.PI * 2)
        this.ctx.stroke()
    }
}