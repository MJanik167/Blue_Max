import ObjectRender from "./ObjectRender"
import Plane from "./Plane"


const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")

const objects = new Array(200).fill(null).map(e => new ObjectRender(ctx, "tree1", Math.round(Math.random() * canvas.width), Math.round(Math.random() * canvas.height)))
let tree = new ObjectRender(ctx, "tree1", Math.round(Math.random() * canvas.width), Math.round(Math.random() * canvas.height))
let plane = new Plane(ctx, 0, canvas.height)
const planes = new Array(1).fill(null).map((e) =>
  new Plane(ctx, Math.round(Math.random() * canvas.width), Math.round(Math.random() * canvas.height))
)
console.log(objects)

const frame = async () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  objects.forEach(e => e.render())
  planes.forEach(async e => e.render())
  requestAnimationFrame(frame)
}

requestAnimationFrame(frame)

