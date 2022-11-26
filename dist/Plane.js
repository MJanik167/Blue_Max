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
var directions = {
    left: ["ArrowLeft", "a", "A"],
    right: ["ArrowRight", "d", "D"],
    up: ["ArrowUp", "w", "W"],
    down: ["ArrowDown", "s", "S"],
};
var angles = {
    left: Math.PI * 1.05,
    right: Math.PI * 0.05,
    up: Math.PI * 1.5,
    down: Math.PI * 0.5
};
var spriteNames = {
    idle: ["plane1.png", "plane2.png"],
    left: ["left1.png", "left2.png"],
    right: ["right1.png", "right2.png"]
};
var Plane = /** @class */ (function (_super) {
    __extends(Plane, _super);
    function Plane(ctx, increaseSpeed, addProjectile) {
        var _this = _super.call(this, ctx) || this;
        _this.press = function (event) {
            for (var direction in directions) {
                if (directions[direction].includes(event.key))
                    if (_this.pressedKeys.includes(direction)) {
                        return;
                    }
                    else
                        _this.pressedKeys.push(direction);
            }
            if (event.key === " " && _this.velocity >= _this.maxvelocity && !_this.fired)
                _this.shoot();
        };
        _this.release = function (event) {
            for (var direction in directions) {
                if (directions[direction].includes(event.key))
                    if (_this.pressedKeys.includes(direction))
                        _this.pressedKeys.splice(_this.pressedKeys.indexOf(direction));
            }
            if (event.key === " ") {
                _this.fired = false;
            }
        };
        _this.shoot = function () {
            _this.addProjectile(new Projectile(_this.ctx, _this.coordinates.x + _this.texture.width * .5, _this.coordinates.y));
            _this.fired = true;
        };
        _this.render = function () {
            if (_this.pressedKeys.length != 0) {
                _this.increaseSpeed();
                if (_this.velocity <= _this.maxvelocity) {
                    _this.velocity += 0.05;
                }
                else {
                    _this.velocity = _this.maxvelocity;
                }
                _this.pressedKeys.forEach(function (e) {
                    return _this.coordinates = {
                        x: _this.coordinates.x + _this.velocity * Math.cos(angles[e]),
                        y: _this.coordinates.y + _this.velocity * Math.sin(angles[e])
                    };
                });
            }
            if (_this.velocity > 0) {
                var position = "idle";
                if (_this.pressedKeys.includes("left") && _this.pressedKeys.length === 1) {
                    position = "left";
                }
                else if (_this.pressedKeys.includes("right") && _this.pressedKeys.length === 1) {
                    position = "right";
                }
                _this.texture = Date.now() % 3 == 0 ? _this.sprites[position][0] : _this.sprites[position][1];
            }
            _this.ctx.drawImage(_this.texture, _this.coordinates.x, _this.coordinates.y);
        };
        _this.pressedKeys = [];
        _this.fired = false;
        _this.increaseSpeed = increaseSpeed;
        _this.addProjectile = addProjectile;
        _this.velocity = 0;
        _this.maxvelocity = 5;
        _this.coordinates = {
            x: 300,
            y: 400
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
        console.log(_this.sprites);
        window.addEventListener("keydown", _this.press);
        window.addEventListener("keyup", _this.release);
        return _this;
    }
    Plane.prototype.destroy = function () {
    };
    return Plane;
}(ObjectRender));
export default Plane;
