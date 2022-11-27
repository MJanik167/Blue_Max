import ObjectRender from "./ObjectRender.js";
import Projectile from "./Projectile.js";

type Directions = "left" | "right" | "up" | "down"

type states = "idle" | "left" | "right"

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

const spriteNames: { [state in states]: string[] } = {
  idle: ["plane1b.png", "plane2b.png"],
  left: ["left1b.png", "left2b.png"],
  right: ["right1b.png", "right2b.png"]
}


export default class Plane extends ObjectRender {
  pressedKeys: Array<Directions>
  velocity: number
  maxvelocity: number
  sprites: { [state in states]: HTMLImageElement[] }
  fired: boolean
  increaseSpeed: (e: number) => void
  addProjectile: (e: Projectile) => void
  constructor(ctx: CanvasRenderingContext2D, increaseSpeed: (speed: number) => void, addProjectile: (e: Projectile) => void) {
    super(ctx)

    this.pressedKeys = []
    this.fired = false
    this.increaseSpeed = increaseSpeed
    this.addProjectile = addProjectile
    this.velocity = 0
    this.maxvelocity = 5

    this.coordinates = {
      x: 230,
      y: 420
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
    if (this.velocity < this.maxvelocity && directions["up"].includes(event.key)) {
      this.velocity += 0.05
      this.increaseSpeed(this.velocity)
      return
    } else if (this.velocity >= this.maxvelocity) { this.velocity = this.maxvelocity }
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
    if (event.key === " ") {
      this.fired = false
    }
  }

  shoot = () => {
    this.addProjectile(new Projectile(this.ctx, this, this.coordinates.x + this.texture.width * .5, this.coordinates.y))
    this.fired = true
  }

  render = () => {
    if (this.pressedKeys.length != 0) {
      this.pressedKeys.forEach(e => {
        let addX = Math.cos(angles[e as Directions])
        let addY = 0
        if (this.coordinates.x < 0) { this.coordinates.x = 0; addX = 0 }
        else if (this.coordinates.x > 640 - this.texture.width) { this.coordinates.x = 640 - this.texture.width; addX = 0 }
        if (this.coordinates.y > 480 - this.texture.height) { this.coordinates.y = 480 - this.texture.height; addY = 0 }
        else if (this.coordinates.y < 0) { this.coordinates.y = 0; addY = 0 }
        this.coordinates = {
          x: this.coordinates.x + this.velocity * addX,
          y: this.coordinates.y + this.velocity * Math.sin(angles[e as Directions])
        }
      })
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
