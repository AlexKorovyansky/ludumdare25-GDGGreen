
var GameLayer = cc.Layer.extend({
	screenSize:null,
    map:null,

	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this.background = cc.Sprite.create("game/res/back.png");
        this.background.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.background.setVisible(true);
        this.background.setAnchorPoint(cc.p(0.5, 0.5));
        this.background.setScale(1);
        this.background.setRotation(0);
        this.addChild(this.background, 0);

        // this.sprite = cc.Sprite.create("game/res/objects.png");
        // this.sprite.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        // this.sprite.setVisible(true);
        // this.sprite.setAnchorPoint(cc.p(0.5, 0.5));
        // this.sprite.setScale(0.5);
        // this.sprite.setRotation(180);
        // this.addChild(this.sprite, 0);

		return true;
	},


});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        layer.setAnchorPoint(cc.PointZero());
        layer.init();
        this.addChild(layer);
    }
});