///<reference path="RenderManager.ts" />
///<reference path="BarControllerLayer.ts" />
///<reference path="WorldMapLayer.ts" />
interface RoleObject {

}

class Animal {
    //动物（玩家、其他玩家、野怪等）


}

class Plant extends egret.DisplayObjectContainer {
    //植物（花、草、树）

    _isInMap: boolean; //是否在地图上
    _isInMiniMap: boolean;//是否映射在小地图上
    _isInRender: boolean; //是否定时渲染
    level: number = 1; // 等级（ 幼苗🌱(0-3) 小树🌲(3-8) 大树🌳(<8)）
    private static _optRound: number = 20;
    private _rectX: number;
    private _rectY: number;
    private _rectW: number;
    private _rectH: number;
    private _gx: number;//碰撞检测框x
    private _gy: number;//碰撞检测框y

    constructor(px: number, py: number) {
        super();
        this.x = px;
        this.y = py;
        // this.graphics.beginFill(0x000000, 1);
        // this.graphics.drawRect(-20, -250, 40, 250);
        // this.graphics.beginFill(0x00FF00, 1);
        // this.graphics.drawRect(-70, -250, 140, 80);
        // this.graphics.endFill();
        this._rectX = -20;
        this._rectY = -30;
        this._rectW = 40;
        this._rectH = 30;
        this.added();
        // 背景图
        const tree: egret.Bitmap = new egret.Bitmap(RES.getRes('tree_png'));
        tree.width = 120;
        tree.height = 140;
        tree.fillMode = egret.BitmapFillMode.SCALE;
        this.addChild(tree);
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
    public tryOption(px: number, py: number): number {
        if ((px >= this._gx - Plant._optRound && px <= this._gx + this._rectW + Plant._optRound) && (py >= this._gy - Plant._optRound && py <= this._gy + this._rectH + Plant._optRound))
            return Math.abs(Math.min(px - (this._gx - Plant._optRound), this._gx + this._rectW + Plant._optRound - px));
        return -1;
    }

    //是否已碰撞
    public hitTestArea(px: number, py: number): boolean {
        return (px >= this._gx && px <= this._gx + this._rectW) && (py >= this._gy && py <= this._gy + this._rectH);
    }

    public added(): void {
        this._gx = this.x + this._rectX;
        this._gy = this.y + this._rectY;
    }

    public resetPlant(): void {
        this.filters = null;
    }

    public focusPlant(): void {
        // console.log(this.filters);
        var color: number = 0xaaaa22;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
        var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
            strength, quality, inner, knockout);
        this.filters = [glowFilter];
    }

}

class Nature {
    //自然地形（山、水、沙、雪）
}

class Camera extends egret.DisplayObjectContainer {

    static _focus: egret.DisplayObject;
    _startPoint: egret.Point;
    _movePoint: egret.Point;
    // toX: number;
    // toY: number;

    constructor(px: number, py: number) {

        super();
        this.x = px;
        this.y = py;
        this._startPoint = new egret.Point(px, py);

    }
    moveTo(toX: number, toY: number) {
        // 小地图/地图上滑动时，对应地图中camera移动位置
        this._movePoint = new egret.Point(toX, toY);
        this.x = toX;
        this.y = toY;

    }
    addFocus() {

        Camera._focus = this;

    }
    static set focus(object) {

        Camera._focus = object;

    }
    static get focus() {

        return Camera._focus || new Camera(0, 0);

    }

}


class Player extends egret.DisplayObjectContainer implements IRender {

    private speedX: number = 8;
    private speedY: number = 6;
    _armature: dragonBones.Armature;
    _factory: dragonBones.EgretFactory;
    _walking: boolean;
    _isAttacking: boolean;
    private static _globalPoint: egret.Point = new egret.Point();

    constructor(px: number, py: number) {

        super();
        this.x = px;
        this.y = py;
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(RES.getRes("SwordsMan_ske_json"));
        this._factory.parseTextureAtlasData(RES.getRes("SwordsMan_tex_json"), RES.getRes("SwordsMan_tex_png"));
        this._armature = this._factory.buildArmature('Swordsman');
        const _armatureDisplay = <dragonBones.EgretArmatureDisplay>this._armature.display;
        _armatureDisplay.scaleX = _armatureDisplay.scaleY = 0.2;
        this.addChild(_armatureDisplay);
        dragonBones.WorldClock.clock.add(this._armature);
        this.addToRender();
        this.addToController();

        // 模拟人物
        // var shape: egret.Shape = new egret.Shape();
        // shape.graphics.beginFill(0xFF0000, 1);
        // shape.graphics.drawRect(-30, -120, 60, 120);
        // shape.graphics.endFill();
        // this.addChild(shape)

    }

    _frameEventHandler(evt: dragonBones.EgretEvent) {

        if (this._isAttacking && evt.eventObject.name == "onFire") {
            const firePointBone = evt.eventObject.armature.getBone("firePoint");
            (<dragonBones.EgretArmatureDisplay>evt.eventObject.armature.display).localToGlobal(firePointBone.global.x, firePointBone.global.y, Player._globalPoint);
            new Bullet("bullet_01", "fireEffect_01", 40, Player._globalPoint, this);
        }

    }

    update() {

        // 移动
        this.linkRockBar();
        // 技能
        this.linkController();
    }
    addToRender() {

        RenderManager.instance.addRender(this);
    }
    removeToRender() {

        RenderManager.instance.removeRender(this);
    }
    addToController() {

        BarControllerLayer.instance.setCotrolObject(this);
    }
    addToMiniMap() {

        MiniMap.instance.addRole(this);
    }
    removeToMiniMap() {

        MiniMap.instance.removeRole(this);
    }
    addFocus() {

        Camera._focus = this;
    }
    checkHit(toX: number, toY: number, player: dragonBones.Armature): boolean {

        const disX = toX - this.x;
        const disY = toY - this.y;
        let isHit: boolean = false;
        const plants = WorldMap.instance.plants;
        let role: Plant;
        for (let plant of plants) {
            const point = new egret.Point()
            plant.parent.localToGlobal(plant.x, plant.y, point);
            player.display.globalToLocal(point.x, point.y, point);
            const boundingBox = player.getSlot('zuoxie211_boundingBox');
            const hitA = boundingBox.intersectsSegment(point.x - 25 - disX, point.y - disY - 15, point.x + 25 - disX, point.y - disY - 15);
            const hitB = boundingBox.intersectsSegment(point.x - disX, point.y - disY - 30, point.x - disX, point.y - disY);
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
    }

    checkPosY(plant: Plant) {
        const rect = new egret.Rectangle(plant.x, plant.y, plant.width, plant.height);
        const rect2 = new egret.Rectangle(this.x, this.y, this.width, this.height);
        if (rect2.intersects(rect)) {
            // 重叠时，根据y更改层级
            const zIndex = this.y > plant.y ? 1 : -1;
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
    }

    linkController() {

        // 响应长按事件
        this._isAttacking = false;
        const control_tap = BarControllerLayer.instance.controlTap;
        if (control_tap == BarControllerLayer.TAP_ATTACK) {
            // this._isAttacking = true;
            // this._armature.animation.lastAnimationName != 'attack1' && this._armature.animation.gotoAndPlay('attack1');

        } else if (control_tap == BarControllerLayer.TAP_SKILL_1) {
            // this._armature.animation.lastAnimationName != 'attack2' && this._armature.animation.gotoAndPlay('attack2');

        } else if (control_tap == BarControllerLayer.TAP_SKILL_2) {
            // this._armature.animation.lastAnimationName != 'attack1_+1' && this._armature.animation.gotoAndPlay('attack1_+1');

        } else if (control_tap == BarControllerLayer.TAP_SKILL_3) {
            // this._armature.animation.lastAnimationName != 'jump' && this._armature.animation.gotoAndPlay('jump');
        } else if (control_tap == BarControllerLayer.TAP_SKILL_4) {

        }
    }

    private isAnimation: boolean;

    handleController(control_tap) {
        console.log(control_tap);
        this.isAnimation = true;
    }
    linkRockBar() {

        if (RockBarController.instance._offset == 0) {
            if (!this.isAnimation && this._armature.animation.lastAnimationName != 'steady') {
                this._armature.animation.fadeIn('steady')
            }
            return;
        }
        if (this._armature.animation.lastAnimationName != 'walk') {
            this._armature.animation.fadeIn('walk');
        }
        //在这里检查某个点是否可以到达
        let toX: number = this.x + RockBarController.instance._multX * this.speedX;
        let toY: number = this.y + RockBarController.instance._multY * this.speedY;
        // console.log(RockBarController.instance._multX, RockBarController.instance._multY);
        if (RockBarController.instance._multX > 0) {
            // 右X
            this._armature.flipX = false;
        } else if (RockBarController.instance._multX < 0) {
            // 左X
            this._armature.flipX = true;
        }
        if (RockBarController.instance._multY > 0) {
            // 下Y
        } else if (RockBarController.instance._multY < 0) {
            // 上Y
        }
        if (toX < 0) {
            toX = 0;
        } else if (toX > WorldMap.worldWidth - this.width) {
            toX = WorldMap.worldWidth - this.width;
        }

        if (toY < this.height) {
            toY = this.height;
        } else if (toY > WorldMap.worldHeight - this.height) {
            toY = WorldMap.worldHeight - this.height;
        }
        let isHit: boolean = this.checkHit(toX, toY, this._armature);
        if (isHit) {
            // toX += RockBarController.instance._multX * 5;
            toY += RockBarController.instance._multY * 10;
        }
        isHit = this.checkHit(toX, toY, this._armature);
        if (!isHit) {
            this.x = toX;
            this.y = toY;
        }
    }
    attack() {

        const plants = WorldMap.instance.plants;
        let isHit = false;
        for (let plant of plants) {
            if (this._armature.getSlot('dao').containsPoint(plant.x, plant.y)) {
                isHit = true;
                break;
            }
        }
    }

}

class OtherPlayer extends egret.DisplayObjectContainer implements IRender {

    dir: string;
    _factory: dragonBones.EgretFactory;
    _armature: dragonBones.Armature;
    constructor(px: number, py: number) {
        super();
        this.x = px;
        this.y = py;
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(RES.getRes("Robot_json"));
        this._factory.parseTextureAtlasData(RES.getRes("Robot_texture_json"), RES.getRes("Robot_texture_png"));
        this._armature = this._factory.buildArmature('mecha_1502b');
        const _armatureDisplay = <dragonBones.EgretArmatureDisplay>this._armature.display;
        _armatureDisplay.scaleX = _armatureDisplay.scaleY = 0.3;
        this.addChild(_armatureDisplay);
        dragonBones.WorldClock.clock.add(this._armature);
        this.addToRender();
    }
    addToRender() {

        RenderManager.instance.addRender(this);
    }
    removeToRender() {

        RenderManager.instance.removeRender(this);
    }
    addToMiniMap() {

        MiniMap.instance.addRole(this);
    }
    removeToMiniMap() {

        MiniMap.instance.removeRole(this);
    }
    update() {

        this._armature.animation.lastAnimationName != 'walk' && this._armature.animation.gotoAndPlay('walk');
        this.x += 5;
        this.y += 1;
        if (this.x > 1000) {
            this.x = 500
        }

        if (this.y > 3000) {
            this.y = 2100
        }
    }

}

class Bullet extends egret.DisplayObject implements IRender {

    private _speedX: number = 0;
    private _speedY: number = 0;

    private _armature: dragonBones.Armature = null;
    private _armatureDisplay: dragonBones.EgretArmatureDisplay = null;
    private _effect: dragonBones.Armature = null;

    _player: Player;

    public constructor(armatureName: string, effectArmatureName: string, speed: number, position: egret.Point, player: Player) {

        super();
        this._speedX = 0.4 * speed;
        this._speedY = 0.6 * speed;
        this._player = player;
        this._armature = player._factory.buildArmature(armatureName);
        this._armatureDisplay = <dragonBones.EgretArmatureDisplay>this._armature.display;
        this._armatureDisplay.x = position.x;
        this._armatureDisplay.y = position.y;
        // this._armatureDisplay.rotation = radian * 57.3;
        this._armature.animation.play("idle");

        if (effectArmatureName) {
            this._effect = player._factory.buildArmature(effectArmatureName);
            const effectDisplay = <dragonBones.EgretArmatureDisplay>this._effect.display;
            // effectDisplay.rotation = radian * 57.3;
            effectDisplay.x = position.x;
            effectDisplay.y = position.y;
            effectDisplay.scaleX = 1 + Math.random() * 1;
            effectDisplay.scaleY = 1 + Math.random() * 0.5;
            if (Math.random() < 0.5) {
                effectDisplay.scaleY *= -1;
            }

            this._effect.animation.play("idle");

            dragonBones.WorldClock.clock.add(this._effect);
            this._player.addChild(effectDisplay);
        }

        dragonBones.WorldClock.clock.add(this._armature);
        this._player.addChild(this._armatureDisplay);
        this.addToRender();
    }
    public update(): Boolean {

        this._armatureDisplay.x += this._speedX;
        // this._armatureDisplay.y += this._speedY;
        if (
            this._armatureDisplay.x < -100 || this._armatureDisplay.x >= this._player.stage.stageWidth + 100 ||
            this._armatureDisplay.y < -100 || this._armatureDisplay.y >= this._player.stage.stageHeight + 100
        ) {
            this.removeToRender();
            dragonBones.WorldClock.clock.remove(this._armature);
            this._player.removeChild(this._armatureDisplay);
            this._armature.dispose();

            if (this._effect) {
                dragonBones.WorldClock.clock.remove(this._effect);
                this._player.removeChild(<dragonBones.EgretArmatureDisplay>this._effect.display);
                this._effect.dispose();
            }
            return true;
        }
        return false;
    }
    addToRender() {

        RenderManager.instance.addRender(this);
    }
    removeToRender() {

        RenderManager.instance.removeRender(this);
    }

}