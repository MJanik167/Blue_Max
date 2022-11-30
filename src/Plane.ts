import ObjectRender from "./ObjectRender.js";
import Projectile from "./Projectile.js";
import Bomb from "./Bomb.js"
import Shadow from "./Shadow.js";
import Texture from "./Texture.js";

type Directions = "left" | "right" | "up" | "down"

type states = "idle" | "left" | "right"

const directions: { [directions in Directions]: string[] } = {
  left: ["ArrowLeft", "a", "A"],
  right: ["ArrowRight", "d", "D"],
  up: ["ArrowUp", "w", "W"],
  down: ["ArrowDown", "s", "S"]
}

const angles: { [angles in Directions]: number } = {
  left: Math.PI,
  right: 0,
  up: Math.PI * 1.5,
  down: Math.PI * 0.5
}

const spriteNames: { [state in states]: string[] } = {
  idle: ["plane1b.png", "plane2b.png"],
  left: ["left1b.png", "left2b.png"],
  right: ["right1b.png", "right2b.png"]
}

interface planeState {
  velocity: {
    now: number
    max: number
  },
  fired: boolean,
  lastBomb: number,
  bombs: number,
  fuel: number,
  overAirport: boolean,
  landing: boolean
}


export default class Plane extends ObjectRender {
  pressedKeys: Array<Directions>
  sprites: { [state in states]: HTMLImageElement[] }
  planeState: planeState
  shadow: Shadow
  gameObjects: ObjectRender[]
  increaseSpeed: (e: number) => void
  addProjectile: (e: Projectile) => void
  createObject: (e: ObjectRender) => void
  constructor(ctx: CanvasRenderingContext2D,
    increaseSpeed: (speed: number) => void,
    addProjectile: (e: Projectile) => void,
    createOject: (newObject: ObjectRender) => void,
    gameObjects: ObjectRender[]
  ) {
    super(ctx)

    this.pressedKeys = []
    this.gameObjects = gameObjects
    this.increaseSpeed = increaseSpeed
    this.addProjectile = addProjectile
    this.createObject = createOject
    this.planeState = {
      velocity: {
        now: 0,
        max: 5
      },
      fired: false,
      bombs: 30,
      lastBomb: 0,
      fuel: 300,
      overAirport: false,
      landing: false
    }

    this.coordinates = {
      x: 260,
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
    this.shadow = new Shadow(this.ctx, this, true)
    this.displayBombs()
    this.displayFuel()

    window.addEventListener("keydown", this.press)
    window.addEventListener("keyup", this.release)
  }

  press = (event: KeyboardEvent) => {
    if (this.planeState.velocity.now < this.planeState.velocity.max - 0.1) {
      if (directions["up"].includes(event.key)) {
        this.planeState.velocity.now += 0.1
        this.increaseSpeed(this.planeState.velocity.now)
      }
      return
    }
    this.planeState.velocity.now = this.planeState.velocity.max
    for (let direction in directions) {
      if (directions[direction as Directions].includes(event.key))
        if (this.pressedKeys.includes(direction as Directions)) { return }
        else this.pressedKeys.push(direction as Directions)
    }
    if (event.key === " " && this.planeState.velocity.now >= this.planeState.velocity.max && !this.planeState.fired) {
      this.addProjectile(new Projectile(this.ctx, this, this.altitude, this.coordinates.x + this.texture.width * .5, this.coordinates.y))
      this.planeState.fired = true
    }
    else if ((event.key === "x" || event.key === "X") && this.planeState.velocity.now >= this.planeState.velocity.max && this.planeState.bombs > 0) {
      this.addProjectile(new Bomb(this.ctx, this, this.altitude, this.createObject, this.coordinates.x, this.coordinates.y + this.texture.height * .5))
      this.planeState.lastBomb = Date.now()
      this.planeState.bombs--
      this.displayBombs()
    }
  }

  release = (event: KeyboardEvent) => {
    for (let direction in directions) {
      if (directions[direction as Directions].includes(event.key))
        if (this.pressedKeys.includes(direction as Directions))
          this.pressedKeys.splice(this.pressedKeys.indexOf(direction as Directions))
    }
    if (event.key === " ") {
      this.planeState.fired = false
    }
  }

  displayBombs = () => {
    document.getElementById("bombs")!.innerText =
      this.planeState.bombs >= 10 ?
        String(this.planeState.bombs)
        : "0" + String(this.planeState.bombs)
  }

  displayFuel = () => {
    let text: string = String(Math.round(this.planeState.fuel))
    if (this.planeState.fuel < 100) { text = "0" + String(Math.round(this.planeState.fuel)) }
    else if (this.planeState.fuel < 10) { text = "00" + String(Math.round(this.planeState.fuel)) }
    document.getElementById("fuel")!.innerText = text
  }

  render = () => {
    if (this.planeState.landing) {
      this.planeState.velocity.now = 0
      this.altitude > 0 ? this.altitude -= 0.5 : this.altitude = 0
      document.getElementById("altitude")!.innerText = String(this.altitude > 10 ? Math.round(this.altitude) : 0 + String(Math.round(this.altitude)))
      this.increaseSpeed(-0.5)
      this.coordinates = {
        x: this.coordinates.x <= 260 ? this.coordinates.x + 1.5 * Math.cos(angles['down' as Directions]) : this.coordinates.x,
        y: this.coordinates.y <= 420 ? this.coordinates.y + 1.5 * Math.sin(angles['down' as Directions]) : this.coordinates.y
      }
      if (this.planeState.velocity.now === 0) {
        setTimeout(() => {
          this.planeState = {
            velocity: {
              now: 0,
              max: 5
            },
            fired: false,
            bombs: 30,
            lastBomb: 0,
            fuel: 300,
            overAirport: false,
            landing: false
          }
          this.altitude = 0
          this.planeState.landing = false
          this.displayBombs()
          this.displayFuel()
        }, 2000);
      }
    }


    if (this.pressedKeys.length != 0) {
      this.pressedKeys.forEach(e => {

        if (e === "down" && this.altitude <= 25) {
          if (!this.planeState.overAirport) { return }
          else { this.planeState.landing = true }
        }
        if (this.coordinates.x < 0) { this.coordinates.x = 0 }
        else if (this.coordinates.x > 640 - this.texture.width) { this.coordinates.x = 640 - this.texture.width }
        if (this.coordinates.y > 480 - this.texture.height) { this.coordinates.y = 480 - this.texture.height }
        else if (this.coordinates.y < 0) { this.coordinates.y = 0 }
        if (e === "up" && this.planeState.velocity.now === this.planeState.velocity.max && this.coordinates.y != 0) { document.getElementById("altitude")!.innerText = String(Math.round(this.altitude += 1.5)) }
        else if (e === "down" && this.planeState.velocity.now === this.planeState.velocity.max && this.altitude > 0) { document.getElementById("altitude")!.innerText = String(Math.round(this.altitude -= 1.5)) }
        this.coordinates = {
          x: this.coordinates.x + this.planeState.velocity.now * Math.cos(angles[e as Directions]),
          y: this.coordinates.y + this.planeState.velocity.now * Math.sin(angles[e as Directions])
        }
      })
    }
    if (this.planeState.velocity.now > 0) {
      this.planeState.fuel -= .03
      this.displayFuel()
      let position = "idle"
      if (this.pressedKeys.includes("left") && this.pressedKeys.length === 1) { position = "left" }
      else if (this.pressedKeys.includes("right") && this.pressedKeys.length === 1) { position = "right" }
      this.texture = Date.now() % 3 == 0 ? this.sprites[position as states][0] : this.sprites[position as states][1]
    }

    this.shadow.render(0, undefined, undefined, this.gameObjects)
    this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
  }

  destroy(array: ObjectRender[]): void {
    let index = array.findIndex(e => e === this)
    array.splice(index, 1)
    this.createObject(new Texture(this.ctx, "dziura", this.coordinates.x, this.coordinates.y, 0))
  }
}
