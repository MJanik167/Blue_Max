import Game from "./Game.js";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var game = new Game(canvas, ctx);
// game.createInstance(ObjectRender, "tree1", false, 400, 300)
// for (let i = 0; i < 50; i++)
//   game.createInstance(ObjectRender, "tree1", false, Math.floor(Math.random() * 640), Math.floor(Math.random() * 480))
