import Enemy from "./Enemy.js"
import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane.js"
import Projectile from "./Projectile.js"


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

type instance = "entities" | "objects" | "projectiles"

interface instances {
    objects: GameEntities[],
    entities: GameEntities[],
    projectiles: GameEntities[]
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
            max: 2
        }
        this.playerInfo = {
            score: 0,
            fuel: 300,
            bombs: 0,
            altitude: 0
        }
        let img = document.createElement("img")
        img.setAttribute("src", "../assets/testb.png")
        this.background = {
            src: img,
            x: 0,
            y: img.height - canvas.height
        }

        this.canvas = canvas
        this.ctx = ctx
        this.instances = {
            objects: new Array<GameEntities>(0),
            entities: new Array<GameEntities>(1).fill(new Plane(this.ctx, this.increaseSpeed, (e: Projectile): void => { this.instances.projectiles.push(e) }, (e: ObjectRender): void => { this.instances.objects.push(e) })),
            projectiles: new Array<GameEntities>(0)
        }
        for (let i = 0; i < 15; i++) {
            this.instances.entities.push(new Enemy(ctx, 100 + 60 * i, 300))
            this.instances.entities.push(new Enemy(ctx, 100 + 60 * i, 350))
        }
        this.frame()
    }

    increaseSpeed = (speed: number) => {
        document.getElementById("speed")!.innerText = String(Math.round((speed * 100) / 2.5))
        if (this.speed.now > this.speed.max) { return }
        this.speed.now += 0.05;
    }

    // createInstance = (object: GameObject, image: string, isEntity: boolean, positionX?: number, positionY?: number) => {
    //     if (isEntity)
    //         this.instances.entities.push(new object(this.ctx, image, positionX, positionY))
    //     else
    //         this.instances.objects.push(new object(this.ctx, image, positionX, positionY))
    // }

    frame = async () => {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // this.ctx.drawImage(this.background.src, this.background.x += Math.cos(angles.x) * this.speed.now, this.background.y += Math.cos(angles.y) * this.speed.now, 1980 * 3, 1080 * 3)
        this.ctx.drawImage(
            this.background.src,
            this.background.x -= Math.cos(angles.x) * this.speed.now, this.background.y -= Math.cos(angles.y) * this.speed.now, //pozycja wyciętego fragment na oryginalnym obrazku 
            this.canvas.width, this.canvas.height, //wielkość wyciętego fragmentu
            0, 0, // pozycja obrazka na canvasie
            this.canvas.width, this.canvas.height
        )
        // console.log(this.background.y, this.background.src.height)
        if (this.background.y < 0) {
            this.background.y = this.background.src.height - this.canvas.height
            this.background.x = 0
        } // rozmiar obrazka na canvasie
        // if (this.speed.now > 0 && Date.now() % 2 == 0) this.createInstance(ObjectRender, "tree1", false, 100 + Math.floor(Math.random() * 900), -100)
        for (let instance in this.instances) {
            this.instances[instance as instance].forEach(e => {
                if (instance == "projectiles" as instance) {
                    let target = (e as Projectile).checkForCollision(this.instances.entities)
                    for (let instance in this.instances) {
                        if (target)
                            if (this.instances[instance as instance].includes(target)) {
                                target.destroy(this.instances[instance as instance], this.instances.entities)
                                if (e !== target)
                                    e.destroy(this.instances.projectiles, this.instances.entities)
                            }
                    }
                }
                if ((e.coordinates.x > this.canvas.width || e.coordinates.x < 0 - e.texture.width)
                    || (e.coordinates.y < 0 - e.texture.height || e.coordinates.y > this.canvas.height))
                    e.destroy(this.instances[instance as instance], this.instances.entities)
                if (this.instances[instance as instance].includes(e)) e.render(this.speed.now)
            })
        }

        // this.instances.objects.forEach(e => {
        //     e.render(this.speed.now)
        // })
        // this.instances.entities.forEach(e => {
        //     e.render(this.speed.now)
        //     if ((e.coordinates.x > this.canvas.width || e.coordinates.x < 0 - e.texture.width)
        //         || (e.coordinates.y < 0 - e.texture.height || e.coordinates.y > this.canvas.height))
        //         e.destroy(this.instances.entities)
        // })
        //console.log(this.instances.entities)
        requestAnimationFrame(this.frame)
    }
}