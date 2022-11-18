var angles = {
    x: Math.PI * .7,
    y: Math.PI * .2
};
var ObjectRender = /** @class */ (function () {
    function ObjectRender(ctx, texture, positionX, positionY) {
        var _this = this;
        this.render = function (speed) {
            _this.coordinates = {
                x: _this.coordinates.x + speed * Math.cos(_this.isometricAngles.x),
                y: _this.coordinates.y + speed * Math.cos(_this.isometricAngles.y)
            };
            _this.ctx.drawImage(_this.texture, _this.coordinates.x, _this.coordinates.y);
        };
        this.isometricAngles = angles;
        this.ctx = ctx;
        this.texture = document.createElement("img");
        this.texture.setAttribute("src", "../assets/".concat(texture, ".png"));
        this.coordinates = {
            x: positionX !== null && positionX !== void 0 ? positionX : 0,
            y: positionY !== null && positionY !== void 0 ? positionY : 0
        };
    }
    return ObjectRender;
}());
export default ObjectRender;
