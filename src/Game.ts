import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane.js"


type GameEntities = ObjectRender
type GameObject = typeof ObjectRender



export default class Game {
    score: number
    speed: number
    maxSpeed: number
    playerInfo: Object
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    entities: Array<GameEntities>
    objects: Array<GameEntities>
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.speed = 0
        this.maxSpeed = 3
        this.score = 0
        this.playerInfo = {
            fuel: 300,
            bombs: 0,
            altitude: 0
        }
        this.canvas = canvas
        this.ctx = ctx
        this.entities = []
        this.objects = []
        this.frame()
        this.entities.push(new Plane(this.ctx, "plane", this.increaseSpeed))
    }

    increaseSpeed = () => {
        if (this.speed == this.maxSpeed) { return }
        this.speed++

    }

    createInstance = (object: GameObject, image: string, isEntity: boolean, positionX?: number, positionY?: number) => {
        if (isEntity)
            this.entities.push(new object(this.ctx, image, positionX, positionY))
        else
            this.objects.push(new object(this.ctx, image, positionX, positionY))
    }

    frame = async () => {
        if (this.speed > 0) this.createInstance(ObjectRender, "tree1", false, 100 + Math.floor(Math.random() * 900), -100)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.objects.forEach(e => e.render(this.speed))
        this.entities.forEach(e => e.render(this.speed))
        requestAnimationFrame(this.frame)
    }
}