var angles = {
    x: Math.PI * .7,
    y: Math.PI * .2
};
var ObjectRender = /** @class */ (function () {
    function ObjectRender(ctx, texture, positionX, positionY) {
        this.isometricAngles = angles;
        this.ctx = ctx;
        this.hitboxRadius = 10;
        this.altitude = 0;
        this.texture = document.createElement("img");
        if (texture != undefined) {
            this.texture.setAttribute("src", "../assets/".concat(texture, ".png"));
        }
        this.coordinates = {
            x: positionX !== null && positionX !== void 0 ? positionX : 0,
            y: positionY !== null && positionY !== void 0 ? positionY : 0
        };
    }
    return ObjectRender;
}());
export default ObjectRender;
