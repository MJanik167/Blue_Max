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
var textures = {
    1: "buildings/bigGreen",
    2: "buildings/bigPink",
    3: "buildings/smallGray",
    4: "buildings/smallGreen"
};
var Building = /** @class */ (function (_super) {
    __extends(Building, _super);
    function Building(ctx, building, positionX, addObject) {
        var _this = _super.call(this, ctx, textures[building], positionX, 0) || this;
        _this.leaveRubble = function () {
            for (var i = 0; i < _this.texture.width / 32; i++) {
                for (var j = 0; j < _this.texture.height / 32; j++) {
                    console.log('dziura');
                    _this.addObject(new Texture(_this.ctx, "dziura", _this.coordinates.x - _this.texture.width * .25 + i * 32, _this.coordinates.y - _this.texture.height * .25 + j * 32, 1));
                }
            }
        };
        _this.addObject = addObject;
        var shorterSide = function () {
            if (_this.texture.width < _this.texture.height) {
                return _this.texture.width / 2;
            }
            return _this.texture.height / 2;
        };
        _this.hitboxRadius = shorterSide();
        _this.coordinates = {
            x: _this.coordinates.x,
            y: _this.coordinates.y - _this.texture.height
        };
        return _this;
    }
    Building.prototype.destroy = function (array, targets) {
        var _this = this;
        console.log("trafiony");
        var index = array.findIndex(function (e) { return e === _this; });
        array.splice(index, 1);
        if (this.coordinates.y < 480)
            this.leaveRubble();
    };
    Building.prototype.render = function (speed) {
        this.coordinates = {
            x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
        };
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5);
        this.ctx.beginPath();
        this.ctx.arc(this.coordinates.x, this.coordinates.y, this.hitboxRadius, 0, Math.PI * 2);
        this.ctx.arc(this.coordinates.x, this.coordinates.y, 2, 0, Math.PI * 2);
        this.ctx.stroke();
    };
    return Building;
}(ObjectRender));
export default Building;
