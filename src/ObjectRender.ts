interface coords {
  x: number
  y: number
}

const angles = {
  x: Math.PI,
  y: Math.PI * .5
}

export default class ObjectRender {
  ctx: CanvasRenderingContext2D
  texture: HTMLImageElement
  coordinates: coords
  isometricAngles: coords
  constructor(ctx: CanvasRenderingContext2D, texture: string, positionX?: number, positionY?: number) {
    this.isometricAngles = angles
    this.ctx = ctx
    this.texture = document.createElement("img")
    this.texture.setAttribute("src", `../assets/${texture}.png`)
    this.coordinates = {
      x: positionX ?? 0,
      y: positionY ?? 0
    }
  }

  render = (speed: number) => {
    this.coordinates = {
      x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
      y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
    }
    this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
  }
}