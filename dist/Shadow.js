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
var Shadow = /** @class */ (function (_super) {
    __extends(Shadow, _super);
    function Shadow(ctx, parent, main) {
        var _this = _super.call(this, ctx, "shadow1", parent.coordinates.x, parent.coordinates.y) || this;
        _this.parent = parent;
        _this.main = main;
        _this.hitboxRadius = 300;
        if (main)
            _this.coordinates.y += 5;
        else
            _this.coordinates.y += 3 * _this.parent.altitude;
        return _this;
    }
    Shadow.prototype.render = function (speed, angleX, angleY, objects) {
        var _this = this;
        if (this.main) {
            console.log(objects);
            objects.forEach(function (e) {
                if (e.isAirport)
                    if (Math.sqrt(Math.pow((_this.coordinates.x - e.coordinates.x), 2) + Math.pow((_this.coordinates.y - e.coordinates.y), 2)) < _this.hitboxRadius)
                        _this.parent.planeState.overAirport = true;
                    else {
                        console.log("nie jest");
                        _this.parent.planeState.overAirport = false;
                    }
            });
        }
        this.coordinates = {
            x: speed === 0 ? this.parent.coordinates.x : this.coordinates.x + speed * angleX,
            y: speed === 0 ? this.coordinates.y : this.coordinates.y + speed * angleY
        };
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5);
    };
    Shadow.prototype.destroy = function (array, targets) {
        var _this = this;
        var index = array.findIndex(function (e) { return e === _this; });
        array.splice(index, 1);
    };
    return Shadow;
}(ObjectRender));
export default Shadow;
