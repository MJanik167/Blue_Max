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
var Texture = /** @class */ (function (_super) {
    __extends(Texture, _super);
    function Texture(ctx, texture, positionX, positionY, radius) {
        var _this = _super.call(this, ctx, texture, positionX, positionY) || this;
        _this.radius = radius;
        return _this;
    }
    Texture.prototype.render = function (speed) {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        };
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5);
        this.ctx.beginPath();
        this.ctx.arc(this.coordinates.x, this.coordinates.y, this.radius, 0, Math.PI * 2);
        this.ctx.stroke();
    };
    return Texture;
}(ObjectRender));
export default Texture;
