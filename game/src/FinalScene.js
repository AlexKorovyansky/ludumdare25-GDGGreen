
var FinalScene = cc.Layer.extend({
	screenSize:null,
    _finalscene:null,
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this._finalscene = cc.Sprite.create("game/res/FinalScene.png");
        this._finalscene.setPosition(cc.p(0, 0));
        this._finalscene.setVisible(true);
        this._finalscene.setAnchorPoint(cc.p(0, 0));
        this.addChild(this._finalscene, 0);
        var gameOverLabel = cc.LabelTTF.create("Game Over", "Chelsea Market", 76);
        gameOverLabel.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        gameOverLabel.setColor(new cc.Color3B(255,0,0));
        this._finalscene.addChild(gameOverLabel);

        this.setTouchEnabled(true);

		return true;
	},
    onTouchesEnded: function(ptouch, evt){
        this.onNewGame(this);
    },
    onNewGame:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

FinalScene.create = function () {
    var sg = new FinalScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};