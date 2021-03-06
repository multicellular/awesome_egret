///<reference path="RenderManager.ts" />
///<reference path="BarControllerLayer.ts" />
///<reference path="RoleObject.ts" />

class WorldMap extends egret.DisplayObjectContainer implements IRender {

    static worldWidth: number = 5000;
    static worldHeight: number = 3000;
    static _ins: WorldMap;
    _player: Player;
    _camera: Camera;
    plants: Array<Plant> = [];
    _startPoint: egret.Point;
    // static instance: WorldMap;
    _otherPlayer: OtherPlayer;
    _rotation = 0;
    focusPlant: Plant;

    constructor() {

        super();
        // WorldMap.instance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    static get instance() {

        return WorldMap._ins || (this._ins = new WorldMap());

    }

    onAddToStage() {

        this.initMap();

    }
    initMap() {

        const loading = new LoadingUI();
        this.stage.addChild(loading);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, () => {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, () => {
                // var tmp = RES.getRes('e3dPack');
                // this.addChild(tmp);
                this.addMap();
                this.addToRender();
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.createCamera, this);
                this.stage.removeChild(loading);
            }, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, () => {
            }, this);
            RES.loadGroup('preload', 0, loading);
        }, this);
        RES.loadConfig('resource/default.res.json', 'resource');
    }

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

    addMap() {

        // 背景图
        const map: egret.Bitmap = new egret.Bitmap(RES.getRes('game_jpg'));
        // 图片repeat
        map.fillMode = egret.BitmapFillMode.SCALE;
        map.width = WorldMap.worldWidth;
        map.height = WorldMap.worldHeight;
        this.addChildAt(map, 0);
        // 植物
        this.addPlants();
        // 小地图
        // setTimeout(()=>{
        const minMap = new MiniMap();
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

    }
    addPlants() {

        this.addPlant(917, 2427);
        this.addPlant(1316, 2681);
        this.addPlant(1706, 1995);
        this.addPlant(1530, 2533);
        this.addPlant(720, 2088);
        this.addPlant(1324, 2254);
        this.addPlant(2010, 1746);

    }
    addPlant(x: number, y: number) {

        const plant: Plant = new Plant(x, y);
        this.addChild(plant);
        this.plants.push(plant);

    }
    update() {

        const camera = Camera.focus;
        let toX = -camera.x + this.stage.stageWidth / 2;
        let toY = -camera.y + this.stage.stageHeight / 2;
        if (toX > 0) {
            toX = 0;
        } else if (toX < -WorldMap.worldWidth + this.stage.stageWidth) {
            toX = -WorldMap.worldWidth + this.stage.stageWidth;
        }
        if (toY > 0) {
            toY = 0;
        } else if (toY < -WorldMap.worldHeight + this.stage.stageHeight) {
            toY = -WorldMap.worldHeight + this.stage.stageHeight;
        }
        this.x = toX;
        this.y = toY;

    }
    addToRender() {

        RenderManager.instance.addRender(this);

    }
    createCamera(evt: egret.TouchEvent) {

        if (RockBarController.instance._controling) {
            return;
        }
        this._startPoint = new egret.Point(evt.stageX, evt.stageY);
        this._camera = new Camera(this._player.x, this._player.y);
        this._camera.addFocus();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveCamera, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelCamera, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelCamera, this);
    }

    moveCamera(evt: egret.TouchEvent) {
        // 
        const toX = this._player.x + (evt.stageX - this._startPoint.x) * 4;
        const toY = this._player.y + (evt.stageY - this._startPoint.y) * 3;
        this._camera.moveTo(toX, toY);

    }

    cancelCamera() {

        this._player.addFocus();
        this._camera = null;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveCamera, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelCamera, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelCamera, this);

    }

    updateFocusPlant(plant: Plant) {
        if (!plant) {
            this.resetFocusPlant();
            return;
        }
        if (this.focusPlant != plant) {
            this.resetFocusPlant();
            this.focusPlant = plant;
            this.focusPlant.focusPlant();
        }

    }

    resetFocusPlant() {
        if (this.focusPlant) {
            this.focusPlant.resetPlant();
            this.focusPlant = null;
        }
    }

    updatePosY(plant: Plant, player: Player, zIndex: number) {
        let plantIdx = this.getChildIndex(plant);
        this.setChildIndex(player, plantIdx + zIndex);
        // this.swapChildren(player, plant);
    }

}

class MiniMap extends egret.DisplayObjectContainer implements IRender {
    // 
    _width: number = 300;
    _height: number = 180;
    static _ins: MiniMap;
    sclX: number;
    sclY: number;
    _map: egret.Bitmap;
    _roles = [];
    _shapes = [];
    _player: egret.Shape;
    _camera: Camera;
    _otherPlayer: egret.Shape;
    constructor() {

        super();
        this.sclX = this._width / WorldMap.worldWidth;
        this.sclY = this._height / WorldMap.worldHeight;
        const renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(WorldMap.instance);
        const texture = new egret.Texture();
        texture.bitmapData = renderTexture.bitmapData;
        this._map = new egret.Bitmap(texture);
        this.width = this._width;
        this.height = this._height;
        this._map.scaleX = this.sclX;
        this._map.scaleY = this.sclY;
        this.addChild(this._map);

        this.addToRender();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.createCamera, this);

    }
    static get instance() {
        return MiniMap._ins || (this._ins = new MiniMap());
    }
    update() {

        const len = MiniMap.instance._roles.length;
        for (let i = 0; i < len; i++) {
            const toX = MiniMap.instance._roles[i].x * this.sclX;
            const toY = MiniMap.instance._roles[i].y * this.scaleY;
            MiniMap.instance._shapes[i].x = toX;
            MiniMap.instance._shapes[i].y = toY;
        }

    }
    addToRender() {

        RenderManager.instance.addRender(this);

    }
    addRole(role: egret.DisplayObject) {

        // role.type 区分shape颜色
        MiniMap.instance._roles.push(role);
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xaa22222);
        shape.graphics.drawCircle(0, 0, 5)
        shape.graphics.endFill();
        MiniMap.instance._shapes.push(shape);
        shape.x = role.x * this.sclX;
        shape.y = role.y * this.scaleY;
        MiniMap.instance.addChild(shape);

    }
    removeRole(role: egret.DisplayObject) {

        const idx = MiniMap.instance._roles.indexOf(role);
        if (idx > -1) {
            MiniMap.instance._roles.splice(idx, 1);
            MiniMap.instance._shapes.splice(idx, 1);
        }

    }
    createCamera(evt: egret.TouchEvent) {
        const px: number = (evt.stageX - this.x) / this.sclX;
        const py: number = (evt.stageY - this.y) / this.sclY;
        evt.stopPropagation();
        this._camera = new Camera(px, py);
        this._camera.addFocus();
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveCamera, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelCamera, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelCamera, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.cancelCamera, this);

    }
    moveCamera(evt: egret.TouchEvent) {
        const px: number = (evt.stageX - this.x) / this.sclX;
        const py: number = (evt.stageY - this.y) / this.sclY;
        evt.stopPropagation();
        this._camera.moveTo(px, py);
    }

    cancelCamera(evt: egret.TouchEvent) {

        evt.stopPropagation();
        WorldMap.instance._player.addFocus();
        this._camera = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveCamera, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelCamera, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelCamera, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.cancelCamera, this);

    }

}
