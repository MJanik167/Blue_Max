import ObjectRender from "./ObjectRender.js";

export default class Airport extends ObjectRender {
  isAirport: boolean
  constructor(ctx: CanvasRenderingContext2D, positionX?: number, positionY?: number) {
    super(ctx, "airport", positionX ?? 400, positionY ?? 250)
    this.isAirport = true
    this.hitboxRadius = 300
  }



  render(speed: number): void {
    this.coordinates = {
      x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
      y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
    }
    this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
  }
}