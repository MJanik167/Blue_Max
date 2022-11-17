import Game from "./Game"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")
const game = new Game(canvas, ctx)

