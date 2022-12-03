import Game from "./Game.js";
var options = {
    gravity: false
};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var game = new Game(canvas, ctx, options.gravity);
var pause = function (event) {
    if (event.key == "F2")
        game = new Game(canvas, ctx, options.gravity);
};
window.addEventListener("keydown", pause);
