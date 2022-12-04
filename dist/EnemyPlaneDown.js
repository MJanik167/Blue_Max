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
import Enemy from "./Enemy.js";
import Projectile from "./Projectile.js";
import Shadow from "./Shadow.js";
var spriteNames = {
    idle: ["idle1.png", "idle2.png"],
    left: ["left1.png", "left2.png"],
    right: ["right1.png", "right2.png"]
};
var EnemyPlaneDown = /** @class */ (function (_super) {
    __extends(EnemyPlaneDown, _super);
    function EnemyPlaneDown(ctx, altitude, createProjectile, positionX) {
        var _this = _super.call(this, ctx, positionX, -200) || this;
        _this.altitude = altitude;
        _this.shoot = createProjectile;
        _this.sprites = {
            idle: [],
            left: [],
            right: []
        };
        for (var state in spriteNames) {
            _this.sprites[state] = spriteNames[state].map(function (el) {
                var img = document.createElement("img");
                img.setAttribute("src", "/assets/EnemyPlaneDownSprites/".concat(el));
                return img;
            });
        }
        _this.shadow = new Shadow(ctx, _this);
        _this.shadow.texture.setAttribute('src', '/assets/shadow2.png');
        _this.texture = _this.sprites["idle"][0];
        _this.hitboxRadius = 16;
        _this.speedMultiplier = 1.6;
        return _this;
    }
    EnemyPlaneDown.prototype.render = function (speed) {
        if (Date.now() % 35 === 0) {
            console.log("simea");
            this.shoot(new Projectile(this.ctx, this, this.altitude, this.coordinates.x, this.coordinates.y, this.isometricAngles.x + Math.PI, this.isometricAngles.y + Math.PI));
        }
        this.coordinates = {
            x: this.coordinates.x + speed * this.speedMultiplier * Math.cos(this.isometricAngles.x),
            y: this.coordinates.y + speed * this.speedMultiplier * Math.cos(this.isometricAngles.y)
        };
        this.texture = Date.now() % 3 == 0 ? this.sprites["idle"][0] : this.sprites["idle"][1];
        this.shadow.render(speed * this.speedMultiplier, Math.cos(this.isometricAngles.x), Math.cos(this.isometricAngles.y));
        this.ctx.drawImage(this.texture, this.coordinates.x - this.texture.width * .5, this.coordinates.y - this.texture.height * .5);
    };
    return EnemyPlaneDown;
}(Enemy));
export default EnemyPlaneDown;
