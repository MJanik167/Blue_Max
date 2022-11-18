import Game from "./Game.js"
import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const game = new Game(canvas, ctx)


// game.createInstance(ObjectRender, "tree1", false, 400, 300)
// for (let i = 0; i < 50; i++)
//   game.createInstance(ObjectRender, "tree1", false, Math.floor(Math.random() * 640), Math.floor(Math.random() * 480))
