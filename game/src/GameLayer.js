
var GameLayer = cc.Layer.extend({
	screenSize:null,
    map:null,
    _pees:[],
    _state:0,
    _roomRect: cc.RectMake(37, 0, 726, 494),
    _pbar:null,
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this.map = cc.Sprite.create("game/res/room.png");
        this.map.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.map.setVisible(true);
        this.map.setAnchorPoint(cc.p(0.5, 0.5));
        this.map.setScale(1);
        this.map.setRotation(0);
        this.addChild(this.map, 0);

        this.setTouchEnabled(true);

        this._pbar = new AngerBar();
        this.addChild(this._pbar);
        this._pbar.scheduleUpdate();

        this.initPees();

        this.host = new Host();
        this.host.setPosition(cc.p(this.screenSize.width - 90, this.screenSize.height - 60));
        this.host.setAnchorPoint(cc.p(0.5, 0));
        this.addChild(this.host);

        this.cat = new Cat();
        this.cat.setPosition(cc.p(this.screenSize.width / 2 + 200, this.screenSize.height / 2 + 100));
        this.addChild(this.cat);

        this.scheduleUpdate();
		return true;
	},
    onTouchesEnded: function(ptouch, evt){
		if (this._state == LOOSE){
            return;
        }
        var location = ptouch[0].getLocation();
        if(cc.Rect.CCRectContainsPoint(this._roomRect, location)){
            this.cat.handleTouch(location);
        }
    },
    checkForAndResolveCollisions:function(dt) {
        var cat = this.cat
          , host = this.host
          , catRectWidth = Math.round(cat.getContentSize().height * cat.getScale() / 2)
          , catRectHeight = Math.round(cat.getContentSize().height * cat.getScale() / 3)
          , hostRectWidth = Math.round(host.getContentSize().width * host.getScale() / 2)
          , hostRectHeight = Math.round(host.getContentSize().height * host.getScale() / 10)
          , catRect = cc.RectMake(parseFloat(cat.getPositionX()), parseFloat(cat.getPositionY()), catRectWidth, catRectHeight)
          , hostRect = cc.RectMake(parseFloat(host.getPositionX()), parseFloat(host.getPositionY() + hostRectHeight), hostRectWidth, hostRectHeight);
        // Check if cat is catched
        if (cc.Rect.CCRectIntersectsRect(catRect, hostRect)) {
            this._state = LOOSE;
            this.cat.stopAllActions();
            this.host.stopAllActions();
        }
        for (var i = 0, pees_length = this._pees.length; i < pees_length; i++) {
            var pee = this._pees[i]
              , catRect = cc.RectMake(parseFloat(cat.getPositionX()), parseFloat(cat.getPositionY()), catRectWidth, catRectHeight)
              , peeRectWidth = pee.getContentSize().width * pee.getScale() / 1.5
              , peeRectHeight = pee.getContentSize().height * pee.getScale() / 1.5
              , peeRect = cc.RectMake(parseFloat(pee.getPositionX()), parseFloat(pee.getPositionY()), peeRectWidth, peeRectHeight);

            if (cc.Rect.CCRectIntersectsRect(catRect, peeRect)) {
                var tileIndx = cc.ArrayGetIndexOfObject(this._pees, pee);

                pee.decreaseHealth(dt);
                this.host.increaseAngryLevel();

                if (!pee.isEnabled()){
                    pee.setOpacity(190);
                    this._pbar.progress(dt);
                }
            }
            else {
                pee.setOpacity(250);
            }
        }
    },
    update:function(dt){
        if (this._state == LOOSE){
            this.endScreen();
        }
        else {
            this.checkForAndResolveCollisions(dt);
            if (this.host.getAngryLevel() != 0){
                this.host.catchCat(this.cat, dt);
            }
        }
    },
    endScreen:function(){
		var scene = cc.Scene.create();
        scene.addChild(FinalScene.create());
        // scene.addChild(GameControlMenu.create());
        cc.AudioEngine.getInstance().playEffect(meow_effect, true);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));

    },
    initPees:function(){
        for(var i = 0; i < pee_config.length; i++){
            var pee_conf = pee_config[i];
            var pee = new Pee(pee_conf);
            this.addChild(pee);
            this._pees.push(pee);
            this._pbar.addMaxProgress(pee_conf.level);
        }
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
