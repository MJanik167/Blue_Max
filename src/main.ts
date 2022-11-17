import Game from "./Game"
import ObjectRender from "./ObjectRender"
import Plane from "./Plane"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")
const game = new Game(canvas, ctx)

game.createEntity(Plane, "plane", true)
game.createEntity(ObjectRender, "tree1", false, 400, 300)
game.createEntity(ObjectRender, "tree1", false)
