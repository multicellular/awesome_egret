var __reflect=this&&this.__reflect||function(t,e,r){t.__class__=e,r?r.push(e):r=[e],t.__types__=t.__types__?r.concat(t.__types__):r},__extends=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a]);r.prototype=e.prototype,t.prototype=new r},__awaiter=this&&this.__awaiter||function(t,e,r,a){return new(r||(r=Promise))(function(n,i){function o(t){try{l(a.next(t))}catch(e){i(e)}}function s(t){try{l(a["throw"](t))}catch(e){i(e)}}function l(t){t.done?n(t.value):new r(function(e){e(t.value)}).then(o,s)}l((a=a.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function r(t){return function(e){return a([t,e])}}function a(r){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,i&&(o=i[2&r[0]?"return":r[0]?"throw":"next"])&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[0,o.value]),r[0]){case 0:case 1:o=r;break;case 4:return l.label++,{value:r[1],done:!1};case 5:l.label++,i=r[1],r=[0];continue;case 7:r=l.ops.pop(),l.trys.pop();continue;default:if(o=l.trys,!(o=o.length>0&&o[o.length-1])&&(6===r[0]||2===r[0])){l=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){l.label=r[1];break}if(6===r[0]&&l.label<o[1]){l.label=o[1],o=r;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(r);break}o[2]&&l.ops.pop(),l.trys.pop();continue}r=e.call(t,l)}catch(a){r=[6,a],i=0}finally{n=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var n,i,o,s,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:r(0),"throw":r(1),"return":r(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(t){egret.lifecycle.addLifecycleListener(function(t){t.onUpdate=function(){}}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()},this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){return t=RES.getRes("/Scene.e3dPack"),this.addChild(t),[2]})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return r.sent(),[4,RES.loadGroup("preload",0,t)];case 2:return r.sent(),this.stage.removeChild(t),[3,4];case 3:return e=r.sent(),console.error(e),[3,4];case 4:return[2]}})})},e.prototype.createGameScene=function(){var t=this.createBitmapByName("bg_jpg");this.addChild(t);var e=this.stage.stageWidth,r=this.stage.stageHeight;t.width=e,t.height=r;var a=new egret.Shape;a.graphics.beginFill(0,.5),a.graphics.drawRect(0,0,e,172),a.graphics.endFill(),a.y=33,this.addChild(a);var n=this.createBitmapByName("egret_icon_png");this.addChild(n),n.x=26,n.y=33;var i=new egret.Shape;i.graphics.lineStyle(2,16777215),i.graphics.moveTo(0,0),i.graphics.lineTo(0,117),i.graphics.endFill(),i.x=172,i.y=61,this.addChild(i);var o=new egret.TextField;o.textColor=16777215,o.width=e-172,o.textAlign="center",o.text="Hello Egret",o.size=24,o.x=172,o.y=80,this.addChild(o);var s=new egret.TextField;this.addChild(s),s.alpha=0,s.width=e-172,s.textAlign=egret.HorizontalAlign.CENTER,s.size=24,s.textColor=16777215,s.x=172,s.y=135,this.textfield=s},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,r=RES.getRes(t);return e.texture=r,e},e.prototype.startAnimation=function(t){var e=this,r=new egret.HtmlTextParser,a=t.map(function(t){return r.parse(t)}),n=this.textfield,i=-1,o=function(){i++,i>=a.length&&(i=0);var t=a[i];n.textFlow=t;var r=egret.Tween.get(n);r.to({alpha:1},200),r.wait(2e3),r.to({alpha:0},200),r.call(o,e)};o()},e}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var RenderManager=function(){function t(){this.renderList=[]}return Object.defineProperty(t,"instance",{get:function(){return this.singleton||(this.singleton=new t)},enumerable:!0,configurable:!0}),t.prototype.startRender=function(t){t.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this)},t.prototype.enterFrameHandler=function(){dragonBones.WorldClock.clock.advanceTime(-1);for(var t,e=0,r=this.renderList;e<r.length;e++)t=r[e],t.update()},t.prototype.addRender=function(t){this.renderList.push(t)},t.prototype.removeRender=function(t){var e=this.renderList.indexOf(t);e>0&&this.renderList.splice(e,1)},t}();__reflect(RenderManager.prototype,"RenderManager");var WorldMap=function(t){function e(){var e=t.call(this)||this;return e.plants=[],e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),Object.defineProperty(e,"instance",{get:function(){return e._ins||(this._ins=new e)},enumerable:!0,configurable:!0}),e.prototype.onAddToStage=function(){this.initMap()},e.prototype.initMap=function(){var t=this,e=new LoadingUI;this.stage.addChild(e),RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,function(){RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,function(){t.addMap(),t.addToRender(),t.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,t.createCamera,t),t.stage.removeChild(e)},t),RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,function(){},t),RES.loadGroup("preload",0,e)},this),RES.loadConfig("resource/default.res.json","resource")},e.prototype.addMap=function(){var t=new egret.Bitmap(RES.getRes("game_jpg"));t.fillMode=egret.BitmapFillMode.SCALE,t.width=e.worldWidth,t.height=e.worldHeight,this.addChildAt(t,0),this.addPlants();var r=new MiniMap;this.stage.addChild(r),r.x=this.stage.stageWidth-r._width,this._player=new Player(556,2621),this._player.addToMiniMap(),Camera.focus=this._player,this.addChild(this._player),this._otherPlayer=new OtherPlayer(556,2621),this.addChild(this._otherPlayer)},e.prototype.addPlants=function(){this.addPlant(917,2427),this.addPlant(1316,2681),this.addPlant(1706,1995),this.addPlant(1530,2533),this.addPlant(720,2088),this.addPlant(1324,2254),this.addPlant(2010,1746)},e.prototype.addPlant=function(t,e){var r=new Plant(t,e);this.addChild(r),this.plants.push(r)},e.prototype.update=function(){var t=Camera.focus,r=-t.x+this.stage.stageWidth/2,a=-t.y+this.stage.stageHeight/2;r>0?r=0:r<-e.worldWidth+this.stage.stageWidth&&(r=-e.worldWidth+this.stage.stageWidth),a>0?a=0:a<-e.worldHeight+this.stage.stageHeight&&(a=-e.worldHeight+this.stage.stageHeight),this.x=r,this.y=a},e.prototype.addToRender=function(){RenderManager.instance.addRender(this)},e.prototype.createCamera=function(t){RockBarController.instance._controling||(this._startPoint=new egret.Point(t.stageX,t.stageY),this._camera=new Camera(this._player.x,this._player.y),this._camera.addFocus(),this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveCamera,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.cancelCamera,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.cancelCamera,this))},e.prototype.moveCamera=function(t){var e=this._player.x+4*(t.stageX-this._startPoint.x),r=this._player.y+3*(t.stageY-this._startPoint.y);this._camera.moveTo(e,r)},e.prototype.cancelCamera=function(){this._player.addFocus(),this._camera=null,this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveCamera,this),this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.cancelCamera,this),this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.cancelCamera,this)},e.worldWidth=5e3,e.worldHeight=3e3,e}(egret.DisplayObjectContainer);__reflect(WorldMap.prototype,"WorldMap",["IRender"]);var MiniMap=function(t){function e(){var e=t.call(this)||this;e._width=300,e._height=180,e._roles=[],e._shapes=[],e.sclX=e._width/WorldMap.worldWidth,e.sclY=e._height/WorldMap.worldHeight;var r=new egret.RenderTexture;r.drawToTexture(WorldMap.instance);var a=new egret.Texture;return a.bitmapData=r.bitmapData,e._map=new egret.Bitmap(a),e.width=e._width,e.height=e._height,e._map.scaleX=e.sclX,e._map.scaleY=e.sclY,e.addChild(e._map),e.addToRender(),e.touchEnabled=!0,e.addEventListener(egret.TouchEvent.TOUCH_BEGIN,e.createCamera,e),e}return __extends(e,t),Object.defineProperty(e,"instance",{get:function(){return e._ins||(this._ins=new e)},enumerable:!0,configurable:!0}),e.prototype.update=function(){for(var t=e.instance._roles.length,r=0;t>r;r++){var a=e.instance._roles[r].x*this.sclX,n=e.instance._roles[r].y*this.scaleY;e.instance._shapes[r].x=a,e.instance._shapes[r].y=n}},e.prototype.addToRender=function(){RenderManager.instance.addRender(this)},e.prototype.addRole=function(t){e.instance._roles.push(t);var r=new egret.Shape;r.graphics.beginFill(178397730),r.graphics.drawCircle(0,0,5),r.graphics.endFill(),e.instance._shapes.push(r),r.x=t.x*this.sclX,r.y=t.y*this.scaleY,e.instance.addChild(r)},e.prototype.removeRole=function(t){var r=e.instance._roles.indexOf(t);r>-1&&(e.instance._roles.splice(r,1),e.instance._shapes.splice(r,1))},e.prototype.createCamera=function(t){var e=(t.stageX-this.x)/this.sclX,r=(t.stageY-this.y)/this.sclY;t.stopPropagation(),this._camera=new Camera(e,r),this._camera.addFocus(),this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveCamera,this),this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.cancelCamera,this),this.addEventListener(egret.TouchEvent.TOUCH_END,this.cancelCamera,this),this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.cancelCamera,this)},e.prototype.moveCamera=function(t){var e=(t.stageX-this.x)/this.sclX,r=(t.stageY-this.y)/this.sclY;t.stopPropagation(),this._camera.moveTo(e,r)},e.prototype.cancelCamera=function(t){t.stopPropagation(),WorldMap.instance._player.addFocus(),this._camera=null,this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveCamera,this),this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.cancelCamera,this),this.removeEventListener(egret.TouchEvent.TOUCH_END,this.cancelCamera,this),this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.cancelCamera,this)},e}(egret.DisplayObjectContainer);__reflect(MiniMap.prototype,"MiniMap",["IRender"]);var Animal=function(){function t(){}return t}();__reflect(Animal.prototype,"Animal");var Plant=function(t){function e(e,r){var a=t.call(this)||this;return a.level=1,a.x=e,a.y=r,a.graphics.beginFill(65330),a.graphics.drawArc(50,50,50,0,Math.PI,!0),a.graphics.beginFill(12280076),a.graphics.drawRect(25,50,50,100),a.graphics.endFill(),a}return __extends(e,t),e}(egret.Shape);__reflect(Plant.prototype,"Plant");var Nature=function(){function t(){}return t}();__reflect(Nature.prototype,"Nature");var Camera=function(t){function e(e,r){var a=t.call(this)||this;return a.x=e,a.y=r,a._startPoint=new egret.Point(e,r),a}return __extends(e,t),e.prototype.moveTo=function(t,e){this._movePoint=new egret.Point(t,e),this.x=t,this.y=e},e.prototype.addFocus=function(){e._focus=this},Object.defineProperty(e,"focus",{get:function(){return e._focus||new e(0,0)},set:function(t){e._focus=t},enumerable:!0,configurable:!0}),e}(egret.DisplayObjectContainer);__reflect(Camera.prototype,"Camera");var Player=function(t){function e(e,r){var a=t.call(this)||this;a.speedX=8,a.speedY=6,a.x=e,a.y=r,a._factory=new dragonBones.EgretFactory,a._factory.parseDragonBonesData(RES.getRes("SwordsMan_ske_json")),a._factory.parseTextureAtlasData(RES.getRes("SwordsMan_tex_json"),RES.getRes("SwordsMan_tex_png")),a._armature=a._factory.buildArmature("Swordsman");var n=a._armature.display;return n.scaleX=n.scaleY=.1,a.addChild(n),dragonBones.WorldClock.clock.add(a._armature),a.addToRender(),a.addToController(),a}return __extends(e,t),e.prototype._frameEventHandler=function(t){if(this._isAttacking&&"onFire"==t.eventObject.name){var r=t.eventObject.armature.getBone("firePoint");t.eventObject.armature.display.localToGlobal(r.global.x,r.global.y,e._globalPoint),new Bullet("bullet_01","fireEffect_01",40,e._globalPoint,this)}},e.prototype.update=function(){this.linkRockBar(),this.linkController()},e.prototype.addToRender=function(){RenderManager.instance.addRender(this)},e.prototype.removeToRender=function(){RenderManager.instance.removeRender(this)},e.prototype.addToController=function(){BarControllerLayer.instance.setCotrolObject(this)},e.prototype.addToMiniMap=function(){MiniMap.instance.addRole(this)},e.prototype.removeToMiniMap=function(){MiniMap.instance.removeRole(this)},e.prototype.addFocus=function(){Camera._focus=this},e.prototype.checkHit=function(t,e,r){for(var a,n=!1,i=new egret.Rectangle(t,e,r.width,r.height),o=WorldMap.instance.plants,s=0,l=o;s<l.length;s++){var c=l[s];if(a=new egret.Rectangle(c.x,c.y,c.width,c.height),a.intersects(i)){n=!0;break}}return n},e.prototype.linkController=function(){this._isAttacking=!1;var t=BarControllerLayer.instance.controlTap;t==BarControllerLayer.TAP_ATTACK?(console.log("attack"),this._isAttacking=!0,"attack1"!=this._armature.animation.lastAnimationName&&this._armature.animation.gotoAndPlay("attack1")):t==BarControllerLayer.TAP_SKILL_1?"attack2"!=this._armature.animation.lastAnimationName&&this._armature.animation.gotoAndPlay("attack2"):t==BarControllerLayer.TAP_SKILL_2?"attack1_+1"!=this._armature.animation.lastAnimationName&&this._armature.animation.gotoAndPlay("attack1_+1"):t==BarControllerLayer.TAP_SKILL_3?"jump"!=this._armature.animation.lastAnimationName&&this._armature.animation.gotoAndPlay("jump"):t==BarControllerLayer.TAP_SKILL_4},e.prototype.handleController=function(t){var e=this;this.isAnimation=!0,setTimeout(function(){return e.isAnimation=!1},1e3),t==BarControllerLayer.TAP_ATTACK?(this._isAttacking=!0,"attack1"!=this._armature.animation.lastAnimationName&&this._armature.animation.fadeIn("attack1",1)):t==BarControllerLayer.TAP_SKILL_1?("attack2"!=this._armature.animation.lastAnimationName&&this._armature.animation.fadeIn("attack2"),this.x+=40):t==BarControllerLayer.TAP_SKILL_2?"attack1_+1"!=this._armature.animation.lastAnimationName&&this._armature.animation.fadeIn("attack1_+1"):t==BarControllerLayer.TAP_SKILL_3?"jump"!=this._armature.animation.lastAnimationName&&this._armature.animation.fadeIn("jump"):t==BarControllerLayer.TAP_SKILL_4},e.prototype.linkRockBar=function(){if(0==RockBarController.instance._offset)return void(this.isAnimation||"steady2"==this._armature.animation.lastAnimationName||this._armature.animation.fadeIn("steady2"));"walk2"!=this._armature.animation.lastAnimationName&&this._armature.animation.fadeIn("walk2");var t=this.x+RockBarController.instance._multX*this.speedX,e=this.y+RockBarController.instance._multY*this.speedY;RockBarController.instance._multX>0?this._armature.flipX=!1:RockBarController.instance._multX<0&&(this._armature.flipX=!0),RockBarController.instance._multY>0||RockBarController.instance._multY<0,0>t?t=0:t>WorldMap.worldWidth-this.width&&(t=WorldMap.worldWidth-this.width),e<this.height?e=this.height:e>WorldMap.worldHeight-this.height&&(e=WorldMap.worldHeight-this.height);var r=this.checkHit(t,e,this);r||(this.x=t,this.y=e)},e.prototype.attack=function(){for(var t=WorldMap.instance.plants,e=!1,r=0,a=t;r<a.length;r++){var n=a[r];if(this._armature.getSlot("dao").containsPoint(n.x,n.y)){e=!0;break}}},e._globalPoint=new egret.Point,e}(egret.DisplayObjectContainer);__reflect(Player.prototype,"Player",["IRender"]);var OtherPlayer=function(t){function e(e,r){var a=t.call(this)||this;a.x=e,a.y=r,a._factory=new dragonBones.EgretFactory,a._factory.parseDragonBonesData(RES.getRes("Robot_json")),a._factory.parseTextureAtlasData(RES.getRes("Robot_texture_json"),RES.getRes("Robot_texture_png")),a._armature=a._factory.buildArmature("mecha_1502b");var n=a._armature.display;return n.scaleX=n.scaleY=.3,a.addChild(n),dragonBones.WorldClock.clock.add(a._armature),a.addToRender(),a}return __extends(e,t),e.prototype.addToRender=function(){RenderManager.instance.addRender(this)},e.prototype.removeToRender=function(){RenderManager.instance.removeRender(this)},e.prototype.addToMiniMap=function(){MiniMap.instance.addRole(this)},e.prototype.removeToMiniMap=function(){MiniMap.instance.removeRole(this)},e.prototype.update=function(){"walk"!=this._armature.animation.lastAnimationName&&this._armature.animation.gotoAndPlay("walk"),this.x+=5,this.y+=1,this.x>1e3&&(this.x=500),this.y>3e3&&(this.y=2100)},e}(egret.DisplayObjectContainer);__reflect(OtherPlayer.prototype,"OtherPlayer",["IRender"]);var Bullet=function(t){function e(e,r,a,n,i){var o=t.call(this)||this;if(o._speedX=0,o._speedY=0,o._armature=null,o._armatureDisplay=null,o._effect=null,o._speedX=.4*a,o._speedY=.6*a,o._player=i,o._armature=i._factory.buildArmature(e),o._armatureDisplay=o._armature.display,o._armatureDisplay.x=n.x,o._armatureDisplay.y=n.y,o._armature.animation.play("idle"),r){o._effect=i._factory.buildArmature(r);var s=o._effect.display;s.x=n.x,s.y=n.y,s.scaleX=1+1*Math.random(),s.scaleY=1+.5*Math.random(),Math.random()<.5&&(s.scaleY*=-1),o._effect.animation.play("idle"),dragonBones.WorldClock.clock.add(o._effect),o._player.addChild(s)}return dragonBones.WorldClock.clock.add(o._armature),o._player.addChild(o._armatureDisplay),o.addToRender(),o}return __extends(e,t),e.prototype.update=function(){return this._armatureDisplay.x+=this._speedX,this._armatureDisplay.x<-100||this._armatureDisplay.x>=this._player.stage.stageWidth+100||this._armatureDisplay.y<-100||this._armatureDisplay.y>=this._player.stage.stageHeight+100?(this.removeToRender(),dragonBones.WorldClock.clock.remove(this._armature),this._player.removeChild(this._armatureDisplay),this._armature.dispose(),this._effect&&(dragonBones.WorldClock.clock.remove(this._effect),this._player.removeChild(this._effect.display),this._effect.dispose()),!0):!1},e.prototype.addToRender=function(){RenderManager.instance.addRender(this)},e.prototype.removeToRender=function(){RenderManager.instance.removeRender(this)},e}(egret.DisplayObject);__reflect(Bullet.prototype,"Bullet",["IRender"]);var BarControllerLayer=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(egret.Event.ADDED_TO_STAGE,e.initLayer,e),e}return __extends(e,t),Object.defineProperty(e,"instance",{get:function(){return this.ins||(this.ins=new e)},enumerable:!0,configurable:!0}),e.prototype.initLayer=function(){this.addChild(new RockBarController(125,this.stage.stageHeight-125)),this.initSkillBars()},e.prototype.setCotrolObject=function(t){this.controlPlayer=t},e.prototype.drawAttackBar=function(){var t=this,r=this.drawCircleBar(0,0,45),a=function(){r.scaleX=r.scaleY=1,e.instance.controlTap="none"};return r.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(a){r.scaleX=r.scaleY=1.1,e.instance.controlTap="attack",t.controlPlayer.handleController("attack"),a.stopPropagation()},this),r.addEventListener(egret.TouchEvent.TOUCH_CANCEL,a,this),r.addEventListener(egret.TouchEvent.TOUCH_END,a,this),r.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,a,this),r},e.prototype.initSkillBars=function(){var t=this,r=new egret.DisplayObjectContainer;r.x=this.stage.stageWidth-100,r.y=this.stage.stageHeight-100;var a=this.drawAttackBar();r.addChild(a);for(var n=function(t){t.scaleX=t.scaleY=1,e.instance.controlTap="none"},i=function(a){var i=o.drawCircleBar(0,0,35);0==a?(i.x=-120,i.y=0):1==a?(i.x=-85,i.y=-85):2==a&&(i.x=0,i.y=-120),r.addChild(i),i.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(r){i.scaleX=i.scaleY=1.1,e.instance.controlTap="skill"+(a+1),t.controlPlayer.handleController("skill"+(a+1)),r.stopPropagation()},o),i.addEventListener(egret.TouchEvent.TOUCH_CANCEL,function(){n(i)},o),i.addEventListener(egret.TouchEvent.TOUCH_END,function(){n(i)},o),i.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,function(){n(i)},o)},o=this,s=0;3>s;s++)i(s);this.addChild(r)},e.prototype.drawCircleBar=function(t,e,r){var a=new egret.Shape;return a.graphics.beginFill(15854574),a.graphics.drawCircle(t,e,r),a.graphics.endFill(),a.touchEnabled=!0,a},e.TAP_ATTACK="attack",e.TAP_SKILL_1="skill1",e.TAP_SKILL_2="skill2",e.TAP_SKILL_3="skill3",e.TAP_SKILL_4="skill4",e}(egret.DisplayObjectContainer);__reflect(BarControllerLayer.prototype,"BarControllerLayer");var RockBarController=function(t){function e(e,r){var a=t.call(this)||this;return a._multX=0,a._multY=0,a._offset=0,a._controling=!1,a._rockbarRadius=30,a._controllerRadius=70,a._movePoint=new egret.Point,a.x=e,a.y=r,a.graphics.lineStyle(2,15854574),a.graphics.drawCircle(0,0,a._controllerRadius),a.graphics.endFill(),a._rockbar=new egret.Shape,a._rockbar.graphics.beginFill(15854574),a._rockbar.graphics.drawCircle(0,0,a._rockbarRadius),a._rockbar.graphics.endFill(),a._rockbar.touchEnabled=!0,a.addChild(a._rockbar),a._restPoint=new egret.Point(a._rockbar.x,a._rockbar.y),a._rockbar.addEventListener(egret.TouchEvent.TOUCH_BEGIN,a.touchBeginHandler,a,!1,2),a}return __extends(e,t),Object.defineProperty(e,"instance",{get:function(){return this.ins||(this.ins=new e(200,400))},enumerable:!0,configurable:!0}),e.prototype.touchBeginHandler=function(t){null==this._startPoint&&(this._startPoint=new egret.Point),this._startPoint.x=t.stageX,this._startPoint.y=t.stageY,e.instance._controling=!0,this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMoveHandler,this,!1,2),this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.cancelHandler,this,!1,2),this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.cancelHandler,this,!1,2)},e.prototype.touchMoveHandler=function(t){this._movePoint.x=t.stageX,this._movePoint.y=t.stageY;var r=egret.Point.distance(this._startPoint,this._movePoint);if(r<=this._controllerRadius)this._rockbar.x=this._restPoint.x+this._movePoint.x-this._startPoint.x,this._rockbar.y=this._restPoint.y+this._movePoint.y-this._startPoint.y;else{var a=egret.Point.interpolate(this._movePoint,this._startPoint,this._controllerRadius/r);this._rockbar.x=a.x-this.x,this._rockbar.y=a.y-this.y}e.instance._multX=(this._movePoint.x-this._startPoint.x)/r,e.instance._multY=(this._movePoint.y-this._startPoint.y)/r,e.instance._offset=r},e.prototype.cancelHandler=function(t){e.instance._controling=!1,this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMoveHandler,this),this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.cancelHandler,this),this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.cancelHandler,this),egret.Tween.removeTweens(this._rockbar),egret.Tween.get(this._rockbar).to({x:this._restPoint.x,y:this._restPoint.y},50,egret.Ease.backOut),e.instance._multX=0,e.instance._multY=0,e.instance._offset=0},e}(egret.Sprite);__reflect(RockBarController.prototype,"RockBarController");