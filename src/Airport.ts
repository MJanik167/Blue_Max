import ObjectRender from "./ObjectRender.js";

export default class Airport extends ObjectRender {
  constructor(ctx: CanvasRenderingContext2D, positionX?: number, positionY?: number) {
    super(ctx, "airport", positionX ?? 400, positionY ?? 250)
  }

  render(speed: number): void {
    this.coordinates = {
      x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
      y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
    }
    this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
    this.ctx.beginPath()
    this.ctx.arc(this.coordinates.x, this.coordinates.y, 5, 0, Math.PI * 2)
    this.ctx.stroke()
  }
}