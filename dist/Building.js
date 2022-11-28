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
import ObjectRender from "./ObjectRender";
var textures = {
    1: "buildings/short.png",
    2: "buildings/tall.png",
    3: "buildings/big.png",
    4: "buildings/small.png"
};
var Building = /** @class */ (function (_super) {
    __extends(Building, _super);
    function Building(ctx, building, positionX) {
        var _this = _super.call(this, ctx, textures[building], positionX) || this;
        var shorterSide = function () {
            if (_this.texture.width < _this.texture.height) {
                return _this.texture.width;
            }
            return _this.texture.height;
        };
        _this.hitboxRadius = shorterSide();
        return _this;
    }
    Building.prototype.destroy = function (array, targets) {
    };
    Building.prototype.render = function (speed) {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        };
        this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y);
    };
    return Building;
}(ObjectRender));
export default Building;
