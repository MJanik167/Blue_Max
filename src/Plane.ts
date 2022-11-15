import ObjectRender from "./ObjectRender";

interface direction {
  x: number
  y: number
}

export default class Plane extends ObjectRender {
  directions: direction
  constructor(ctx: CanvasRenderingContext2D, positionX: number, positionY: number) {
    super(ctx, "plane", positionX, positionY)
    this.directions = {
      x: 2,
      y: -2
    }

  }

  render = () => {
    this.coordinates.x += this.directions.x
    this.coordinates.y += this.directions.y
    this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
  }
}