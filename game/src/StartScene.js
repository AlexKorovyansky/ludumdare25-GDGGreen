
var StartScene = cc.Layer.extend({
	screenSize:null,
    _startscene:null,
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this._startscene = cc.Sprite.create("game/res/start.png");
        this._startscene.setPosition(cc.p(0, 0));
        this._startscene.setVisible(true);
        this._startscene.setAnchorPoint(cc.p(0, 0));
        this.addChild(this._startscene, 0);
        
        var gameOverLabel = cc.LabelTTF.create("Catvillain", "Chelsea Market", 76);
        gameOverLabel.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        gameOverLabel.setColor(new cc.Color3B(255,255,255));
        this._startscene.addChild(gameOverLabel);

        this.setTouchEnabled(true);

		return true;
	},
    onTouchesEnded: function(ptouch, evt){
        this.onNewGame(this);
    },
    onNewGame:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        // scene.addChild(GameControlMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

StartScene.create = function () {
    var sg = new StartScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartScene();
        layer.setAnchorPoint(cc.PointZero());
        layer.init();
        this.addChild(layer);
    }
});