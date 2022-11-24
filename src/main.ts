import Game from "./Game.js"
import ObjectRender from "./ObjectRender.js"
import Plane from "./Plane"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const game = new Game(canvas, ctx)
