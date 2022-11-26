import ObjectRender from "./ObjectRender.js";
import Projectile from "./Projectile.js";

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

const spriteNames: { [state in states]: string[] } = {
  idle: ["plane1.png", "plane2.png"],
  left: ["left1.png", "left2.png"],
  right: ["right1.png", "right2.png"]
}


export default class Plane extends ObjectRender {
  pressedKeys: Array<Directions>
  velocity: number
  maxvelocity: number
  sprites: { [state in states]: HTMLImageElement[] }
  fired: boolean
  increaseSpeed: () => void
  addProjectile: (e: Projectile) => void
  constructor(ctx: CanvasRenderingContext2D, increaseSpeed: () => void, addProjectile: (e: Projectile) => void) {
    super(ctx)

    this.pressedKeys = []
    this.fired = false
    this.increaseSpeed = increaseSpeed
    this.addProjectile = addProjectile
    this.velocity = 0
    this.maxvelocity = 5

    this.coordinates = {
      x: 300,
      y: 400
    }

    this.sprites = {
      idle: [],
      left: [],
      right: []
    }

    for (let state in spriteNames) {
      this.sprites[state as states] = spriteNames[state as states].map((el): HTMLImageElement => {
        let img = document.createElement("img")
        img.setAttribute("src", `/assets/planeSprites/${el}`)
        return img
      })
    }

    this.texture = this.sprites.idle[0]
    console.log(this.sprites)

    window.addEventListener("keydown", this.press)
    window.addEventListener("keyup", this.release)
  }

  press = (event: KeyboardEvent) => {
    for (let direction in directions) {
      if (directions[direction as Directions].includes(event.key))
        if (this.pressedKeys.includes(direction as Directions)) { return }
        else this.pressedKeys.push(direction as Directions)
    }
    if (event.key === " " && this.velocity >= this.maxvelocity && !this.fired)
      this.shoot()
  }

  release = (event: KeyboardEvent) => {
    for (let direction in directions) {
      if (directions[direction as Directions].includes(event.key))
        if (this.pressedKeys.includes(direction as Directions))
          this.pressedKeys.splice(this.pressedKeys.indexOf(direction as Directions))
    }
    if (event.key === " ") { this.fired = false }
  }

  shoot = () => {
    this.addProjectile(new Projectile(this.ctx, this.coordinates.x + this.texture.width * .5, this.coordinates.y))
    this.fired = true
  }

  render = () => {
    if (this.pressedKeys.length != 0) {
      this.increaseSpeed()
      if (this.velocity <= this.maxvelocity) { this.velocity += 0.05 }
      else { this.velocity = this.maxvelocity }
      this.pressedKeys.forEach(e =>
        this.coordinates = {
          x: this.coordinates.x + this.velocity * Math.cos(angles[e as Directions]),
          y: this.coordinates.y + this.velocity * Math.sin(angles[e as Directions])
        }
      )
    }
    if (this.velocity > 0) {
      let position = "idle"
      if (this.pressedKeys.includes("left") && this.pressedKeys.length === 1) { position = "left" }
      else if (this.pressedKeys.includes("right") && this.pressedKeys.length === 1) { position = "right" }
      this.texture = Date.now() % 3 == 0 ? this.sprites[position as states][0] : this.sprites[position as states][1]
    }
    this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
  }

  destroy(): void {

  }
}
