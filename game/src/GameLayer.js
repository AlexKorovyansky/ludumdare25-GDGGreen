
var GameLayer = cc.Layer.extend({
	screenSize:null,
    map:null,

	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this.map = cc.Sprite.create("game/res/bg.png");
        this.map.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.map.setVisible(true);
        this.map.setAnchorPoint(cc.p(0.5, 0.5));
        this.map.setScale(1);
        this.map.setRotation(0);
        this.addChild(this.map, 0);

        this.setTouchEnabled(true);
        // this.setKeyboardEnabled(true);

        this.cat = new Cat();
        this.cat.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.addChild(this.cat);

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
        this.cat.stopAllActions();

        var location = ptouch[0].getLocation()
          , cat      = this.cat
          , distance = Math.sqrt( Math.pow(cat.getPositionX() - location.x, 2) + Math.pow(cat.getPositionY() - location.y, 2) )
          , move     = cc.MoveTo.create(distance / 300, location )

        
        // this.cat.setPosition(location);
        // cc.MoveTo.create(duration, position)

        this.cat.runAction(move)
    },
    onMouseDown: function(evt){
        this.cat.setPosition(cc.p(evt.x, evt.y));
    },
    onMouseMoved: function(evt){
        console.log("move")
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