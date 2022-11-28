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
var Projectile = /** @class */ (function (_super) {
    __extends(Projectile, _super);
    function Projectile(ctx, origin, altitude, positionX, positionY) {
        var _this = _super.call(this, ctx, undefined, positionX, positionY) || this;
        _this.checkForCollision = function (entities) {
            var object = undefined;
            entities.forEach(function (e) {
                if (Math.sqrt(Math.pow(_this.coordinates.x - e.coordinates.x, 2) + Math.pow(_this.coordinates.y - e.coordinates.y, 2)) < _this.hitboxRadius + e.hitboxRadius
                    && e !== _this.origin
                    && (_this.altitude <= e.altitude + 15 && _this.altitude >= e.altitude - 15))
                    object = e;
            });
            return object;
        };
        var texture = document.createElement("img");
        texture.setAttribute("src", "/assets/projectile.png");
        _this.speedMultiplier = 20;
        _this.altitude = altitude;
        _this.origin = origin;
        _this.texture = texture;
        _this.hitboxRadius = 10;
        return _this;
    }
    Projectile.prototype.render = function (speed) {
        this.coordinates = {
            x: this.coordinates.x + speed * this.speedMultiplier * -Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * this.speedMultiplier * -Math.cos(this.isometricAngles.y)
        };
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y);
    };
    Projectile.prototype.destroy = function (myArray) {
        var _this = this;
        var index = myArray.findIndex(function (e) { return e === _this; });
        myArray.splice(index, 1);
    };
    return Projectile;
}(ObjectRender));
export default Projectile;
