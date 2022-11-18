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
var Plane = /** @class */ (function (_super) {
    __extends(Plane, _super);
    function Plane(ctx, texture, increaseSpeed) {
        var _this = _super.call(this, ctx, texture) || this;
        _this.press = function (event) {
            for (var direction in directions) {
                if (directions[direction].includes(event.key))
                    if (_this.pressedKeys.includes(direction)) {
                        return;
                    }
                    else
                        _this.pressedKeys.push(direction);
            }
        };
        _this.release = function (event) {
            for (var direction in directions) {
                if (directions[direction].includes(event.key))
                    if (_this.pressedKeys.includes(direction))
                        _this.pressedKeys.splice(_this.pressedKeys.indexOf(direction));
            }
        };
        _this.render = function () {
            if (_this.pressedKeys.length != 0) {
                _this.increaseSpeed();
                if (_this.sensitivity <= _this.maxSensitivity)
                    _this.sensitivity += 0.05;
                _this.pressedKeys.forEach(function (e) {
                    return _this.coordinates = {
                        x: _this.coordinates.x + _this.sensitivity * Math.cos(angles[e]),
                        y: _this.coordinates.y + _this.sensitivity * Math.sin(angles[e])
                    };
                });
            }
            _this.ctx.drawImage(_this.texture, _this.coordinates.x, _this.coordinates.y);
        };
        _this.increaseSpeed = increaseSpeed;
        _this.sensitivity = 0;
        _this.maxSensitivity = 10;
        _this.coordinates = {
            x: 350,
            y: 350
        };
        _this.pressedKeys = [];
        window.addEventListener("keydown", _this.press);
        window.addEventListener("keyup", _this.release);
        return _this;
    }
    return Plane;
}(ObjectRender));
export default Plane;
