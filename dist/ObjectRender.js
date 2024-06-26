var angles = {
    x: Math.PI * .7,
    y: Math.PI * .2
};
var ObjectRender = /** @class */ (function () {
    function ObjectRender(ctx, texture, positionX, positionY) {
        this.isometricAngles = angles;
        this.ctx = ctx;
        this.hitboxRadius = 10;
        this.altitude = 10;
        this.texture = document.createElement("img");
        if (texture != undefined) {
            this.texture.setAttribute("src", "../assets/".concat(texture, ".png"));
        }
        this.coordinates = {
            x: positionX !== null && positionX !== void 0 ? positionX : 0,
            y: positionY !== null && positionY !== void 0 ? positionY : 0
        };
        this.isAirport = false;
    }
    // => {
    //   this.coordinates = {
    //     x: this.coordinates.x + speed * Math.cos(this.isometricAngles.x),
    //     y: this.coordinates.y + speed * Math.cos(this.isometricAngles.y)
    //   }
    //   this.ctx.drawImage(this.texture, this.coordinates.x, this.coordinates.y)
    // }
    ObjectRender.prototype.destroy = function (array, targets) {
        var _this = this;
        var index = array.findIndex(function (e) { return e === _this; });
        array.splice(index, 1);
    };
    return ObjectRender;
}());
export default ObjectRender;
