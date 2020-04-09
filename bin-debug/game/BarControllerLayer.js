/// <reference path="RoleObject.ts" />
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
var BarControllerLayer = (function (_super) {
    __extends(BarControllerLayer, _super);
    function BarControllerLayer() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initLayer, _this);
        return _this;
    }
    Object.defineProperty(BarControllerLayer, "instance", {
        get: function () {
            return this.ins || (this.ins = new BarControllerLayer());
        },
        enumerable: true,
        configurable: true
    });
    BarControllerLayer.prototype.initLayer = function () {
        this.addChild(new RockBarController(125, this.stage.stageHeight - 125));
        this.initSkillBars();
    };
    BarControllerLayer.prototype.setCotrolObject = function (player) {
        this.controlPlayer = player;
    };
    BarControllerLayer.prototype.drawAttackBar = function () {
        var _this = this;
        var attackBar = this.drawCircleBar(0, 0, 45);
        var cancelHandler = function () {
            attackBar.scaleX = attackBar.scaleY = 1;
            BarControllerLayer.instance.controlTap = 'none';
        };
        attackBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            attackBar.scaleX = attackBar.scaleY = 1.1;
            BarControllerLayer.instance.controlTap = 'attack';
            _this.controlPlayer.handleController('attack');
            evt.stopPropagation();
        }, this);
        attackBar.addEventListener(egret.TouchEvent.TOUCH_CANCEL, cancelHandler, this);
        attackBar.addEventListener(egret.TouchEvent.TOUCH_END, cancelHandler, this);
        attackBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, cancelHandler, this);
        return attackBar;
    };
    BarControllerLayer.prototype.initSkillBars = function () {
        var _this = this;
        var barContainer = new egret.DisplayObjectContainer();
        barContainer.x = this.stage.stageWidth - 100;
        barContainer.y = this.stage.stageHeight - 100;
        var attackBar = this.drawAttackBar();
        barContainer.addChild(attackBar);
        var cancelHandler = function (bar) {
            bar.scaleX = bar.scaleY = 1;
            BarControllerLayer.instance.controlTap = 'none';
        };
        var _loop_1 = function (i) {
            var skillBar = this_1.drawCircleBar(0, 0, 35);
            if (i == 0) {
                skillBar.x = -120;
                skillBar.y = 0;
            }
            else if (i == 1) {
                skillBar.x = -85;
                skillBar.y = -85;
            }
            else if (i == 2) {
                skillBar.x = 0;
                skillBar.y = -120;
            }
            barContainer.addChild(skillBar);
            skillBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
                skillBar.scaleX = skillBar.scaleY = 1.1;
                BarControllerLayer.instance.controlTap = 'skill' + (i + 1);
                _this.controlPlayer.handleController('skill' + (i + 1));
                evt.stopPropagation();
            }, this_1);
            skillBar.addEventListener(egret.TouchEvent.TOUCH_CANCEL, function () {
                cancelHandler(skillBar);
            }, this_1);
            skillBar.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                cancelHandler(skillBar);
            }, this_1);
            skillBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
                cancelHandler(skillBar);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
        this.addChild(barContainer);
    };
    BarControllerLayer.prototype.drawCircleBar = function (px, py, radius) {
        var circleBar = new egret.Shape();
        circleBar.graphics.beginFill(0xf1ebee);
        circleBar.graphics.drawCircle(px, py, radius);
        circleBar.graphics.endFill();
        circleBar.touchEnabled = true;
        return circleBar;
    };
    BarControllerLayer.TAP_ATTACK = 'attack';
    BarControllerLayer.TAP_SKILL_1 = 'skill1';
    BarControllerLayer.TAP_SKILL_2 = 'skill2';
    BarControllerLayer.TAP_SKILL_3 = 'skill3';
    BarControllerLayer.TAP_SKILL_4 = 'skill4';
    return BarControllerLayer;
}(egret.DisplayObjectContainer));
__reflect(BarControllerLayer.prototype, "BarControllerLayer");
var RockBarController = (function (_super) {
    __extends(RockBarController, _super);
    function RockBarController(px, py) {
        var _this = _super.call(this) || this;
        _this._multX = 0;
        _this._multY = 0;
        _this._offset = 0;
        _this._controling = false;
        _this._rockbarRadius = 30;
        _this._controllerRadius = 70;
        _this._movePoint = new egret.Point(); //移动的位置
        _this.x = px;
        _this.y = py;
        _this.graphics.lineStyle(2, 0xf1ebee);
        _this.graphics.drawCircle(0, 0, _this._controllerRadius);
        _this.graphics.endFill();
        _this._rockbar = new egret.Shape();
        _this._rockbar.graphics.beginFill(0xf1ebee);
        _this._rockbar.graphics.drawCircle(0, 0, _this._rockbarRadius);
        _this._rockbar.graphics.endFill();
        _this._rockbar.touchEnabled = true;
        _this.addChild(_this._rockbar);
        _this._restPoint = new egret.Point(_this._rockbar.x, _this._rockbar.y);
        _this._rockbar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBeginHandler, _this, false, 2);
        return _this;
    }
    Object.defineProperty(RockBarController, "instance", {
        get: function () {
            return this.ins || (this.ins = new RockBarController(200, 400));
        },
        enumerable: true,
        configurable: true
    });
    //按下摇杆
    RockBarController.prototype.touchBeginHandler = function (evt) {
        if (this._startPoint == null)
            this._startPoint = new egret.Point();
        this._startPoint.x = evt.stageX;
        this._startPoint.y = evt.stageY;
        RockBarController.instance._controling = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this, false, 2);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this, false, 2);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this, false, 2);
    };
    //摇杆移动
    RockBarController.prototype.touchMoveHandler = function (evt) {
        this._movePoint.x = evt.stageX;
        this._movePoint.y = evt.stageY;
        var dist = egret.Point.distance(this._startPoint, this._movePoint);
        if (dist <= this._controllerRadius) {
            this._rockbar.x = this._restPoint.x + this._movePoint.x - this._startPoint.x;
            this._rockbar.y = this._restPoint.y + this._movePoint.y - this._startPoint.y;
        }
        else {
            var toPoint = egret.Point.interpolate(this._movePoint, this._startPoint, this._controllerRadius / dist);
            this._rockbar.x = toPoint.x - this.x;
            this._rockbar.y = toPoint.y - this.y;
        }
        //计算X和Y方向上的分速度倍数
        RockBarController.instance._multX = (this._movePoint.x - this._startPoint.x) / dist; //x分量
        RockBarController.instance._multY = (this._movePoint.y - this._startPoint.y) / dist; //y分量
        // RockBarController.instance._offset = dist / this._controllerRadius;//力度分量
        RockBarController.instance._offset = dist; //力度分量
    };
    //取消摇杆
    RockBarController.prototype.cancelHandler = function (evt) {
        RockBarController.instance._controling = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
        egret.Tween.removeTweens(this._rockbar);
        egret.Tween.get(this._rockbar).to({ x: this._restPoint.x, y: this._restPoint.y }, 50, egret.Ease.backOut);
        RockBarController.instance._multX = 0;
        RockBarController.instance._multY = 0;
        RockBarController.instance._offset = 0;
    };
    return RockBarController;
}(egret.Sprite));
__reflect(RockBarController.prototype, "RockBarController");
