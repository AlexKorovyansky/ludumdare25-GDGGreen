
var GameLayer = cc.Layer.extend({
	screenSize:null,
    _startscene,
    map:null,
    anger:0,
    _pees:[],
	init:function () {
		this._super();

		this.screenSize = cc.Director.getInstance().getWinSize();

        this.startscene = cc.Sprite.create("game/res/back.png");
        this.startscene.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.startscene.setVisible(true);
        this.startscene.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this.startscene, 0);
         var helloLabel = cc.LabelTTF.create("Hello world", "Arial", 30);
        helloLabel.setPosition(new cc.Point(s.width/2,s.height/2));
        helloLabel.setColor(new cc.Color3B(255,0,0));
        var rotationAmount = 0;
        var scale = 1;

        this.setTouchEnabled(true);

        this.host = new Host();
        this.host.setPosition(cc.p(this.screenSize.width / 2, this.screenSize.height / 2));
        this.addChild(this.host);

        this.pee = new Pee('game/res/back.png', 'game/res/host_man.png');
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

        this.cat.handleTouch(location);
    },
    checkForAndResolveCollisions:function(cat) {
        var position = cat.getPosition();

        for (var i = 0, pees_length = this._pees.length; i < pees_length; i++) {
            var pee = this._pees[i];
            var cat = this.cat;
            var catRect = cc.RectMake(parseFloat(cat.getPositionX()), parseFloat(cat.getPositionY()), cat.getContentSize().width, cat.getContentSize().height);

            var peeRect = cc.RectMake(parseFloat(pee.getPositionX()), parseFloat(pee.getPositionY()), pee.getContentSize().width, pee.getContentSize().height);

            if (cc.Rect.CCRectIntersectsRect(catRect, peeRect)) {
                // var intersection = cc.Rect.CCRectIntersection(catRect, peeRect);
                var tileIndx = cc.ArrayGetIndexOfObject(this._pees, pee);

                this.pee.setState(true);
            }
            else {
                this.pee.setState(false);   
            }
        }
    },
    update:function(dt){
        this.checkForAndResolveCollisions(this.cat)
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