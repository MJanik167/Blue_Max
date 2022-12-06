import Game from "./Game.js";
var options = {
    gravity: false
};
var selected = "pryt";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var optionsView = document.getElementById("options");
var game = new Game(canvas, ctx, options.gravity);
// game.start()
var menu = function (event) {
    var pointer = document.getElementById("pointer");
    console.log(event.key);
    if (event.key == "esc" || event.key === "F2") {
        document.getElementById("speed").innerText = "000";
        document.getElementById("altitude").innerText = "000";
        document.getElementById("score").innerText = "0000";
        optionsView.style.visibility = "hidden";
        game.active = false;
        game = new Game(canvas, ctx, options.gravity);
        window.addEventListener("keydown", pause);
    }
    else if (event.key == "ArrowUp") {
        if (parseInt(getComputedStyle(pointer).marginTop.slice(0, -2)) > -260) {
            pointer.style.marginTop = (parseInt(getComputedStyle(pointer).marginTop.slice(0, -2)) - 200) + "px";
            selected = "pryt";
        }
    }
    else if (event.key === "ArrowDown") {
        if (parseInt(getComputedStyle(pointer).marginTop.slice(0, -2)) < 140) {
            pointer.style.marginTop = (parseInt(getComputedStyle(pointer).marginTop.slice(0, -2)) + 200) + "px";
            if (parseInt(getComputedStyle(pointer).marginTop.slice(0, -2)) === 140)
                selected = "gravity";
            else
                selected = "pryt";
        }
    }
    else if (event.key === "Enter") {
        if (selected === "gravity") {
            options.gravity = !options.gravity;
            document.getElementById("gravity").innerText = "gravity: " + (options.gravity ? "ON" : "OFF");
            console.log(options.gravity);
        }
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
