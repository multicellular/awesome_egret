///<reference path="RenderManager.ts" />
///<reference path="BarControllerLayer.ts" />
///<reference path="RoleObject.ts" />
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
var WorldMap = (function (_super) {
    __extends(WorldMap, _super);
    function WorldMap() {
        var _this = _super.call(this) || this;
        _this.plants = [];
        _this._rotation = 0;
        // WorldMap.instance = this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Object.defineProperty(WorldMap, "instance", {
        get: function () {
            return WorldMap._ins || (this._ins = new WorldMap());
        },
        enumerable: true,
        configurable: true
    });
    WorldMap.prototype.onAddToStage = function () {
        this.initMap();
    };
    WorldMap.prototype.initMap = function () {
        var _this = this;
        var loading = new LoadingUI();
        this.stage.addChild(loading);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function () {
                // var tmp = RES.getRes('e3dPack');
                // this.addChild(tmp);
                _this.addMap();
                _this.addToRender();
                _this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.createCamera, _this);
                _this.stage.removeChild(loading);
            }, _this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, function () {
            }, _this);
            RES.loadGroup('preload', 0, loading);
        }, this);
        RES.loadConfig('resource/default.res.json', 'resource');
    };
    // //一个菱形地板
    // public DarwCell(tileWidth: number, tileHight: number, index: string): egret.Sprite {
    //     var tile: egret.Sprite = new egret.Sprite();
    //     tile.graphics.lineStyle(1, 0xffffff);//设置画笔线性和颜色
    //     tile.graphics.beginFill(0x000000, 0.5);
    //     //创建菱形方块
    //     tile.graphics.moveTo(0, tileHight / 2);
    //     tile.graphics.lineTo(tileWidth / 2, 0);
    //     tile.graphics.lineTo(tileWidth, tileHight / 2);
    //     tile.graphics.lineTo(tileWidth / 2, tileHight);
    //     tile.graphics.lineTo(0, tileHight / 2);
    //     tile.graphics.endFill();
    //     var txt: egret.TextField = new egret.TextField();
    //     tile.addChild(txt)
    //     txt.text = index;
    //     txt.size = 10;
    //     txt.x = tile.width >> 1;
    //     txt.y = tile.height >> 1;
    //     return tile;
    // }
    // //创建网格
    // //200为最左侧格子初始坐标80单元格宽、40单元格高
    // private createGrid(): void {
    //     var cols: number = 30;//宽-单元格个数
    //     var rows: number = 30; //高-单元格个数
    //     for (var j: number = 0; j < cols; j++) {
    //         for (var i: number = 0; i < rows; i++) {
    //             var cell: egret.Sprite = this.DarwCell(80, 40, i + "." + j);
    //             cell.x = 200 + (i + j) * 80 / 2;
    //             cell.y = 200 + (30 - i + j - 1) * 40 / 2;
    //             this.addChild(cell);
    //         }
    //     }
    // }
    WorldMap.prototype.addMap = function () {
        // 背景图
        var map = new egret.Bitmap(RES.getRes('game_jpg'));
        // 图片repeat
        map.fillMode = egret.BitmapFillMode.SCALE;
        map.width = WorldMap.worldWidth;
        map.height = WorldMap.worldHeight;
        this.addChildAt(map, 0);
        // 植物
        this.addPlants();
        // 小地图
        // setTimeout(()=>{
        var minMap = new MiniMap();
        this.stage.addChild(minMap);
        minMap.x = this.stage.stageWidth - minMap._width;
        // },2000);
        // 人物
        this._player = new Player(556, 2621);
        this._player.addToMiniMap();
        Camera.focus = this._player;
        this.addChild(this._player);
        this._otherPlayer = new OtherPlayer(556, 2621);
        this.addChild(this._otherPlayer);
        // 旋转地图
        // const rotate: egret.Shape = new egret.Shape();
        // rotate.graphics.beginFill(0x003012);
        // rotate.graphics.drawCircle(556, 2621, 30);
        // rotate.graphics.endFill();
        // rotate.touchEnabled = true;
        // rotate.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     this.skewX = 5;
        //     this.skewY = 5;
        // }, this);
        // this.addChild(rotate);
    };
    WorldMap.prototype.addPlants = function () {
        this.addPlant(917, 2427);
        this.addPlant(1316, 2681);
        this.addPlant(1706, 1995);
        this.addPlant(1530, 2533);
        this.addPlant(720, 2088);
        this.addPlant(1324, 2254);
        this.addPlant(2010, 1746);
    };
    WorldMap.prototype.addPlant = function (x, y) {
        var plant = new Plant(x, y);
        this.addChild(plant);
        this.plants.push(plant);
    };
    WorldMap.prototype.update = function () {
        var camera = Camera.focus;
        var toX = -camera.x + this.stage.stageWidth / 2;
        var toY = -camera.y + this.stage.stageHeight / 2;
        if (toX > 0) {
            toX = 0;
        }
        else if (toX < -WorldMap.worldWidth + this.stage.stageWidth) {
            toX = -WorldMap.worldWidth + this.stage.stageWidth;
        }
        if (toY > 0) {
            toY = 0;
        }
        else if (toY < -WorldMap.worldHeight + this.stage.stageHeight) {
            toY = -WorldMap.worldHeight + this.stage.stageHeight;
        }
        this.x = toX;
        this.y = toY;
    };
    WorldMap.prototype.addToRender = function () {
        RenderManager.instance.addRender(this);
    };
    WorldMap.prototype.createCamera = function (evt) {
        if (RockBarController.instance._controling) {
            return;
        }
        this._startPoint = new egret.Point(evt.stageX, evt.stageY);
        this._camera = new Camera(this._player.x, this._player.y);
        this._camera.addFocus();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveCamera, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelCamera, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelCamera, this);
    };
    WorldMap.prototype.moveCamera = function (evt) {
        // 
        var toX = this._player.x + (evt.stageX - this._startPoint.x) * 4;
        var toY = this._player.y + (evt.stageY - this._startPoint.y) * 3;
        this._camera.moveTo(toX, toY);
    };
    WorldMap.prototype.cancelCamera = function () {
        this._player.addFocus();
        this._camera = null;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveCamera, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelCamera, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelCamera, this);
    };
    WorldMap.prototype.updateFocusPlant = function (plant) {
        if (!plant) {
            this.resetFocusPlant();
            return;
        }
        if (this.focusPlant != plant) {
            this.resetFocusPlant();
            this.focusPlant = plant;
            this.focusPlant.focusPlant();
        }
    };
    WorldMap.prototype.resetFocusPlant = function () {
        if (this.focusPlant) {
            this.focusPlant.resetPlant();
            this.focusPlant = null;
        }
    };
    WorldMap.prototype.updatePosY = function (plant, player, zIndex) {
        var plantIdx = this.getChildIndex(plant);
        this.setChildIndex(player, plantIdx + zIndex);
        // this.swapChildren(player, plant);
    };
    WorldMap.worldWidth = 5000;
    WorldMap.worldHeight = 3000;
    return WorldMap;
}(egret.DisplayObjectContainer));
__reflect(WorldMap.prototype, "WorldMap", ["IRender"]);
var MiniMap = (function (_super) {
    __extends(MiniMap, _super);
    function MiniMap() {
        var _this = _super.call(this) || this;
        // 
        _this._width = 300;
        _this._height = 180;
        _this._roles = [];
        _this._shapes = [];
        _this.sclX = _this._width / WorldMap.worldWidth;
        _this.sclY = _this._height / WorldMap.worldHeight;
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(WorldMap.instance);
        var texture = new egret.Texture();
        texture.bitmapData = renderTexture.bitmapData;
        _this._map = new egret.Bitmap(texture);
        _this.width = _this._width;
        _this.height = _this._height;
        _this._map.scaleX = _this.sclX;
        _this._map.scaleY = _this.sclY;
        _this.addChild(_this._map);
        _this.addToRender();
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.createCamera, _this);
        return _this;
    }
    Object.defineProperty(MiniMap, "instance", {
        get: function () {
            return MiniMap._ins || (this._ins = new MiniMap());
        },
        enumerable: true,
        configurable: true
    });
    MiniMap.prototype.update = function () {
        var len = MiniMap.instance._roles.length;
        for (var i = 0; i < len; i++) {
            var toX = MiniMap.instance._roles[i].x * this.sclX;
            var toY = MiniMap.instance._roles[i].y * this.scaleY;
            MiniMap.instance._shapes[i].x = toX;
            MiniMap.instance._shapes[i].y = toY;
        }
    };
    MiniMap.prototype.addToRender = function () {
        RenderManager.instance.addRender(this);
    };
    MiniMap.prototype.addRole = function (role) {
        // role.type 区分shape颜色
        MiniMap.instance._roles.push(role);
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xaa22222);
        shape.graphics.drawCircle(0, 0, 5);
        shape.graphics.endFill();
        MiniMap.instance._shapes.push(shape);
        shape.x = role.x * this.sclX;
        shape.y = role.y * this.scaleY;
        MiniMap.instance.addChild(shape);
    };
    MiniMap.prototype.removeRole = function (role) {
        var idx = MiniMap.instance._roles.indexOf(role);
        if (idx > -1) {
            MiniMap.instance._roles.splice(idx, 1);
            MiniMap.instance._shapes.splice(idx, 1);
        }
    };
    MiniMap.prototype.createCamera = function (evt) {
        var px = (evt.stageX - this.x) / this.sclX;
        var py = (evt.stageY - this.y) / this.sclY;
        evt.stopPropagation();
        this._camera = new Camera(px, py);
        this._camera.addFocus();
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveCamera, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelCamera, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelCamera, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.cancelCamera, this);
    };
    MiniMap.prototype.moveCamera = function (evt) {
        var px = (evt.stageX - this.x) / this.sclX;
        var py = (evt.stageY - this.y) / this.sclY;
        evt.stopPropagation();
        this._camera.moveTo(px, py);
    };
    MiniMap.prototype.cancelCamera = function (evt) {
        evt.stopPropagation();
        WorldMap.instance._player.addFocus();
        this._camera = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveCamera, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelCamera, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelCamera, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.cancelCamera, this);
    };
    return MiniMap;
}(egret.DisplayObjectContainer));
__reflect(MiniMap.prototype, "MiniMap", ["IRender"]);
