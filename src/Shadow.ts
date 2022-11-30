import ObjectRender from "./ObjectRender.js";
import Plane from "./Plane.js";

export default class Shadow extends ObjectRender {
  parent: ObjectRender
  main: boolean | undefined
  constructor(ctx: CanvasRenderingContext2D, parent: ObjectRender, main?: boolean) {
    super(ctx, "shadow1", parent.coordinates.x, parent.coordinates.y)
    this.parent = parent
    this.main = main
    this.hitboxRadius = 300
    if (main) this.coordinates.y += 5
    else this.coordinates.y += 3 * this.parent.altitude
  }

  render(speed: number, angleX?: number, angleY?: number, objects?: ObjectRender[]): void {
    if (this.main) {
      console.log(objects)
      objects!.forEach(e => {
        if (e.isAirport)
          if (Math.sqrt((this.coordinates.x - e.coordinates.x) ** 2 + (this.coordinates.y - e.coordinates.y) ** 2) < this.hitboxRadius)
            (this.parent as Plane).planeState.overAirport = true
          else {
            console.log("nie jest");
            (this.parent as Plane).planeState.overAirport = false
          }
      })
    }
    this.coordinates = {
      x: speed === 0 ? this.parent.coordinates.x : this.coordinates.x + speed * angleX!,
      y: speed === 0 ? this.coordinates.y : this.coordinates.y + speed * angleY!
    }
    this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
  }

  destroy(array: ObjectRender[], targets?: ObjectRender[] | undefined): void {
    let index = array.findIndex(e => e === this)
    array.splice(index, 1)
  }
}