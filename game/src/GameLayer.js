
var GameLayer = cc.Layer.extend({
	screenSize:null,
    map:null,
    anger:0,
    _pees:[],
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

		return true;
	},
    onTouchesEnded: function(ptouch, evt){
        var location = ptouch[0].getLocation();

        this.cat.handleTouch(location);
    },
    checkForAndResolveCollisions:function (cat) {
        var position = cat.getPosition()

        for (var i = 0, pees_length = this._pees.length; i < pees_length; i++) {
            var pee = this._pees[i];
            var catRect = cat.collisionBoundingBox();

            var peeRect = cc.RectMake(parseFloat(pee["x"]), parseFloat(pee["y"]), this.map.getTileSize().width, this.map.getTileSize().height);

                if (cc.rectIntersectsRect(pRect, tileRect)) {
                    var intersection = cc.rectIntersection(pRect, tileRect);
                    var tileIndx = cc.ArrayGetIndexOfObject(tiles, dic);

                    if (tileIndx == 0) {
                        //tile is directly below player
                        p.desiredPosition = cc.PointMake(p.desiredPosition.x, p.desiredPosition.y + intersection.size.height);
                        p.velocity = cc.PointMake(p.velocity.x, 0.0);
                        p.onGround = true;
                    } 
                    else if (tileIndx == 1) {
                        //tile is directly above player
                        p.desiredPosition = cc.PointMake(p.desiredPosition.x, p.desiredPosition.y - intersection.size.height);
                        p.velocity = cc.PointMake(p.velocity.x, 0.0);
                    } 
                    else if (tileIndx == 2) {
                        //tile is left of player
                        p.desiredPosition = cc.PointMake(p.desiredPosition.x + intersection.size.width, p.desiredPosition.y);
                    } 
                    else if (tileIndx == 3) {
                        //tile is right of player
                        p.desiredPosition = cc.PointMake(p.desiredPosition.x - intersection.size.width, p.desiredPosition.y);
                    } 
                    else {
                        if (intersection.size.width > intersection.size.height) {
                            //tile is diagonal, but resolving collision vertially
                            p.velocity = cc.PointMake(p.velocity.x, 0.0);
                            var resolutionHeight;
                            if (tileIndx > 5) {
                                resolutionHeight = -intersection.size.height;
                                p.onGround = true;
                            } else {
                                resolutionHeight = intersection.size.height;
                            }                        
                            p.desiredPosition = cc.PointMake(p.desiredPosition.x, p.desiredPosition.y + resolutionHeight );
                        
                        } 
                        else {
                            var resolutionWidth;
                            if (tileIndx == 6 || tileIndx == 4) {
                                resolutionWidth = intersection.size.width;
                            } 
                            else {
                                resolutionWidth = -intersection.size.width;
                            }
                            p.desiredPosition = cc.PointMake(p.desiredPosition.x + resolutionWidth , p.desiredPosition.y);
                        } 
                    }  
                }
            }  
        }
        p.setPosition(p.desiredPosition); //8
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