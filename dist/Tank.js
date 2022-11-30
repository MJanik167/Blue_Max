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
import Texture from "./Texture.js";
var Tank = /** @class */ (function (_super) {
    __extends(Tank, _super);
    function Tank(ctx, positionX, addObject) {
        var _this = _super.call(this, ctx, "tank", positionX, -100) || this;
        _this.leaveRubble = function () {
            for (var i = 0; i < _this.texture.width / 32; i++) {
                for (var j = 0; j < _this.texture.height / 32; j++) {
                    _this.addObject(new Texture(_this.ctx, "rubble", _this.coordinates.x - _this.texture.width * .25 + i * 32, _this.coordinates.y - _this.texture.height * .25 + j * 32, 1));
                }
            }
        };
        _this.addObject = addObject;
        _this.hitboxRadius = 8;
        return _this;
    }
    Tank.prototype.destroy = function (array, targets) {
        var _this = this;
        var index = array.findIndex(function (e) { return e === _this; });
        array.splice(index, 1);
        this.leaveRubble();
    };
    Tank.prototype.render = function (speed) {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        };
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5);
    };
    return Tank;
}(ObjectRender));
export default Tank;
