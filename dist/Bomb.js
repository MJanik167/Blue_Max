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
import Projectile from "./Projectile.js";
import Texture from "./Texture.js";
var Bomb = /** @class */ (function (_super) {
    __extends(Bomb, _super);
    function Bomb(ctx, parent, altitude, createObject, positionX, positionY) {
        var _this = _super.call(this, ctx, parent, altitude, positionX, positionY) || this;
        _this.checkForCollision = function (entities) {
            var object = undefined;
            entities.forEach(function (e) {
                if (Math.sqrt(Math.pow((_this.coordinates.x - e.coordinates.x), 2) + Math.pow((_this.coordinates.y - e.coordinates.y), 2)) < _this.hitboxRadius + e.hitboxRadius
                    && e !== _this.origin
                    && e.altitude <= _this.altitude + 10 && e.altitude >= _this.altitude - 15) {
                    object = e;
                }
            });
            if (_this.altitude <= 0) {
                object = _this;
            }
            return object;
        };
        _this.explode = function (entities) {
            var inBlast = [];
            entities.forEach(function (e) {
                if (Math.sqrt(Math.pow((_this.coordinates.x - e.coordinates.x), 2) + Math.pow((_this.coordinates.y - e.coordinates.y), 2)) < (_this.hitboxRadius + e.hitboxRadius) * _this.blastingRadiusMultiplier
                    && e.altitude < 25)
                    inBlast.push(e);
            });
            inBlast.forEach(function (element) {
                if (element === _this.origin)
                    element.planeState.destroyed = true;
                else
                    element.destroy(entities);
                document.getElementById("score").innerText = String(parseInt(document.getElementById("score").innerText) + 10);
            });
        };
        _this.render = function (speed) {
            _this.coordinates = {
                x: _this.coordinates.x,
                y: _this.coordinates.y + _this.fallingSpeed
            };
            _this.altitude -= 1;
            _this.ctx.drawImage(_this.texture, _this.coordinates.x - _this.texture.width * .5, _this.coordinates.y - _this.texture.height * .5);
        };
        _this.texture.setAttribute('src', '/assets/bomb.png');
        _this.createObject = createObject;
        _this.blastingRadiusMultiplier = 1.8;
        _this.fallingSpeed = 2.5;
        return _this;
    }
    Bomb.prototype.destroy = function (array, targets) {
        var _this = this;
        var index = array.findIndex(function (e) { return e === _this; });
        array.splice(index, 1);
        this.explode(targets);
        this.createObject(new Texture(this.ctx, "dziura", this.coordinates.x, this.coordinates.y, (this.hitboxRadius + 30) * this.blastingRadiusMultiplier));
    };
    return Bomb;
}(Projectile));
export default Bomb;
