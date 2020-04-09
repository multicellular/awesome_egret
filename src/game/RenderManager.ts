// class RenderConfig {

//     public static width = 10000;
//     public static height = 10000;

// }

interface IRender {

    // ENTER_FRAME 帧渲染
    update();

}

class RenderManager {

    private static singleton: RenderManager;
    private renderList: Array<IRender>;

    constructor() {

        this.renderList = [];

    }
    static get instance() {

        return this.singleton || (this.singleton = new RenderManager());

    }
    startRender(stage) {

        stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);

    }
    enterFrameHandler() {

        dragonBones.WorldClock.clock.advanceTime(-1);
        let render: IRender;
        for (render of this.renderList) {
            render.update();
        }

    }

    addRender(render: IRender) {

        this.renderList.push(render);

    }

    removeRender(render: IRender) {

        const idx = this.renderList.indexOf(render);
        if (idx > 0) {
            this.renderList.splice(idx, 1);
        }
        
    }
}

