import ObjectRender from "./ObjectRender"
import Plane from "./Plane"


type GameEntities = Plane | ObjectRender
type GameObject = typeof Plane | typeof ObjectRender



export default class Game {
    score: number
    speed: number
    playerInfo: Object
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    objects: Array<GameEntities>
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.speed = 0
        this.score = 0
        this.playerInfo = {
            fuel: 300,
            bombs: 0,
            altitude: 0
        }
        this.canvas = canvas
        this.ctx = ctx
        this.objects = []
        this.frame()
        this.createEntity(Plane, "plane")
    }

    createEntity = (object: GameObject, image: string) => {
        this.objects.push(new object(this.ctx, image, 0, 0))
    }

    frame = async () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.objects.forEach(e => e.render())
        requestAnimationFrame(this.frame)
    }
}