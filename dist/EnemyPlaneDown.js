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
import Enemy from "./Enemy.js";
var EnemyPlaneDown = /** @class */ (function (_super) {
    __extends(EnemyPlaneDown, _super);
    function EnemyPlaneDown(ctx, altitude, positionX) {
        var _this = _super.call(this, ctx, positionX, 0) || this;
        _this.altitude = altitude;
        _this.speedMultiplier = 1.6;
        var img = document.createElement("img");
        img.setAttribute("src", "/assets/EnemyPlaneDownSprites/idle1.png");
        _this.texture = img;
        var shorterSide = function () {
            if (_this.texture.width < _this.texture.height) {
                return _this.texture.width;
            }
            return _this.texture.height;
        };
        _this.hitboxRadius = shorterSide();
        console.log(_this.hitboxRadius, _this.texture.width, _this.texture.height);
        console.log(_this.texture.width, _this.texture.height, _this.hitboxRadius);
        return _this;
    }
    EnemyPlaneDown.prototype.render = function (speed) {
        this.coordinates = {
            x: this.coordinates.x + speed * this.speedMultiplier * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * this.speedMultiplier * Math.cos(this.isometricAngles.y)
        };
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y);
    };
    EnemyPlaneDown.prototype.destroy = function (array) {
        var _this = this;
        var index = array.findIndex(function (e) { return e === _this; });
        array.splice(index, 1);
    };
    return EnemyPlaneDown;
}(Enemy));
export default EnemyPlaneDown;
