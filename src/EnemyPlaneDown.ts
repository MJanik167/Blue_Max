import Enemy from "./Enemy.js";
import ObjectRender from "./ObjectRender.js";
import Projectile from "./Projectile.js";

type states = "idle" | "left" | "right"

const spriteNames: { [state in states]: string[] } = {
    idle: ["idle1.png", "idle2.png"],
    left: ["left1.png", "left2.png"],
    right: ["right1.png", "right2.png"]
}

export default class EnemyPlaneDown extends Enemy {
    shoot: (e: Projectile) => void
    constructor(ctx: CanvasRenderingContext2D, altitude: number, createProjectile: (e: Projectile) => void, positionX: number) {
        super(ctx, positionX, 0)
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
                img.setAttribute("src", `/assets/EnemyPlaneDownSprites/${el}`)
                return img
            })
        }
        this.texture = this.sprites["idle"][0]
        this.hitboxRadius = 16
    }


    render(speed: number): void {
        if (Date.now() % 75 === 0) { this.shoot(new Projectile(this.ctx, this, this.altitude, this.coordinates.x, this.coordinates.y, this.isometricAngles.x + Math.PI, this.isometricAngles.y + Math.PI)) }
        this.coordinates = {
            x: this.coordinates.x + speed * this.speedMultiplier * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * this.speedMultiplier * Math.cos(this.isometricAngles.y)
        }
        this.texture = Date.now() % 3 == 0 ? this.sprites["idle" as states][0] : this.sprites["idle" as states][1]
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5)
        this.ctx.beginPath()
        this.ctx.arc(this.coordinates.x, this.coordinates.y, 5, 0, Math.PI * 2)
        this.ctx.arc(this.coordinates.x, this.coordinates.y, this.hitboxRadius, 0, Math.PI * 2)
        this.ctx.stroke()
    }
}