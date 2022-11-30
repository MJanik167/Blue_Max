import ObjectRender from "./ObjectRender.js";
import Texture from "./Texture.js";

type BuildingTexture = 1 | 2 | 3 | 4 | 5

const textures: { [texture in BuildingTexture]: string } = {
    1: "buildings/bigGreen",
    2: "buildings/bigPink",
    3: "buildings/smallGray",
    4: "buildings/smallGreen",
    5: "buildings/9.11"
}


export default class Building extends ObjectRender {
    addObject: (e: Texture) => void
    constructor(ctx: CanvasRenderingContext2D, building: BuildingTexture, positionX: number, addObject: (e: Texture) => void) {
        super(ctx, textures[building as BuildingTexture], positionX, 0)
        this.addObject = addObject
        this.altitude = 0
        this.hitboxRadius = 64

        this.coordinates = {
            x: this.coordinates.x,
            y: this.coordinates.y - this.texture.height
        }
    }

    destroy(array: ObjectRender[], targets?: ObjectRender[] | undefined): void {

        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
        if (this.coordinates.y < 480) this.leaveRubble()
    }

    leaveRubble = (): void => {
        for (let i = 0; i < this.texture.width / 32; i++) {
            for (let j = 0; j < this.texture.height / 32; j++) {
                this.addObject(new Texture(this.ctx, "rubble", this.coordinates.x - this.texture.width * .25 + i * 32, this.coordinates.y - this.texture.height * .25 + j * 32, 1))
                document.getElementById("score")!.innerText = String(parseInt(document.getElementById("score")!.innerText) + 10)
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