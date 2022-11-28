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
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(ctx, positionX, positionY) {
        var _this = _super.call(this, ctx, undefined, positionX, positionY) || this;
        _this.hitboxRadius = 30;
        return _this;
    }
    Enemy.prototype.render = function (speed) {
        this.ctx.beginPath();
        this.ctx.font = "12px Arial orange";
        this.ctx.fillText("bo\u015Bniackie", this.coordinates.x - this.hitboxRadius * .5 + 5, this.coordinates.y + this.hitboxRadius * .5);
        this.ctx.fillText("dziecko", this.coordinates.x - this.hitboxRadius * .5 + 5, this.coordinates.y + this.hitboxRadius * .5 + 15);
        this.ctx.arc(this.coordinates.x + this.hitboxRadius * .5, this.coordinates.y + this.hitboxRadius * .5, this.hitboxRadius, 0, Math.PI * 2);
        this.ctx.stroke();
    };
    Enemy.prototype.destroy = function (array) {
        var _this = this;
        var index = array.findIndex(function (e) { return e === _this; });
        array.splice(index, 1);
    };
    return Enemy;
}(ObjectRender));
export default Enemy;
