
var GameLayer = cc.Layer.extend({
	screenSize:null,
    map:null,
    _pees:[],
    _state:0,
    _roomRect: cc.RectMake(37, 0, 726, 514),
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

        this.initPees();

        this.host = new Host();
        this.host.setPosition(cc.p(this.screenSize.width - 90, this.screenSize.height - 120));
        this.host.setAnchorPoint(cc.p(0.5, 0));
        this.addChild(this.host);

        this.cat = new Cat();
        this.cat.setPosition(cc.p(this.screenSize.width / 2 + 200, this.screenSize.height / 2 + 100));
        this.addChild(this.cat);

        this._pbar.scheduleUpdate();
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
            return;
        }
        var isWin = true;
        for (var i = 0, pees_length = this._pees.length; i < pees_length; i++) {
            var pee = this._pees[i]
              , catRect = cc.RectMake(parseFloat(cat.getPositionX()), parseFloat(cat.getPositionY()), catRectWidth, catRectHeight)
              , peeRectWidth = pee.getContentSize().width * pee.getScale() / 1.5
              , peeRectHeight = pee.getContentSize().height * pee.getScale() / 1.5
              , peeRect = cc.RectMake(parseFloat(pee.getPositionX()), parseFloat(pee.getPositionY()), peeRectWidth, peeRectHeight);

            if (cc.Rect.CCRectIntersectsRect(catRect, peeRect)) {
                // var tileIndx = cc.ArrayGetIndexOfObject(this._pees, pee);

                this._state = GAME;

                pee.decreaseHealth(dt);
                this.host.increaseAngryLevel();

                if (!pee.isDisabled()){
                    pee.setOpacity(190);
                    this._pbar.progress(dt);
                    isWin = false;
                }
            }
            else {
                pee.setOpacity(250);
                if (!pee.isDisabled()){
                    isWin = false;
                }
            }
        }
        if (isWin && this._state == GAME){
            this.winScreen();
            this._state = CALM;
        }
    },
    update:function(dt){
        if (this._state == CALM){
            return;
        }
        if (this._state == LOOSE){
            this._state = CALM;
            this.endScreen();
        }
        else {
            this.checkForAndResolveCollisions(dt);
            if (this.host.getAngryLevel() != 0){
                this.host.catchCat(this.cat, dt);
            }
        }
    },

    playMeow: function(){
        cc.AudioEngine.getInstance().playEffect(meow_effect);
    },

    endScreen:function(){
		var scene = cc.Scene.create();
        scene.addChild(FinalScene.create());
        this.playMeow();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    winScreen:function(){
        var scene = cc.Scene.create();
        scene.addChild(WinScene.create());
        this.playMeow();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    initPees:function(){
        this._pees = [];
        for(var i = 0; i < pee_config.length; i++){
            var pee_conf = pee_config[i];
            var pee = new Pee(pee_conf);
            this._pees.push(pee);
            this._pbar.addMaxProgress(pee_conf.level);
            this.addChild(pee);
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
