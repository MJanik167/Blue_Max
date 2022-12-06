import Airport from "./Airport.js"
import Building from "./Building.js"
import Enemy from "./Enemy.js"
import EnemyPlaneDown from "./EnemyPlaneDown.js"
import EnemyPlaneUp from "./EnemyPlaneUp.js"
import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane.js"
import Projectile from "./Projectile.js"
import Tank from "./Tank.js"
import Texture from "./Texture.js"
import enemyData from "./data.js"


type angles = "x" | "y"

const angles: { [angle in angles]: number } = {
    x: Math.PI * .7,
    y: Math.PI * .2
}

interface speed {
    now: number,
    max: number
}

type instance = "entities" | "objects" | "projectiles"

interface instances {
    objects: ObjectRender[],
    entities: ObjectRender[],
    projectiles: ObjectRender[]
}

interface background {
    src: HTMLImageElement,
    x: number
    y: number
}

export default class Game {
    speed: speed
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    instances: instances
    background: background
    player: Plane | undefined
    map: number
    gravity: boolean
    active: boolean
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, gravity: boolean) {
        this.map = 0
        this.active = true
        this.gravity = gravity
        this.canvas = canvas
        this.speed = {
            now: 0,
            max: 2
        }
        let img = document.createElement("img")
        img.setAttribute("src", "../assets/testb.png")
        this.background = {
            src: img,
            x: this.map === 0 ? this.canvas.width : 0,
            y: img.height - canvas.height
        }


        this.ctx = ctx
        this.instances = {
            objects: new Array<ObjectRender>(1).fill(new Airport(this.ctx)),
            entities: new Array<ObjectRender>(0),
            projectiles: new Array<ObjectRender>(0)
        }
        this.player = new Plane(this.ctx, this.increaseSpeed, (e: Projectile): void => { this.instances.projectiles.push(e) }, (e: ObjectRender): void => { this.instances.objects.push(e) }, this.instances.objects)
        this.instances.entities.push(this.player)
        this.frame()
    }


    increaseSpeed = (speed: number) => {
        if (speed < 5) {
            document.getElementById("speed")!.innerHTML = String(Math.round((speed >= 0 ? speed * 100 : 0) / 2.5))
            document.getElementById("speed")!.style.color = Math.round((speed >= 0 ? speed * 100 : 0) / 2.5) < 100 ? "crimson" : "white"
        } if (speed < 0) {
            this.speed.now > 0.2 ? this.speed.now -= 0.2 : 0
        }
        if (this.speed.now > this.speed.max) { return }
        if (speed > 0) this.speed.now += 0.05

    }

    makeTanks = (x: number) => {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 3; j++) {
                setTimeout(() => {
                    Math.floor(Math.random() * 2) == 0 ? this.instances.entities.unshift(new Tank(this.ctx, x + 36 * i, (e: Texture) => (this.instances.objects.push(e)))) : 0
                }, 200 * j);
            }
        }
    }

    gameOver = () => {
        if (this.player != undefined) (this.player as Plane).destroy(this.instances.entities)
        this.speed.now = 0
        this.instances.entities = []
        this.instances.projectiles = []
        this.player = undefined
        // setTimeout(() => {
        //     this.active = false
        // }, 20);

    }

    start = () => {
        (this.player as Plane).planeState.starting = true
    }

    frame = async () => {
        this.ctx.drawImage(
            this.background.src,
            this.background.x -= Math.cos(angles.x) * this.speed.now, this.background.y -= Math.cos(angles.y) * this.speed.now, //pozycja wyciętego fragment na oryginalnym obrazku 
            this.canvas.width, this.canvas.height, //wielkość wyciętego fragmentu
            0, 0, // pozycja obrazka na canvasie
            this.canvas.width, this.canvas.height
        )

        if (Date.now() % 154 === 0 && this.speed.now >= this.speed.max && !this.instances.objects.find(e => e.isAirport === true)) {
            this.instances.entities.push(Math.floor(Math.random() * 2) === 1 ? new EnemyPlaneDown(this.ctx, Math.floor((Math.random() * 40) + 30), (e: Projectile): void => { this.instances.projectiles.push(e) }, Math.floor(Math.random() * this.canvas.width)) : new EnemyPlaneUp(this.ctx, Math.floor((Math.random() * 70) + 40), (e: Projectile): void => { this.instances.projectiles.push(e) }, Math.floor(Math.random() * this.canvas.width)))
        }

        if (this.player?.planeState.destroyed)
            this.gameOver()

        if (this.background.y < 0) {
            this.map = Math.floor(Math.random() * 2)
            this.background.y = this.background.src.height - this.canvas.height
            this.background.x = this.map === 0 ? this.canvas.width : 0
        }

        if (this.background.y < 510 && !this.instances.objects.find(e => e.isAirport === true)) {//&& parseInt(document.getElementById('fuel')!.innerText) < 200) {
            this.instances.objects.push(new Airport(this.ctx, 800, -275));
        }

        for (let instance in this.instances) {
            this.instances[instance as instance].forEach(e => {
                if (instance == "projectiles" as instance) {
                    let target = (e as Projectile).checkForCollision(this.instances.entities)
                    for (let instance in this.instances) {
                        if (target)
                            if (this.instances[instance as instance].includes(target)) {
                                target.destroy(this.instances[instance as instance], this.instances.entities)
                                document.getElementById("score")!.innerText = String(parseInt(document.getElementById("score")!.innerText) + 10)
                                if (target === (this.player as Plane)) { this.gameOver() }
                                if (e !== target)
                                    e.destroy(this.instances.projectiles, this.instances.entities)
                            }
                    }
                }
                if ((e.coordinates.x > this.canvas.width ** 2 || e.coordinates.x < 0 - e.texture.width - 200)
                    || (e.coordinates.y < 0 - e.texture.height - 200 || e.coordinates.y > this.canvas.height * 2))
                    e.destroy(this.instances[instance as instance], this.instances.entities)
                if (this.instances[instance as instance].includes(e)) e.render(this.speed.now)
            })
        }

        if (this.speed.now >= this.speed.max) {
            if ((this.player as Plane).planeState.destroyed) {
                (this.player as Plane).destroy(this.instances.entities)
                this.gameOver()
            }
            if (this.map == 1) {
                if (this.background.y < 2900 && this.background.y > 2898)
                    this.makeTanks(500)
                if (this.background.y < 1990 && this.background.y > 1988) {
                    this.makeTanks(700)
                    this.instances.entities.unshift(new Building(this.ctx, 2, 700, (e: Texture) => (this.instances.objects.push(e))))
                }
                if (this.background.y < 1600 && this.background.y > 1598) {
                    this.instances.entities.unshift(new Building(this.ctx, 3, 700, (e: Texture) => (this.instances.objects.push(e))))
                }
                if (this.background.y < 1300 && this.background.y > 1298) {
                    this.makeTanks(700)
                    this.instances.entities.unshift(new Building(this.ctx, 3, 600, (e: Texture) => (this.instances.objects.push(e))))
                }
                if (this.background.y < 800 && this.background.y > 798) {
                    this.instances.entities.unshift(new Building(this.ctx, 1, 800, (e: Texture) => (this.instances.objects.push(e))))
                }
            }
            if (this.map == 0) {
                if (this.background.y < 2900 && this.background.y > 2898)
                    this.makeTanks(500)
                if (this.background.y < 1990 && this.background.y > 1988) {
                    this.makeTanks(700)
                    this.instances.entities.unshift(new Building(this.ctx, 2, 400, (e: Texture) => (this.instances.objects.push(e))))
                }
                if (this.background.y < 1600 && this.background.y > 1598) {
                    this.instances.entities.unshift(new Building(this.ctx, 5, 700, (e: Texture) => (this.instances.objects.push(e))))
                    this.instances.entities.unshift(new Building(this.ctx, 5, 900, (e: Texture) => (this.instances.objects.push(e))))
                }
                if (this.background.y < 1300 && this.background.y > 1298) {
                    this.makeTanks(700)
                    this.instances.entities.unshift(new Building(this.ctx, 3, 400, (e: Texture) => (this.instances.objects.push(e))))
                }
                if (this.background.y < 800 && this.background.y > 798) {
                    this.instances.entities.unshift(new Building(this.ctx, 1, 800, (e: Texture) => (this.instances.objects.push(e))))
                }
            }

        }
        if (this.gravity && this.player!.planeState.velocity.now > 4) {
            this.player!.coordinates.y += 0.3
            console.log("czimpi")
        }
        if (this.active) requestAnimationFrame(this.frame)
    }
}