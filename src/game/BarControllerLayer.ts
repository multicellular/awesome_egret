/// <reference path="RoleObject.ts" />

class BarControllerLayer extends egret.DisplayObjectContainer {

	static ins: BarControllerLayer;
	_attackBar: egret.Shape;
	controlTap: string;
	static TAP_ATTACK: string = 'attack';
	static TAP_SKILL_1: string = 'skill1';
	static TAP_SKILL_2: string = 'skill2';
	static TAP_SKILL_3: string = 'skill3';
	static TAP_SKILL_4: string = 'skill4';
	controlPlayer: Player;

	constructor() {

		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initLayer, this);

	}
	static get instance() {

		return this.ins || (this.ins = new BarControllerLayer());

	}
	initLayer() {

		this.addChild(new RockBarController(125, this.stage.stageHeight - 125));
		this.initSkillBars();

	}
	setCotrolObject(player: Player) {

		this.controlPlayer = player;

	}
	drawAttackBar(): egret.Shape {

		const attackBar = this.drawCircleBar(0, 0, 45);
		const cancelHandler = () => {
			attackBar.scaleX = attackBar.scaleY = 1;
			BarControllerLayer.instance.controlTap = 'none';
		};
		attackBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
			attackBar.scaleX = attackBar.scaleY = 1.1;
			BarControllerLayer.instance.controlTap = 'attack';
			this.controlPlayer.handleController('attack');
			evt.stopPropagation();
		}, this);
		attackBar.addEventListener(egret.TouchEvent.TOUCH_CANCEL, cancelHandler, this);
		attackBar.addEventListener(egret.TouchEvent.TOUCH_END, cancelHandler, this);
		attackBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, cancelHandler, this);
		return attackBar;

	}
	initSkillBars() {

		const barContainer = new egret.DisplayObjectContainer();
		barContainer.x = this.stage.stageWidth - 100;
		barContainer.y = this.stage.stageHeight - 100;
		const attackBar = this.drawAttackBar();
		barContainer.addChild(attackBar);
		const cancelHandler = (bar: egret.Shape) => {
			bar.scaleX = bar.scaleY = 1;
			BarControllerLayer.instance.controlTap = 'none';
		};
		for (let i = 0; i < 3; i++) {
			const skillBar = this.drawCircleBar(0, 0, 35);
			if (i == 0) {
				skillBar.x = -120;
				skillBar.y = 0;
			} else if (i == 1) {
				skillBar.x = -85;
				skillBar.y = -85;
			} else if (i == 2) {
				skillBar.x = 0;
				skillBar.y = -120;
			}
			barContainer.addChild(skillBar);
			skillBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
				skillBar.scaleX = skillBar.scaleY = 1.1;
				BarControllerLayer.instance.controlTap = 'skill' + (i + 1);
				this.controlPlayer.handleController('skill' + (i + 1));
				evt.stopPropagation();
			}, this);
			skillBar.addEventListener(egret.TouchEvent.TOUCH_CANCEL, () => {
				cancelHandler(skillBar);
			}, this);
			skillBar.addEventListener(egret.TouchEvent.TOUCH_END, () => {
				cancelHandler(skillBar);
			}, this);
			skillBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
				cancelHandler(skillBar);
			}, this);
		}
		this.addChild(barContainer);

	}
	drawCircleBar(px: number, py: number, radius: number): egret.Shape {

		let circleBar = new egret.Shape();
		circleBar.graphics.beginFill(0xf1ebee);
		circleBar.graphics.drawCircle(px, py, radius);
		circleBar.graphics.endFill();
		circleBar.touchEnabled = true;
		return circleBar;

	}
}

class RockBarController extends egret.Sprite {

	static ins: RockBarController;

	_multX: number = 0;
	_multY: number = 0;
	_offset: number = 0;
	_controling: boolean = false;
	private _rockbar: egret.Shape;//抓动手柄
	private _rockbarRadius: number = 30;
	private _controllerRadius: number = 70;
	private _startPoint: egret.Point;//开始的位置
	private _movePoint: egret.Point = new egret.Point();//移动的位置
	private _restPoint: egret.Point;//重置的位置

	constructor(px: number, py: number) {

		super();
		this.x = px;
		this.y = py;
		this.graphics.lineStyle(2, 0xf1ebee);
		this.graphics.drawCircle(0, 0, this._controllerRadius);
		this.graphics.endFill();

		this._rockbar = new egret.Shape();
		this._rockbar.graphics.beginFill(0xf1ebee);
		this._rockbar.graphics.drawCircle(0, 0, this._rockbarRadius);
		this._rockbar.graphics.endFill();
		this._rockbar.touchEnabled = true;

		this.addChild(this._rockbar);

		this._restPoint = new egret.Point(this._rockbar.x, this._rockbar.y);
		this._rockbar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this, false, 2);
	}

	static get instance() {

		return this.ins || (this.ins = new RockBarController(200, 400));

	}

	//按下摇杆
	private touchBeginHandler(evt: egret.TouchEvent): void {

		if (this._startPoint == null)
			this._startPoint = new egret.Point();
		this._startPoint.x = evt.stageX;
		this._startPoint.y = evt.stageY;
		RockBarController.instance._controling = true;
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this, false, 2);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this, false, 2);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this, false, 2);

	}

	//摇杆移动
	private touchMoveHandler(evt: egret.TouchEvent): void {

		this._movePoint.x = evt.stageX;
		this._movePoint.y = evt.stageY;
		var dist: number = egret.Point.distance(this._startPoint, this._movePoint);
		if (dist <= this._controllerRadius)//没有超出范围
		{
			this._rockbar.x = this._restPoint.x + this._movePoint.x - this._startPoint.x;
			this._rockbar.y = this._restPoint.y + this._movePoint.y - this._startPoint.y;
		}
		else//超出范围了,计算弧度
		{
			var toPoint: egret.Point = egret.Point.interpolate(this._movePoint, this._startPoint, this._controllerRadius / dist);
			this._rockbar.x = toPoint.x - this.x;
			this._rockbar.y = toPoint.y - this.y;
		}
		//计算X和Y方向上的分速度倍数
		RockBarController.instance._multX = (this._movePoint.x - this._startPoint.x) / dist;//x分量
		RockBarController.instance._multY = (this._movePoint.y - this._startPoint.y) / dist;//y分量
		// RockBarController.instance._offset = dist / this._controllerRadius;//力度分量
		RockBarController.instance._offset = dist;//力度分量

	}

	//取消摇杆
	private cancelHandler(evt: egret.TouchEvent): void {

		RockBarController.instance._controling = false;
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
		egret.Tween.removeTweens(this._rockbar);
		egret.Tween.get(this._rockbar).to({ x: this._restPoint.x, y: this._restPoint.y }, 50, egret.Ease.backOut);
		RockBarController.instance._multX = 0;
		RockBarController.instance._multY = 0;
		RockBarController.instance._offset = 0;
		
	}
}