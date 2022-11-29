var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Airport from "./Airport.js";
import Enemy from "./Enemy.js";
import EnemyPlaneDown from "./EnemyPlaneDown.js";
import EnemyPlaneUp from "./EnemyPlaneUp.js";
import Plane from "./Plane.js";
var angles = {
    x: Math.PI * .7,
    y: Math.PI * .2
};
var Game = /** @class */ (function () {
    function Game(canvas, ctx) {
        var _this = this;
        this.increaseSpeed = function (speed) {
            document.getElementById("speed").innerText = String(Math.round((speed * 100) / 2.5));
            if (_this.speed.now > _this.speed.max) {
                return;
            }
            _this.speed.now += 0.05;
        };
        // createInstance = (object: GameObject, image: string, isEntity: boolean, positionX?: number, positionY?: number) => {
        //     if (isEntity)
        //         this.instances.entities.push(new object(this.ctx, image, positionX, positionY))
        //     else
        //         this.instances.objects.push(new object(this.ctx, image, positionX, positionY))
        // }
        this.frame = function () { return __awaiter(_this, void 0, void 0, function () {
            var _loop_1, this_1, instance;
            var _this = this;
            return __generator(this, function (_a) {
                // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                // this.ctx.drawImage(this.background.src, this.background.x += Math.cos(angles.x) * this.speed.now, this.background.y += Math.cos(angles.y) * this.speed.now, 1980 * 3, 1080 * 3)
                this.ctx.drawImage(this.background.src, this.background.x -= Math.cos(angles.x) * this.speed.now, this.background.y -= Math.cos(angles.y) * this.speed.now, //pozycja wyciętego fragment na oryginalnym obrazku 
                this.canvas.width, this.canvas.height, //wielkość wyciętego fragmentu
                0, 0, // pozycja obrazka na canvasie
                this.canvas.width, this.canvas.height);
                console.log(this.speed.now);
                if (Date.now() % 154 === 0 && this.speed.now >= this.speed.max) {
                    this.instances.entities.push(Math.floor(Math.random() * 2) === 1 ? new EnemyPlaneDown(this.ctx, 50, function (e) { _this.instances.projectiles.push(e); }, Math.floor(Math.random() * this.canvas.width)) : new EnemyPlaneUp(this.ctx, 50, function (e) { _this.instances.projectiles.push(e); }, Math.floor(Math.random() * this.canvas.width)));
                }
                // console.log(this.background.y, this.background.src.height)
                if (this.background.y < 0) {
                    this.background.y = this.background.src.height - this.canvas.height;
                    this.background.x = 0;
                } // rozmiar obrazka na canvasie
                _loop_1 = function (instance) {
                    this_1.instances[instance].forEach(function (e) {
                        if (instance == "projectiles") {
                            var target = e.checkForCollision(_this.instances.entities);
                            for (var instance_1 in _this.instances) {
                                if (target)
                                    if (_this.instances[instance_1].includes(target)) {
                                        target.destroy(_this.instances[instance_1], _this.instances.entities);
                                        if (e !== target)
                                            e.destroy(_this.instances.projectiles, _this.instances.entities);
                                    }
                            }
                        }
                        if ((e.coordinates.x > _this.canvas.width || e.coordinates.x < 0 - e.texture.width)
                            || (e.coordinates.y < 0 - e.texture.height || e.coordinates.y > Math.pow(_this.canvas.height, 2)))
                            e.destroy(_this.instances[instance], _this.instances.entities);
                        if (_this.instances[instance].includes(e))
                            e.render(_this.speed.now);
                    });
                };
                this_1 = this;
                // if (this.speed.now > 0 && Date.now() % 2 == 0) this.createInstance(ObjectRender, "tree1", false, 100 + Math.floor(Math.random() * 900), -100)
                for (instance in this.instances) {
                    _loop_1(instance);
                }
                // this.instances.objects.forEach(e => {
                //     e.render(this.speed.now)
                // })
                // this.instances.entities.forEach(e => {
                //     e.render(this.speed.now)
                //     if ((e.coordinates.x > this.canvas.width || e.coordinates.x < 0 - e.texture.width)
                //         || (e.coordinates.y < 0 - e.texture.height || e.coordinates.y > this.canvas.height))
                //         e.destroy(this.instances.entities)
                // })
                //console.log(this.instances.entities)
                requestAnimationFrame(this.frame);
                return [2 /*return*/];
            });
        }); };
        this.speed = {
            now: 0,
            max: 2
        };
        this.playerInfo = {
            score: 0,
            fuel: 300,
            bombs: 0,
            altitude: 0
        };
        var img = document.createElement("img");
        img.setAttribute("src", "../assets/testb.png");
        this.background = {
            src: img,
            x: 0,
            y: img.height - canvas.height
        };
        this.canvas = canvas;
        this.ctx = ctx;
        this.instances = {
            objects: new Array(1).fill(new Airport(this.ctx)),
            entities: new Array(1).fill(new Plane(this.ctx, this.increaseSpeed, function (e) { _this.instances.projectiles.push(e); }, function (e) { _this.instances.objects.push(e); })),
            projectiles: new Array(0)
        };
        for (var i = 0; i < 15; i++) {
            this.instances.entities.push(new Enemy(ctx, 100 + 60 * i, 300));
            this.instances.entities.push(new Enemy(ctx, 100 + 60 * i, 350));
        }
        this.frame();
        //this.instances.entities.push(new EnemyPlaneUp(this.ctx, 50, (e: Projectile): void => { this.instances.projectiles.push(e) }, Math.floor(Math.random() * this.canvas.width)))
    }
    return Game;
}());
export default Game;
