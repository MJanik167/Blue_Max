import Game from "./Game.js"
import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane"

const options = {
  gravity: false
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const optionsView = document.getElementById("options")!
let game = new Game(canvas, ctx, options.gravity)
// game.start()


const menu = (event: KeyboardEvent) => {
  if (event.key == "esc" || event.key === "F2") {
    document.getElementById("speed")!.innerText = "000"
    document.getElementById("altitude")!.innerText = "000"
    document.getElementById("score")!.innerText = "0000"
    optionsView.style.visibility = "hidden"
    game = new Game(canvas, ctx, options.gravity)
    window.addEventListener("keydown", pause)
  } else if (event.key == "arrowUP") {
  }
}

const pause = (event: KeyboardEvent) => {
  if (event.key === "F2") {
    console.log('czumpi')
    optionsView.style.visibility = "visible"
    game.gameOver()
    window.removeEventListener("keydown", pause)
    window.addEventListener("keydown", menu)
  }
  if (event.key === "F4") {
    game.start()
  }
}


window.addEventListener("keydown", pause)

