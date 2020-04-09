var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
///<reference path="RenderManager.ts" />
///<reference path="BarControllerLayer.ts" />
///<reference path="WorldMapLayer.ts" />
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
__reflect(Animal.prototype, "Animal");
var Plant = (function (_super) {
    __extends(Plant, _super);
    function Plant(px, py) {
        var _this = _super.call(this) || this;
        _this.level = 1; // 等级（ 幼苗🌱(0-3) 小树🌲(3-8) 大树🌳(<8)）
        _this.x = px;
        _this.y = py;
        // this.graphics.beginFill(0x000000, 1);
        // this.graphics.drawRect(-20, -250, 40, 250);
        // this.graphics.beginFill(0x00FF00, 1);
        // this.graphics.drawRect(-70, -250, 140, 80);
        // this.graphics.endFill();
        _this._rectX = -20;
        _this._rectY = -30;
        _this._rectW = 40;
        _this._rectH = 30;
        _this.added();
        // 背景图
        var tree = new egret.Bitmap(RES.getRes('tree_png'));
        tree.width = 120;
        tree.height = 140;
        tree.fillMode = egret.BitmapFillMode.SCALE;
        _this.addChild(tree);
        return _this;
        // test
        // this.graphics.lineStyle(2, 0xff00ff);
        // this.graphics.moveTo(-25, 0);
        // this.graphics.lineTo(25, 0);
        // this.graphics.lineTo(25, -30);
        // this.graphics.lineTo(-25, -30);
        // this.graphics.lineTo(-25, 0);
        // this.graphics.endFill();
    }
    //是否可操作
    Plant.prototype.tryOption = function (px, py) {
        if ((px >= this._gx - Plant._optRound && px <= this._gx + this._rectW + Plant._optRound) && (py >= this._gy - Plant._optRound && py <= this._gy + this._rectH + Plant._optRound))
            return Math.abs(Math.min(px - (this._gx - Plant._optRound), this._gx + this._rectW + Plant._optRound - px));
        return -1;
    };
    //是否已碰撞
    Plant.prototype.hitTestArea = function (px, py) {
        return (px >= this._gx && px <= this._gx + this._rectW) && (py >= this._gy && py <= this._gy + this._rectH);
    };
    Plant.prototype.added = function () {
        this._gx = this.x + this._rectX;
        this._gy = this.y + this._rectY;
    };
    Plant.prototype.resetPlant = function () {
        this.filters = null;
    };
    Plant.prototype.focusPlant = function () {
        // console.log(this.filters);
        var color = 0xaaaa22; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        this.filters = [glowFilter];
    };
    Plant._optRound = 20;
    return Plant;
}(egret.DisplayObjectContainer));
__reflect(Plant.prototype, "Plant");
var Nature = (function () {
    function Nature() {
    }
    return Nature;
}());
__reflect(Nature.prototype, "Nature");
var Camera = (function (_super) {
    __extends(Camera, _super);
    // toX: number;
    // toY: number;
    function Camera(px, py) {
        var _this = _super.call(this) || this;
        _this.x = px;
        _this.y = py;
        _this._startPoint = new egret.Point(px, py);
        return _this;
    }
    Camera.prototype.moveTo = function (toX, toY) {
        // 小地图/地图上滑动时，对应地图中camera移动位置
        this._movePoint = new egret.Point(toX, toY);
        this.x = toX;
        this.y = toY;
    };
    Camera.prototype.addFocus = function () {
        Camera._focus = this;
    };
    Object.defineProperty(Camera, "focus", {
        get: function () {
            return Camera._focus || new Camera(0, 0);
        },
        set: function (object) {
            Camera._focus = object;
        },
        enumerable: true,
        configurable: true
    });
    return Camera;
}(egret.DisplayObjectContainer));
__reflect(Camera.prototype, "Camera");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(px, py) {
        var _this = _super.call(this) || this;
        _this.speedX = 8;
        _this.speedY = 6;
        _this.x = px;
        _this.y = py;
        _this._factory = new dragonBones.EgretFactory();
        _this._factory.parseDragonBonesData(RES.getRes("SwordsMan_ske_json"));
        _this._factory.parseTextureAtlasData(RES.getRes("SwordsMan_tex_json"), RES.getRes("SwordsMan_tex_png"));
        _this._armature = _this._factory.buildArmature('Swordsman');
        var _armatureDisplay = _this._armature.display;
        _armatureDisplay.scaleX = _armatureDisplay.scaleY = 0.2;
        _this.addChild(_armatureDisplay);
        dragonBones.WorldClock.clock.add(_this._armature);
        _this.addToRender();
        _this.addToController();
        return _this;
        // 模拟人物
        // var shape: egret.Shape = new egret.Shape();
        // shape.graphics.beginFill(0xFF0000, 1);
        // shape.graphics.drawRect(-30, -120, 60, 120);
        // shape.graphics.endFill();
        // this.addChild(shape)
    }
    Player.prototype._frameEventHandler = function (evt) {
        if (this._isAttacking && evt.eventObject.name == "onFire") {
            var firePointBone = evt.eventObject.armature.getBone("firePoint");
            evt.eventObject.armature.display.localToGlobal(firePointBone.global.x, firePointBone.global.y, Player._globalPoint);
            new Bullet("bullet_01", "fireEffect_01", 40, Player._globalPoint, this);
        }
    };
    Player.prototype.update = function () {
        // 移动
        this.linkRockBar();
        // 技能
        this.linkController();
    };
    Player.prototype.addToRender = function () {
        RenderManager.instance.addRender(this);
    };
    Player.prototype.removeToRender = function () {
        RenderManager.instance.removeRender(this);
    };
    Player.prototype.addToController = function () {
        BarControllerLayer.instance.setCotrolObject(this);
    };
    Player.prototype.addToMiniMap = function () {
        MiniMap.instance.addRole(this);
    };
    Player.prototype.removeToMiniMap = function () {
        MiniMap.instance.removeRole(this);
    };
    Player.prototype.addFocus = function () {
        Camera._focus = this;
    };
    Player.prototype.checkHit = function (toX, toY, player) {
        var disX = toX - this.x;
        var disY = toY - this.y;
        var isHit = false;
        var plants = WorldMap.instance.plants;
        var role;
        for (var _i = 0, plants_1 = plants; _i < plants_1.length; _i++) {
            var plant = plants_1[_i];
            var point = new egret.Point();
            plant.parent.localToGlobal(plant.x, plant.y, point);
            player.display.globalToLocal(point.x, point.y, point);
            var boundingBox = player.getSlot('zuoxie211_boundingBox');
            var hitA = boundingBox.intersectsSegment(point.x - 25 - disX, point.y - disY - 15, point.x + 25 - disX, point.y - disY - 15);
            var hitB = boundingBox.intersectsSegment(point.x - disX, point.y - disY - 30, point.x - disX, point.y - disY);
            if (hitA || hitB) {
                isHit = true;
            }
            // if (plant.hitTestArea(x, y)) {
            //     isHit = true;
            // }
            if (plant.tryOption(toX, toY) > 0) {
                role = plant;
            }
            this.checkPosY(plant);
        }
        // let rect1 = new egret.Rectangle(x, y, player.width, player.height);
        // let rect2: egret.Rectangle;
        // const plants = WorldMap.instance.plants;
        // for (let plant of plants) {
        //     rect2 = new egret.Rectangle(plant.x, plant.y, plant.width, plant.height);
        //     if (rect2.intersects(rect1)) {
        //         isHit = true;
        //         break;
        //     }
        // }
        // 可与玩家互动的物体
        WorldMap.instance.updateFocusPlant(role);
        return isHit;
    };
    Player.prototype.checkPosY = function (plant) {
        var rect = new egret.Rectangle(plant.x, plant.y, plant.width, plant.height);
        var rect2 = new egret.Rectangle(this.x, this.y, this.width, this.height);
        if (rect2.intersects(rect)) {
            // 重叠时，根据y更改层级
            var zIndex = this.y > plant.y ? 1 : -1;
            WorldMap.instance.updatePosY(plant, this, zIndex);
        }
        // var rect1:egret.Rectangle = plant.getBounds();//获取显示对象的测量边界
        // var rect2:egret.Rectangle = this.getBounds();
        // rect1.x = plant.x;
        // rect1.y = plant.y;
        // rect2.x = this.x;
        // rect2.y = this.y;
        // //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        // return rect1.intersects(rect2);
    };
    Player.prototype.linkController = function () {
        // 响应长按事件
        this._isAttacking = false;
        var control_tap = BarControllerLayer.instance.controlTap;
        if (control_tap == BarControllerLayer.TAP_ATTACK) {
            // this._isAttacking = true;
            // this._armature.animation.lastAnimationName != 'attack1' && this._armature.animation.gotoAndPlay('attack1');
        }
        else if (control_tap == BarControllerLayer.TAP_SKILL_1) {
            // this._armature.animation.lastAnimationName != 'attack2' && this._armature.animation.gotoAndPlay('attack2');
        }
        else if (control_tap == BarControllerLayer.TAP_SKILL_2) {
            // this._armature.animation.lastAnimationName != 'attack1_+1' && this._armature.animation.gotoAndPlay('attack1_+1');
        }
        else if (control_tap == BarControllerLayer.TAP_SKILL_3) {
            // this._armature.animation.lastAnimationName != 'jump' && this._armature.animation.gotoAndPlay('jump');
        }
        else if (control_tap == BarControllerLayer.TAP_SKILL_4) {
        }
    };
    Player.prototype.handleController = function (control_tap) {
        console.log(control_tap);
        this.isAnimation = true;
    };
    Player.prototype.linkRockBar = function () {
        if (RockBarController.instance._offset == 0) {
            if (!this.isAnimation && this._armature.animation.lastAnimationName != 'steady') {
                this._armature.animation.fadeIn('steady');
            }
            return;
        }
        if (this._armature.animation.lastAnimationName != 'walk') {
            this._armature.animation.fadeIn('walk');
        }
        //在这里检查某个点是否可以到达
        var toX = this.x + RockBarController.instance._multX * this.speedX;
        var toY = this.y + RockBarController.instance._multY * this.speedY;
        // console.log(RockBarController.instance._multX, RockBarController.instance._multY);
        if (RockBarController.instance._multX > 0) {
            // 右X
            this._armature.flipX = false;
        }
        else if (RockBarController.instance._multX < 0) {
            // 左X
            this._armature.flipX = true;
        }
        if (RockBarController.instance._multY > 0) {
            // 下Y
        }
        else if (RockBarController.instance._multY < 0) {
            // 上Y
        }
        if (toX < 0) {
            toX = 0;
        }
        else if (toX > WorldMap.worldWidth - this.width) {
            toX = WorldMap.worldWidth - this.width;
        }
        if (toY < this.height) {
            toY = this.height;
        }
        else if (toY > WorldMap.worldHeight - this.height) {
            toY = WorldMap.worldHeight - this.height;
        }
        var isHit = this.checkHit(toX, toY, this._armature);
        if (isHit) {
            // toX += RockBarController.instance._multX * 5;
            toY += RockBarController.instance._multY * 10;
        }
        isHit = this.checkHit(toX, toY, this._armature);
        if (!isHit) {
            this.x = toX;
            this.y = toY;
        }
    };
    Player.prototype.attack = function () {
        var plants = WorldMap.instance.plants;
        var isHit = false;
        for (var _i = 0, plants_2 = plants; _i < plants_2.length; _i++) {
            var plant = plants_2[_i];
            if (this._armature.getSlot('dao').containsPoint(plant.x, plant.y)) {
                isHit = true;
                break;
            }
        }
    };
    Player._globalPoint = new egret.Point();
    return Player;
}(egret.DisplayObjectContainer));
__reflect(Player.prototype, "Player", ["IRender"]);
var OtherPlayer = (function (_super) {
    __extends(OtherPlayer, _super);
    function OtherPlayer(px, py) {
        var _this = _super.call(this) || this;
        _this.x = px;
        _this.y = py;
        _this._factory = new dragonBones.EgretFactory();
        _this._factory.parseDragonBonesData(RES.getRes("Robot_json"));
        _this._factory.parseTextureAtlasData(RES.getRes("Robot_texture_json"), RES.getRes("Robot_texture_png"));
        _this._armature = _this._factory.buildArmature('mecha_1502b');
        var _armatureDisplay = _this._armature.display;
        _armatureDisplay.scaleX = _armatureDisplay.scaleY = 0.3;
        _this.addChild(_armatureDisplay);
        dragonBones.WorldClock.clock.add(_this._armature);
        _this.addToRender();
        return _this;
    }
    OtherPlayer.prototype.addToRender = function () {
        RenderManager.instance.addRender(this);
    };
    OtherPlayer.prototype.removeToRender = function () {
        RenderManager.instance.removeRender(this);
    };
    OtherPlayer.prototype.addToMiniMap = function () {
        MiniMap.instance.addRole(this);
    };
    OtherPlayer.prototype.removeToMiniMap = function () {
        MiniMap.instance.removeRole(this);
    };
    OtherPlayer.prototype.update = function () {
        this._armature.animation.lastAnimationName != 'walk' && this._armature.animation.gotoAndPlay('walk');
        this.x += 5;
        this.y += 1;
        if (this.x > 1000) {
            this.x = 500;
        }
        if (this.y > 3000) {
            this.y = 2100;
        }
    };
    return OtherPlayer;
}(egret.DisplayObjectContainer));
__reflect(OtherPlayer.prototype, "OtherPlayer", ["IRender"]);
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(armatureName, effectArmatureName, speed, position, player) {
        var _this = _super.call(this) || this;
        _this._speedX = 0;
        _this._speedY = 0;
        _this._armature = null;
        _this._armatureDisplay = null;
        _this._effect = null;
        _this._speedX = 0.4 * speed;
        _this._speedY = 0.6 * speed;
        _this._player = player;
        _this._armature = player._factory.buildArmature(armatureName);
        _this._armatureDisplay = _this._armature.display;
        _this._armatureDisplay.x = position.x;
        _this._armatureDisplay.y = position.y;
        // this._armatureDisplay.rotation = radian * 57.3;
        _this._armature.animation.play("idle");
        if (effectArmatureName) {
            _this._effect = player._factory.buildArmature(effectArmatureName);
            var effectDisplay = _this._effect.display;
            // effectDisplay.rotation = radian * 57.3;
            effectDisplay.x = position.x;
            effectDisplay.y = position.y;
            effectDisplay.scaleX = 1 + Math.random() * 1;
            effectDisplay.scaleY = 1 + Math.random() * 0.5;
            if (Math.random() < 0.5) {
                effectDisplay.scaleY *= -1;
            }
            _this._effect.animation.play("idle");
            dragonBones.WorldClock.clock.add(_this._effect);
            _this._player.addChild(effectDisplay);
        }
        dragonBones.WorldClock.clock.add(_this._armature);
        _this._player.addChild(_this._armatureDisplay);
        _this.addToRender();
        return _this;
    }
    Bullet.prototype.update = function () {
        this._armatureDisplay.x += this._speedX;
        // this._armatureDisplay.y += this._speedY;
        if (this._armatureDisplay.x < -100 || this._armatureDisplay.x >= this._player.stage.stageWidth + 100 ||
            this._armatureDisplay.y < -100 || this._armatureDisplay.y >= this._player.stage.stageHeight + 100) {
            this.removeToRender();
            dragonBones.WorldClock.clock.remove(this._armature);
            this._player.removeChild(this._armatureDisplay);
            this._armature.dispose();
            if (this._effect) {
                dragonBones.WorldClock.clock.remove(this._effect);
                this._player.removeChild(this._effect.display);
                this._effect.dispose();
            }
            return true;
        }
        return false;
    };
    Bullet.prototype.addToRender = function () {
        RenderManager.instance.addRender(this);
    };
    Bullet.prototype.removeToRender = function () {
        RenderManager.instance.removeRender(this);
    };
    return Bullet;
}(egret.DisplayObject));
__reflect(Bullet.prototype, "Bullet", ["IRender"]);
