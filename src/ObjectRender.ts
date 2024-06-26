type angles = "x" | "y"

const angles: { [angle in angles]: number } = {
  x: Math.PI * .7,
  y: Math.PI * .2
}

interface coords {
  x: number,
  y: number
}

export default abstract class ObjectRender {
  ctx: CanvasRenderingContext2D
  texture: HTMLImageElement
  coordinates: coords
  isometricAngles: coords
  hitboxRadius: number
  altitude: number
  isAirport: boolean
  constructor(ctx: CanvasRenderingContext2D, texture?: string, positionX?: number, positionY?: number) {
    this.isometricAngles = angles
    this.ctx = ctx
    this.hitboxRadius = 10
    this.altitude = 10
    this.texture = document.createElement("img")
    if (texture != undefined) { this.texture.setAttribute("src", `../assets/${texture}.png`) }
    this.coordinates = {
      x: positionX ?? 0,
      y: positionY ?? 0
    }
    this.isAirport = false
  }

  abstract render(speed: number): void
  // => {
  //   this.coordinates = {
  //     x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
  //     y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
  //   }
  //   this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
  // }

  destroy(array: ObjectRender[], targets?: ObjectRender[]): void {
    let index = array.findIndex(e => e === this)
    array.splice(index, 1)
  }
}