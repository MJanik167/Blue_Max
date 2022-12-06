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
import Building from "./Building.js";
import EnemyPlaneDown from "./EnemyPlaneDown.js";
import EnemyPlaneUp from "./EnemyPlaneUp.js";
import Plane from "./Plane.js";
import Tank from "./Tank.js";
var angles = {
    x: Math.PI * .7,
    y: Math.PI * .2
};
var Game = /** @class */ (function () {
    function Game(canvas, ctx, gravity) {
        var _this = this;
        this.increaseSpeed = function (speed) {
            if (speed < 5) {
                document.getElementById("speed").innerHTML = String(Math.round((speed >= 0 ? speed * 100 : 0) / 2.5));
                document.getElementById("speed").style.color = Math.round((speed >= 0 ? speed * 100 : 0) / 2.5) < 100 ? "crimson" : "white";
            }
            if (speed < 0) {
                _this.speed.now > 0.2 ? _this.speed.now -= 0.2 : 0;
            }
            if (_this.speed.now > _this.speed.max) {
                return;
            }
            if (speed > 0)
                _this.speed.now += 0.05;
        };
        this.makeTanks = function (x) {
            var _loop_1 = function (i) {
                for (var j = 0; j < 3; j++) {
                    setTimeout(function () {
                        Math.floor(Math.random() * 2) == 0 ? _this.instances.entities.unshift(new Tank(_this.ctx, x + 36 * i, function (e) { return (_this.instances.objects.push(e)); })) : 0;
                    }, 200 * j);
                }
            };
            for (var i = 0; i < 8; i++) {
                _loop_1(i);
            }
        };
        this.gameOver = function () {
            if (_this.player != undefined)
                _this.player.destroy(_this.instances.entities);
            _this.speed.now = 0;
            _this.instances.entities = [];
            _this.instances.projectiles = [];
            _this.player = undefined;
            // setTimeout(() => {
            //     this.active = false
            // }, 20);
        };
        this.start = function () {
            _this.player.planeState.starting = true;
        };
        this.frame = function () { return __awaiter(_this, void 0, void 0, function () {
            var _loop_2, this_1, instance;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                this.ctx.drawImage(this.background.src, this.background.x -= Math.cos(angles.x) * this.speed.now, this.background.y -= Math.cos(angles.y) * this.speed.now, //pozycja wyciętego fragment na oryginalnym obrazku 
                this.canvas.width, this.canvas.height, //wielkość wyciętego fragmentu
                0, 0, // pozycja obrazka na canvasie
                this.canvas.width, this.canvas.height);
                if (Date.now() % 154 === 0 && this.speed.now >= this.speed.max && !this.instances.objects.find(function (e) { return e.isAirport === true; })) {
                    this.instances.entities.push(Math.floor(Math.random() * 2) === 1 ? new EnemyPlaneDown(this.ctx, Math.floor((Math.random() * 40) + 30), function (e) { _this.instances.projectiles.push(e); }, Math.floor(Math.random() * this.canvas.width)) : new EnemyPlaneUp(this.ctx, Math.floor((Math.random() * 70) + 40), function (e) { _this.instances.projectiles.push(e); }, Math.floor(Math.random() * this.canvas.width)));
                }
                if ((_a = this.player) === null || _a === void 0 ? void 0 : _a.planeState.destroyed)
                    this.gameOver();
                if (this.background.y < 0) {
                    this.map = Math.floor(Math.random() * 2);
                    this.background.y = this.background.src.height - this.canvas.height;
                    this.background.x = this.map === 0 ? this.canvas.width : 0;
                }
                if (this.background.y < 510 && !this.instances.objects.find(function (e) { return e.isAirport === true; })) { //&& parseInt(document.getElementById('fuel')!.innerText) < 200) {
                    this.instances.objects.push(new Airport(this.ctx, 800, -275));
                }
                _loop_2 = function (instance) {
                    this_1.instances[instance].forEach(function (e) {
                        if (instance == "projectiles") {
                            var target = e.checkForCollision(_this.instances.entities);
                            for (var instance_1 in _this.instances) {
                                if (target)
                                    if (_this.instances[instance_1].includes(target)) {
                                        target.destroy(_this.instances[instance_1], _this.instances.entities);
                                        document.getElementById("score").innerText = String(parseInt(document.getElementById("score").innerText) + 10);
                                        if (target === _this.player) {
                                            _this.gameOver();
                                        }
                                        if (e !== target)
                                            e.destroy(_this.instances.projectiles, _this.instances.entities);
                                    }
                            }
                        }
                        if ((e.coordinates.x > Math.pow(_this.canvas.width, 2) || e.coordinates.x < 0 - e.texture.width - 200)
                            || (e.coordinates.y < 0 - e.texture.height - 200 || e.coordinates.y > _this.canvas.height * 2))
                            e.destroy(_this.instances[instance], _this.instances.entities);
                        if (_this.instances[instance].includes(e))
                            e.render(_this.speed.now);
                    });
                };
                this_1 = this;
                for (instance in this.instances) {
                    _loop_2(instance);
                }
                if (this.speed.now >= this.speed.max) {
                    if (this.player.planeState.destroyed) {
                        this.player.destroy(this.instances.entities);
                        this.gameOver();
                    }
                    if (this.map == 1) {
                        if (this.background.y < 2900 && this.background.y > 2898)
                            this.makeTanks(500);
                        if (this.background.y < 1990 && this.background.y > 1988) {
                            this.makeTanks(700);
                            this.instances.entities.unshift(new Building(this.ctx, 2, 700, function (e) { return (_this.instances.objects.push(e)); }));
                        }
                        if (this.background.y < 1600 && this.background.y > 1598) {
                            this.instances.entities.unshift(new Building(this.ctx, 3, 700, function (e) { return (_this.instances.objects.push(e)); }));
                        }
                        if (this.background.y < 1300 && this.background.y > 1298) {
                            this.makeTanks(700);
                            this.instances.entities.unshift(new Building(this.ctx, 3, 600, function (e) { return (_this.instances.objects.push(e)); }));
                        }
                        if (this.background.y < 800 && this.background.y > 798) {
                            this.instances.entities.unshift(new Building(this.ctx, 1, 800, function (e) { return (_this.instances.objects.push(e)); }));
                        }
                    }
                    if (this.map == 0) {
                        if (this.background.y < 2900 && this.background.y > 2898)
                            this.makeTanks(500);
                        if (this.background.y < 1990 && this.background.y > 1988) {
                            this.makeTanks(700);
                            this.instances.entities.unshift(new Building(this.ctx, 2, 400, function (e) { return (_this.instances.objects.push(e)); }));
                        }
                        if (this.background.y < 1600 && this.background.y > 1598) {
                            this.instances.entities.unshift(new Building(this.ctx, 5, 700, function (e) { return (_this.instances.objects.push(e)); }));
                            this.instances.entities.unshift(new Building(this.ctx, 5, 900, function (e) { return (_this.instances.objects.push(e)); }));
                        }
                        if (this.background.y < 1300 && this.background.y > 1298) {
                            this.makeTanks(700);
                            this.instances.entities.unshift(new Building(this.ctx, 3, 400, function (e) { return (_this.instances.objects.push(e)); }));
                        }
                        if (this.background.y < 800 && this.background.y > 798) {
                            this.instances.entities.unshift(new Building(this.ctx, 1, 800, function (e) { return (_this.instances.objects.push(e)); }));
                        }
                    }
                }
                if (this.gravity && this.player.planeState.velocity.now > 4) {
                    this.player.coordinates.y += 0.3;
                    console.log("czimpi");
                }
                if (this.active)
                    requestAnimationFrame(this.frame);
                return [2 /*return*/];
            });
        }); };
        this.map = 0;
        this.active = true;
        this.gravity = gravity;
        this.canvas = canvas;
        this.speed = {
            now: 0,
            max: 2
        };
        var img = document.createElement("img");
        img.setAttribute("src", "../assets/testb.png");
        this.background = {
            src: img,
            x: this.map === 0 ? this.canvas.width : 0,
            y: img.height - canvas.height
        };
        this.ctx = ctx;
        this.instances = {
            objects: new Array(1).fill(new Airport(this.ctx)),
            entities: new Array(0),
            projectiles: new Array(0)
        };
        this.player = new Plane(this.ctx, this.increaseSpeed, function (e) { _this.instances.projectiles.push(e); }, function (e) { _this.instances.objects.push(e); }, this.instances.objects);
        this.instances.entities.push(this.player);
        this.frame();
    }
    return Game;
}());
export default Game;
