
var GameLayer = cc.Layer.extend({
	screenSize:null,
    map:null,
    _pees:[],
    _state:0,
    _roomRect: cc.RectMake(37, 0, 726, 494),
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this.map = cc.Sprite.create("game/res/room.png");
        this.map.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        // this.map.setVisible(true);
        this.map.setAnchorPoint(cc.p(0.5, 0.5));
        this.map.setScale(1);
        this.map.setRotation(0);
        this.addChild(this.map, 0);

        this.setTouchEnabled(true);

        this.host = new Host();
        this.host.setPosition(cc.p(this.screenSize.width - 90, this.screenSize.height - 60));
        this.addChild(this.host);

        this.pee = new Pee('game/res/box.png', 'game/res/host_man.png');
        this.pee.setPosition(cc.p(this.screenSize.width / 3, this.screenSize.height / 3));
        this.addChild(this.pee);
        this._pees.push(this.pee);

        this.cat = new Cat();
        this.cat.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.addChild(this.cat);

        this.scheduleUpdate();
		return true;
	},
    onTouchesEnded: function(ptouch, evt){
        var location = ptouch[0].getLocation();
        if(cc.Rect.CCRectContainsPoint(this._roomRect, location)){
            this.cat.handleTouch(location);
        }
    },
    checkForAndResolveCollisions:function(cat) {
        var cat = this.cat
          , host = this.host
          , catRect = cc.RectMake(parseFloat(cat.getPositionX()), parseFloat(cat.getPositionY()), cat.getContentSize().width * cat.getScale(), cat.getContentSize().height * cat.getScale())
          , hostRect = cc.RectMake(parseFloat(host.getPositionX()), parseFloat(host.getPositionY()), host.getContentSize().width * host.getScale(), host.getContentSize().height * host.getScale());
        console.log(catRect);
        console.log(hostRect);
        if (cc.Rect.CCRectIntersectsRect(catRect, hostRect)) {
            this._state = LOOSE;
        }
        for (var i = 0, pees_length = this._pees.length; i < pees_length; i++) {
            var pee = this._pees[i];    
            var catRect = cc.RectMake(parseFloat(cat.getPositionX()), parseFloat(cat.getPositionY()), cat.getContentSize().width * cat.getScale(), cat.getContentSize().height * cat.getScale());

            var peeRect = cc.RectMake(parseFloat(pee.getPositionX()), parseFloat(pee.getPositionY()), pee.getContentSize().width * pee.getScale(), pee.getContentSize().height * pee.getScale());

            if (cc.Rect.CCRectIntersectsRect(catRect, peeRect)) {
                // var intersection = cc.Rect.CCRectIntersection(catRect, peeRect);
                var tileIndx = cc.ArrayGetIndexOfObject(this._pees, pee);

                this.pee.setState(true);
                this.host.increaseAngryLevel();
            }
            else {
                this.pee.setState(false);   
            }
        }
    },
    update:function(dt){
        if (this._state == LOOSE){
            this.endScreen();
        }
        else {
            this.checkForAndResolveCollisions(this.cat);
            if (this.host.getAngryLevel() != 0){
                this.host.catchCat(this.cat, dt);
            }
        }
    },
    endScreen:function(){

    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
