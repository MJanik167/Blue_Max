import ObjectRender from "./ObjectRender";

type BuildingTexture = 1 | 2 | 3 | 4

const textures: { [texture in BuildingTexture]: string } = {
    1: "buildings/short.png",
    2: "buildings/tall.png",
    3: "buildings/big.png",
    4: "buildings/small.png"
}


export default class Building extends ObjectRender {
    constructor(ctx: CanvasRenderingContext2D, building: BuildingTexture, positionX: number) {
        super(ctx, textures[building as BuildingTexture], positionX)
        let shorterSide = () => {
            if (this.texture.width < this.texture.height) { return this.texture.width }
            return this.texture.height
        }
        this.hitboxRadius = shorterSide()

    }

    destroy(array: ObjectRender[], targets?: ObjectRender[] | undefined): void {

    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    }
}