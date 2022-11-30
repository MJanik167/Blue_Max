var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import ObjectRender from "./ObjectRender.js";
import Projectile from "./Projectile.js";
import Bomb from "./Bomb.js";
import Shadow from "./Shadow.js";
import Texture from "./Texture.js";
var directions = {
    left: ["ArrowLeft", "a", "A"],
    right: ["ArrowRight", "d", "D"],
    up: ["ArrowUp", "w", "W"],
    down: ["ArrowDown", "s", "S"]
};
var angles = {
    left: Math.PI,
    right: 0,
    up: Math.PI * 1.5,
    down: Math.PI * 0.5
};
var spriteNames = {
    idle: ["plane1b.png", "plane2b.png"],
    left: ["left1b.png", "left2b.png"],
    right: ["right1b.png", "right2b.png"]
};
var Plane = /** @class */ (function (_super) {
    __extends(Plane, _super);
    function Plane(ctx, increaseSpeed, addProjectile, createOject, gameObjects) {
        var _this = _super.call(this, ctx) || this;
        _this.press = function (event) {
            if (_this.planeState.velocity.now < _this.planeState.velocity.max - 0.1) {
                if (directions["up"].includes(event.key)) {
                    _this.planeState.velocity.now += 0.1;
                    _this.increaseSpeed(_this.planeState.velocity.now);
                }
                return;
            }
            _this.planeState.velocity.now = _this.planeState.velocity.max;
            for (var direction in directions) {
                if (directions[direction].includes(event.key))
                    if (_this.pressedKeys.includes(direction)) {
                        return;
                    }
                    else
                        _this.pressedKeys.push(direction);
            }
            if (event.key === " " && _this.planeState.velocity.now >= _this.planeState.velocity.max && !_this.planeState.fired) {
                _this.addProjectile(new Projectile(_this.ctx, _this, _this.altitude, _this.coordinates.x + _this.texture.width * .5, _this.coordinates.y));
                _this.planeState.fired = true;
            }
            else if ((event.key === "x" || event.key === "X") && _this.planeState.velocity.now >= _this.planeState.velocity.max && _this.planeState.bombs > 0) {
                _this.addProjectile(new Bomb(_this.ctx, _this, _this.altitude, _this.createObject, _this.coordinates.x, _this.coordinates.y + _this.texture.height * .5));
                _this.planeState.lastBomb = Date.now();
                _this.planeState.bombs--;
                _this.displayBombs();
            }
        };
        _this.release = function (event) {
            for (var direction in directions) {
                if (directions[direction].includes(event.key))
                    if (_this.pressedKeys.includes(direction))
                        _this.pressedKeys.splice(_this.pressedKeys.indexOf(direction));
            }
            if (event.key === " ") {
                _this.planeState.fired = false;
            }
        };
        _this.displayBombs = function () {
            document.getElementById("bombs").innerText =
                _this.planeState.bombs >= 10 ?
                    String(_this.planeState.bombs)
                    : "0" + String(_this.planeState.bombs);
        };
        _this.displayFuel = function () {
            var text = String(Math.round(_this.planeState.fuel));
            if (_this.planeState.fuel < 100) {
                text = "0" + String(Math.round(_this.planeState.fuel));
            }
            else if (_this.planeState.fuel < 10) {
                text = "00" + String(Math.round(_this.planeState.fuel));
            }
            document.getElementById("fuel").innerText = text;
        };
        _this.render = function () {
            if (_this.planeState.landing) {
                _this.planeState.velocity.now = 0;
                _this.altitude > 0 ? _this.altitude -= 0.5 : _this.altitude = 0;
                document.getElementById("altitude").innerText = String(_this.altitude > 10 ? Math.round(_this.altitude) : 0 + String(Math.round(_this.altitude)));
                _this.increaseSpeed(-0.5);
                _this.coordinates = {
                    x: _this.coordinates.x <= 260 ? _this.coordinates.x + 1.5 * Math.cos(angles['down']) : _this.coordinates.x,
                    y: _this.coordinates.y <= 420 ? _this.coordinates.y + 1.5 * Math.sin(angles['down']) : _this.coordinates.y
                };
                if (_this.planeState.velocity.now === 0) {
                    setTimeout(function () {
                        _this.planeState = {
                            velocity: {
                                now: 0,
                                max: 5
                            },
                            fired: false,
                            bombs: 30,
                            lastBomb: 0,
                            fuel: 300,
                            overAirport: false,
                            landing: false
                        };
                        _this.altitude = 0;
                        _this.planeState.landing = false;
                        _this.displayBombs();
                        _this.displayFuel();
                    }, 2000);
                }
            }
            if (_this.pressedKeys.length != 0) {
                _this.pressedKeys.forEach(function (e) {
                    if (e === "down" && _this.altitude <= 25) {
                        if (!_this.planeState.overAirport) {
                            return;
                        }
                        else {
                            _this.planeState.landing = true;
                        }
                    }
                    if (_this.coordinates.x < 0) {
                        _this.coordinates.x = 0;
                    }
                    else if (_this.coordinates.x > 640 - _this.texture.width) {
                        _this.coordinates.x = 640 - _this.texture.width;
                    }
                    if (_this.coordinates.y > 480 - _this.texture.height) {
                        _this.coordinates.y = 480 - _this.texture.height;
                    }
                    else if (_this.coordinates.y < 0) {
                        _this.coordinates.y = 0;
                    }
                    if (e === "up" && _this.planeState.velocity.now === _this.planeState.velocity.max && _this.coordinates.y != 0) {
                        document.getElementById("altitude").innerText = String(Math.round(_this.altitude += 1.5));
                    }
                    else if (e === "down" && _this.planeState.velocity.now === _this.planeState.velocity.max && _this.altitude > 0) {
                        document.getElementById("altitude").innerText = String(Math.round(_this.altitude -= 1.5));
                    }
                    _this.coordinates = {
                        x: _this.coordinates.x + _this.planeState.velocity.now * Math.cos(angles[e]),
                        y: _this.coordinates.y + _this.planeState.velocity.now * Math.sin(angles[e])
                    };
                });
            }
            if (_this.planeState.velocity.now > 0) {
                _this.planeState.fuel -= .03;
                _this.displayFuel();
                var position = "idle";
                if (_this.pressedKeys.includes("left") && _this.pressedKeys.length === 1) {
                    position = "left";
                }
                else if (_this.pressedKeys.includes("right") && _this.pressedKeys.length === 1) {
                    position = "right";
                }
                _this.texture = Date.now() % 3 == 0 ? _this.sprites[position][0] : _this.sprites[position][1];
            }
            _this.shadow.render(0, undefined, undefined, _this.gameObjects);
            _this.ctx.drawImage(_this.texture, _this.coordinates.x - _this.texture.width * .5, _this.coordinates.y - _this.texture.height * .5);
        };
        _this.pressedKeys = [];
        _this.gameObjects = gameObjects;
        _this.increaseSpeed = increaseSpeed;
        _this.addProjectile = addProjectile;
        _this.createObject = createOject;
        _this.planeState = {
            velocity: {
                now: 0,
                max: 5
            },
            fired: false,
            bombs: 30,
            lastBomb: 0,
            fuel: 300,
            overAirport: false,
            landing: false
        };
        _this.coordinates = {
            x: 260,
            y: 420
        };
        _this.sprites = {
            idle: [],
            left: [],
            right: []
        };
        for (var state in spriteNames) {
            _this.sprites[state] = spriteNames[state].map(function (el) {
                var img = document.createElement("img");
                img.setAttribute("src", "/assets/planeSprites/".concat(el));
                return img;
            });
        }
        _this.texture = _this.sprites.idle[0];
        _this.shadow = new Shadow(_this.ctx, _this, true);
        _this.displayBombs();
        _this.displayFuel();
        window.addEventListener("keydown", _this.press);
        window.addEventListener("keyup", _this.release);
        return _this;
    }
    Plane.prototype.destroy = function (array) {
        var _this = this;
        var index = array.findIndex(function (e) { return e === _this; });
        array.splice(index, 1);
        this.createObject(new Texture(this.ctx, "dziura", this.coordinates.x, this.coordinates.y, 0));
    };
    return Plane;
}(ObjectRender));
export default Plane;
