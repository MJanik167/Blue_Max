import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane.js"


type GameEntities = ObjectRender
type GameObject = typeof ObjectRender

type angles = "x" | "y"

const angles: { [angle in angles]: number } = {
    x: Math.PI * .7,
    y: Math.PI * .2
}

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

interface background {
    src: HTMLImageElement,
    x: number
    y: number
}

export default class Game {
    speed: speed
    playerInfo: playerInfo
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    instances: instances
    background: background
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.speed = {
            now: 0,
            max: 3
        }
        this.playerInfo = {
            score: 0,
            fuel: 300,
            bombs: 0,
            altitude: 0
        }
        let img = document.createElement("img")
        img.setAttribute("src", "../assets/background.png")
        this.background = {
            src: img,
            x: -800,
            y: -img.height - 1000
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.background.src, this.background.x += Math.cos(angles.x) * this.speed.now, this.background.y += Math.cos(angles.y) * this.speed.now, 1980 * 3, 1080 * 3)
        // if (this.speed.now > 0 && Date.now() % 2 == 0) this.createInstance(ObjectRender, "tree1", false, 100 + Math.floor(Math.random() * 900), -100)
        // this.instances.objects.forEach(e => {
        //     e.render(this.speed.now)
        // })
        console.log(this.instances.objects.length)
        this.instances.entities.forEach(e => e.render(this.speed.now))
        requestAnimationFrame(this.frame)
    }
}