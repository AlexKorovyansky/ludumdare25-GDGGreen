
var StartScene = cc.Layer.extend({
	screenSize:null,
    _startscene:null,
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this.startscene = cc.Sprite.create("game/res/startscene.png");
        this.startscene.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.startscene.setVisible(true);
        this.startscene.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.startscene, 0);
        //  var helloLabel = cc.LabelTTF.create("Hello world", "Arial", 30);
        // helloLabel.setPosition(new cc.Point(s.width/2,s.height/2));
        // helloLabel.setColor(new cc.Color3B(255,0,0));
        // var rotationAmount = 0;
        // var scale = 1;

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