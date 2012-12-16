var Host = cc.Sprite.extend({
    _radians:0,
    sinceLastCatch:0,
    ctor:function () {
        this._super();
        this.initWithFile('game/res/host_man.png');
        this.setScale(0.5);
    },
    update:function (dt) {
    	this.setRotation(this._radians);
    },
    catchCat:function(cat, dt) {
    	console.log(this.sinceLastCatch);
    	this.sinceLastCatch += dt;
    	if(this.sinceLastCatch > 1){
    		this.sinceLastCatch = 0;
    		this.stopAllActions();
    		this.runAction(cc.MoveTo.create(1, cat.getPosition()));
    	}
    }
});