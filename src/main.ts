import Game from "./Game.js"
import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane"

const options = {
  gravity: false
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
let game = new Game(canvas, ctx, options.gravity)


const pause = (event: KeyboardEvent) => {
  if (event.key == "F2")
    game = new Game(canvas, ctx, options.gravity)
}

window.addEventListener("keydown", pause)

