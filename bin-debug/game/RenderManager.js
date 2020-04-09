// class RenderConfig {
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RenderManager = (function () {
    function RenderManager() {
        this.renderList = [];
    }
    Object.defineProperty(RenderManager, "instance", {
        get: function () {
            return this.singleton || (this.singleton = new RenderManager());
        },
        enumerable: true,
        configurable: true
    });
    RenderManager.prototype.startRender = function (stage) {
        stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    RenderManager.prototype.enterFrameHandler = function () {
        dragonBones.WorldClock.clock.advanceTime(-1);
        var render;
        for (var _i = 0, _a = this.renderList; _i < _a.length; _i++) {
            render = _a[_i];
            render.update();
        }
    };
    RenderManager.prototype.addRender = function (render) {
        this.renderList.push(render);
    };
    RenderManager.prototype.removeRender = function (render) {
        var idx = this.renderList.indexOf(render);
        if (idx > 0) {
            this.renderList.splice(idx, 1);
        }
    };
    return RenderManager;
}());
__reflect(RenderManager.prototype, "RenderManager");
