
var GameLayer = cc.Layer.extend({
	screenSize:null,
    map:null,
    anger:0,
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this.map = cc.Sprite.create(image_game_background);
        this.map.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.map.setVisible(true);
        this.map.setAnchorPoint(cc.p(0.5, 0.5));
        this.map.setScale(1);
        this.map.setRotation(0);
        this.addChild(this.map, 0);

        this.setTouchEnabled(true);

        this.cat = new Cat();
        this.cat.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.addChild(this.cat);

        this.host = new Host();
        this.host.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.addChild(this.host);

        this.pee = new Pee('game/res/back.png', 'game/res/host_man.png');
        this.pee.setPosition(cc.p(this.screenSize.width / 3, this.screenSize.height / 3));
        this.addChild(this.pee);
        // this.sprite = cc.Sprite.create("game/res/objects.png");
        // this.sprite.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        // this.sprite.setVisible(true);
        // this.sprite.setAnchorPoint(cc.p(0.5, 0.5));
        // this.sprite.setScale(0.5);
        // this.sprite.setRotation(180);
        // this.addChild(this.sprite, 0);

		return true;
	},
    onTouchesEnded: function(ptouch, evt){
        var location = ptouch[0].getLocation();

        this.cat.handleTouch(location);
        this.pee.handleTouch(location);
    }
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