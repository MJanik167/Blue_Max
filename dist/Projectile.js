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
    function Projectile(ctx, origin, altitude, positionX, positionY, angleX, angleY) {
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
        _this.isometricAngles = {
            x: angleX !== null && angleX !== void 0 ? angleX : _this.isometricAngles.x,
            y: angleY !== null && angleY !== void 0 ? angleY : _this.isometricAngles.y
        };
        texture.setAttribute("src", "/assets/projectile.png");
        _this.speedMultiplier = 10;
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
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5);
    };
    return Projectile;
}(ObjectRender));
export default Projectile;
