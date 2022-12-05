import Game from "./Game.js";
var options = {
    gravity: false
};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var optionsView = document.getElementById("options");
var game = new Game(canvas, ctx, options.gravity);
// game.start()
var menu = function (event) {
    if (event.key == "esc" || event.key === "F2") {
        document.getElementById("speed").innerText = "000";
        document.getElementById("altitude").innerText = "000";
        document.getElementById("score").innerText = "0000";
        optionsView.style.visibility = "hidden";
        game = new Game(canvas, ctx, options.gravity);
        window.addEventListener("keydown", pause);
    }
    else if (event.key == "arrowUP") {
    }
};
var pause = function (event) {
    if (event.key === "F2") {
        optionsView.style.visibility = "visible";
        game.gameOver();
        window.removeEventListener("keydown", pause);
        window.addEventListener("keydown", menu);
    }
    if (event.key === "F4") {
        game.start();
    }
};
window.addEventListener("keydown", pause);
