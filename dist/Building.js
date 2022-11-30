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
    4: "buildings/smallGreen",
    5: "buildings/9.11"
};
var Building = /** @class */ (function (_super) {
    __extends(Building, _super);
    function Building(ctx, building, positionX, addObject) {
        var _this = _super.call(this, ctx, textures[building], positionX, 0) || this;
        _this.leaveRubble = function () {
            for (var i = 0; i < _this.texture.width / 32; i++) {
                for (var j = 0; j < _this.texture.height / 32; j++) {
                    _this.addObject(new Texture(_this.ctx, "rubble", _this.coordinates.x - _this.texture.width * .25 + i * 32, _this.coordinates.y - _this.texture.height * .25 + j * 32, 1));
                    document.getElementById("score").innerText = String(parseInt(document.getElementById("score").innerText) + 10);
                }
            }
        };
        _this.addObject = addObject;
        _this.altitude = 0;
        _this.hitboxRadius = 64;
        _this.coordinates = {
            x: _this.coordinates.x,
            y: _this.coordinates.y - _this.texture.height
        };
        return _this;
    }
    Building.prototype.destroy = function (array, targets) {
        var _this = this;
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
    };
    return Building;
}(ObjectRender));
export default Building;
