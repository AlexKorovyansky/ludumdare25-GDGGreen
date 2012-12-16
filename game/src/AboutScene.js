
var AboutScene = cc.Layer.extend({
	screenSize:null,
    _aboutscene:null,
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this._aboutscene = cc.Sprite.create("game/res/about.png");
        this._aboutscene.setPosition(cc.p(0, 0));
        this._aboutscene.setVisible(true);
        this._aboutscene.setAnchorPoint(cc.p(0, 0));
        this.addChild(this._aboutscene, 0);

        var menuItem1 = new cc.MenuItemFont.create("Back", 'onMenu', this);

        menuItem1.setPosition(new cc.Point(this.screenSize.width / 2, 150));

        var menu = cc.Menu.create(menuItem1);
        menu.setPosition(new cc.Point(0,0));

        this.addChild(menu);

		return true;
	},
    onMenu:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(StartScene.create());
        cc.Director.getInstance().replaceScene(cc.TransitionSlideInL.create(1.0, scene));
    }
});

AboutScene.create = function () {
    var sg = new AboutScene();
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