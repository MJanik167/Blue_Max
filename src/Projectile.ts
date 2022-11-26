import ObjectRender from "./ObjectRender.js";


export default class Projectile extends ObjectRender {
    constructor(ctx: CanvasRenderingContext2D, positionX: number, positionY: number) {
        super(ctx, undefined, positionX, positionY);
        let texture = document.createElement("img")
        texture.setAttribute("src", "/assets/projectile.png")
        this.texture = texture
        this.hitboxRadius = 5
    }

    checkForCollision = (entities:ObjectRender[]):ObjectRender|undefined => {
        let object = undefined
        entities.forEach(e=>{
            if(Math.sqrt(Math.pow(this.coordinates.x - e.coordinates.x,2)+ Math.pow(this.coordinates.y - e.coordinates.y,2))<this.hitboxRadius+e.hitboxRadius)
            object = e
        })
        return object
    }

    render(speed: number): void {
        this.coordinates = {
            x: this.coordinates.x + speed * 20 * -Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * 20 * -Math.cos(this.isometricAngles.y)
        }
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    }

    destroy(array: ObjectRender[]): void {
        let index = array.findIndex(e => e === this)
        array.splice(index, 1)
    }
}