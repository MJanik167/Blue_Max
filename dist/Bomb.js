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
var Bomb = /** @class */ (function (_super) {
    __extends(Bomb, _super);
    function Bomb(ctx, parent, altitude, positionX, positionY) {
        var _this = _super.call(this, ctx, parent, altitude, positionX, positionY) || this;
        _this.explode = function () {
        };
        _this.fallingSpeed = 2.5;
        return _this;
    }
    Bomb.prototype.render = function (speed) {
        this.coordinates = {
            x: this.coordinates.x,
            y: this.coordinates.y + this.fallingSpeed
        };
        this.altitude -= 1;
        if (this.altitude < 0)
            this.explode();
        else
            this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y);
    };
    return Bomb;
}(Projectile));
export default Bomb;
