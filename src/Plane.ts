import ObjectRender from "./ObjectRender.js";

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

type states = "idle" | "left" | "right"

const planeStates: { [state in states]: string[] } = {
  idle: ["plane1.png", "plane2.png"],
  left: ["left1.png", "left2.png"],
  right: ["right1.png", "right2.png"]
}


export default class Plane extends ObjectRender {
  pressedKeys: Array<Directions>
  velocity: number
  maxvelocity: number
  planeState: { [state in states]: HTMLImageElement[] }
  increaseSpeed: () => void
  constructor(ctx: CanvasRenderingContext2D, texture: string, increaseSpeed: () => void) {
    super(ctx, texture)

    this.pressedKeys = []
    this.increaseSpeed = increaseSpeed
    this.velocity = 0
    this.maxvelocity = 5

    this.coordinates = {
      x: 300,
      y: 400
    }

    this.planeState = {
      idle: [],
      left: [],
      right: []
    }

    for (let state in planeStates) {
      (this.planeState[state as states]) = (planeStates[state as states]).map((el): HTMLImageElement => {
        let img: HTMLImageElement = document.createElement("img")
        img.setAttribute("src", `/assets/planeSprites/${el}`)
        return img
      })
    }
    console.log(this.planeState)

    window.addEventListener("keydown", this.press)
    window.addEventListener("keyup", this.release)
  }

  press = (event: KeyboardEvent) => {
    for (let direction in directions) {
      if (directions[direction as Directions].includes(event.key))
        if (this.pressedKeys.includes(direction as Directions)) { return }
        else this.pressedKeys.push(direction as Directions)
    }
    if (event.key === " ")
      this.shoot()
  }

  release = (event: KeyboardEvent) => {
    for (let direction in directions) {
      if (directions[direction as Directions].includes(event.key))
        if (this.pressedKeys.includes(direction as Directions))
          this.pressedKeys.splice(this.pressedKeys.indexOf(direction as Directions))
    }
  }

  shoot = () => {
    console.log("💩💩💩💩💩💩💩💩💩💩💩💩")

  }

  render = () => {
    if (this.pressedKeys.length != 0) {
      this.increaseSpeed()
      if (this.velocity <= this.maxvelocity) this.velocity += 0.05
      this.pressedKeys.forEach(e =>
        this.coordinates = {
          x: this.coordinates.x + this.velocity * Math.cos(angles[e as Directions]),
          y: this.coordinates.y + this.velocity * Math.sin(angles[e as Directions])
        }
      )
    }
    if (this.velocity > 0) {

      if (this.pressedKeys.includes("left") && this.pressedKeys.length === 1) {
        this.texture = Date.now() % 3 == 0 ? this.planeState.left[0] : this.planeState.left[1]
      }
      else if (this.pressedKeys.includes("right") && this.pressedKeys.length === 1) {
        this.texture = Date.now() % 3 == 0 ? this.planeState.right[0] : this.planeState.right[1]
      }
      else { this.texture = Date.now() % 3 == 0 ? this.planeState.idle[0] : this.planeState.idle[1] }
    }
    this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
  }
}
