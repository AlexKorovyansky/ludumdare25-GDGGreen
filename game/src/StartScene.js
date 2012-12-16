
var StartScene = cc.Layer.extend({
	screenSize:null,
    _startscene:null,
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this._startscene = cc.Sprite.create("game/res/start.png");
        this._startscene.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this._startscene.setVisible(true);
        this._startscene.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._startscene, 0);
        
        var gameOverLabel = cc.LabelTTF.create("Catvillain", "Chelsea Market", 76);
        gameOverLabel.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 1.8));
        gameOverLabel.setColor(new cc.Color3B(255,255,255));
        this._startscene.addChild(gameOverLabel);


        cc.AudioEngine.getInstance().setMusicVolume(1);
        cc.AudioEngine.getInstance().playMusic(background_music, true);

        cc.MenuItemFont.setFontName("Chelsea Market");

        var menuItem1 = new cc.MenuItemFont.create("Play", 'onNewGame', this);
        var menuItem2 = new cc.MenuItemFont.create("About", 'about', this);

        
        menuItem1.setPosition(new cc.Point(this.screenSize.width / 2, this.screenSize.height / 2.4));
        menuItem2.setPosition(new cc.Point(this.screenSize.width / 2, this.screenSize.height / 2.4 - 50));

        var menu = cc.Menu.create(menuItem1,menuItem2);
        menu.setPosition(new cc.Point(0,0));

        this.addChild(menu);

		return true;
	},
    onNewGame:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    about:function(pSender){
      var scene = cc.Scene.create();
      scene.addChild(AboutScene.create());
      cc.Director.getInstance().replaceScene(cc.TransitionSlideInR.create(1.0, scene));
    }
});

// StartScene.create = function () {
//     var sg = new StartScene();
//     if (sg && sg.init()) {
//         return sg;
//     }
//     return null;
// };

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartScene();
        layer.init();
        this.addChild(layer);
    }
});