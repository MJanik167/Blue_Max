import ObjectRender from "./ObjectRender";

type Directions = "left" | "right" | "up" | "down"

const directions: { [directions in Directions]: string[] } = {
  left: ["ArrowLeft", "a", "A"],
  right: ["ArrowRight", "d", "D"],
  up: ["ArrowUp", "w", "W"],
  down: ["ArrowDown", "s", "S"],
}

const angles: { [angles in Directions]: number } = {
  left: Math.PI * 1.05,
  right: Math.PI * 0.05,
  up: Math.PI * 1.5,
  down: Math.PI * 0.5
}

export default class Plane extends ObjectRender {
  pressedKeys: Array<Directions>
  sensitivity: number
  constructor(ctx: CanvasRenderingContext2D, texture: string, positionX: number, positionY: number) {
    super(ctx, texture, positionX, positionY)
    this.sensitivity = 5
    this.coordinates = {
      x: 350,
      y: 350
    }
    this.pressedKeys = []
    window.addEventListener("keydown", this.press)
    window.addEventListener("keyup", this.release)
  }

  press = (event: KeyboardEvent) => {
    console.log(event.key)
    for (let direction in directions) {
      if (directions[direction as Directions].includes(event.key))
        if (this.pressedKeys.includes(direction as Directions)) { return }
        else this.pressedKeys.push(direction as Directions)
    }
  }

  release = (event: KeyboardEvent) => {
    for (let direction in directions) {
      if (directions[direction as Directions].includes(event.key))
        if (this.pressedKeys.includes(direction as Directions))
          this.pressedKeys.splice(this.pressedKeys.indexOf(direction as Directions))
    }
  }

  render = () => {
    if (this.pressedKeys.length != 0) {
      this.pressedKeys.forEach(e =>
        this.coordinates = {
          x: this.coordinates.x + this.sensitivity * Math.cos(angles[e as Directions]),
          y: this.coordinates.y + this.sensitivity * Math.sin(angles[e as Directions])
        }
      )
    }
    this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
  }
}