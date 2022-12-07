import Enemy from "./Enemy.js";
import ObjectRender from "./ObjectRender.js";
import Projectile from "./Projectile.js";
import Shadow from "./Shadow.js";

type states = "idle" | "left" | "right"

const spriteNames: { [state in states]: string[] } = {
  idle: ["idle1.png", "idle2.png"],
  left: ["left1.png", "left2.png"],
  right: ["right1.png", "right2.png"]
}


export default class EnemyPlaneUp extends Enemy {
  shoot: (e: Projectile) => void
  shadow: Shadow
  constructor(ctx: CanvasRenderingContext2D, altitude: number, createProjectile: (e: Projectile) => void, positionX: number) {
    super(ctx, positionX, 480)
    this.type = "up"
    this.altitude = altitude
    this.shoot = createProjectile
    this.sprites = {
      idle: [],
      left: [],
      right: []
    }

    for (let state in spriteNames) {
      this.sprites[state as states] = spriteNames[state as states].map((el): HTMLImageElement => {
        let img = document.createElement("img")
        img.setAttribute("src", `/assets/EnemyPlaneUpSprites/${el}`)
        return img
      })
    }

    this.shadow = new Shadow(this.ctx, this)
    this.texture = this.sprites["idle"][0]
    this.hitboxRadius = 16
  }


  render(speed: number): void {
    if (Date.now() % 35 === 0) { this.shoot(new Projectile(this.ctx, this, this.altitude, this.coordinates.x, this.coordinates.y)) }
    this.coordinates = {
      x: this.coordinates.x + speed * this.speedMultiplier * -Math.cos(this.isometricAngles.x),
      y: this.coordinates.y + speed * this.speedMultiplier * -Math.cos(this.isometricAngles.y)
    }
    this.texture = Date.now() % 3 == 0 ? this.sprites["idle" as states][0] : this.sprites["idle" as states][1]
    this.shadow.render(speed * this.speedMultiplier, -Math.cos(this.isometricAngles.x), -Math.cos(this.isometricAngles.y))
    this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
    this.ctx.beginPath()
  }
}