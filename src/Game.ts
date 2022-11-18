import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane.js"


type GameEntities = ObjectRender
type GameObject = typeof ObjectRender

interface speed {
    now: number,
    max: number
}

interface playerInfo {
    score: number,
    fuel: number,
    bombs: number,
    altitude: number
}

interface instances {
    entities: Array<GameEntities>,
    objects: Array<GameEntities>
}

export default class Game {
    speed: speed
    playerInfo: playerInfo
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    instances: instances
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.speed = {
            now: 0,
            max: 5
        }
        this.playerInfo = {
            score: 0,
            fuel: 300,
            bombs: 0,
            altitude: 0
        }
        this.canvas = canvas
        this.ctx = ctx
        this.instances = {
            entities: new Array<GameEntities>(1).fill(new Plane(this.ctx, "plane", this.increaseSpeed)),
            objects: new Array<GameEntities>(0)
        }
        this.frame()
    }

    increaseSpeed = () => {
        if (this.speed.now > this.speed.max) { return }
        this.speed.now += 0.05
    }

    createInstance = (object: GameObject, image: string, isEntity: boolean, positionX?: number, positionY?: number) => {
        if (isEntity)
            this.instances.entities.push(new object(this.ctx, image, positionX, positionY))
        else
            this.instances.objects.push(new object(this.ctx, image, positionX, positionY))
    }

    frame = async () => {
        if (this.speed.now > 0 && Date.now() % 2 == 0) this.createInstance(ObjectRender, "tree1", false, 100 + Math.floor(Math.random() * 900), -100)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.instances.objects.forEach(e => e.render(this.speed.now))
        this.instances.entities.forEach(e => e.render(this.speed.now))
        requestAnimationFrame(this.frame)
    }
}