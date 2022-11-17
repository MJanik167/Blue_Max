interface coords {
  x: number
  y: number
}

export default class ObjectRender {
  ctx: CanvasRenderingContext2D
  texture: HTMLImageElement
  coordinates: coords
  constructor(ctx: CanvasRenderingContext2D, texture: string, positionX?: number, positionY?: number) {
    this.ctx = ctx
    this.texture = document.createElement("img")
    this.texture.setAttribute("src", `../assets/${texture}.png`)
    this.coordinates = {
      x: positionX,
      y: positionY
    }
  }

  render = () => {
    this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
  }
}