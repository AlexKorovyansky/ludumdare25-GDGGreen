var Host = cc.Sprite.extend({
    _radians:0,
    _angryLevel:0,
    sinceLastCatch:0,
    _isActive:0,
    ctor:function () {
        this._super();
        this.initWithFile('game/res/host_right.png');
        this._isActive = 0;
        this.sinceLastCatch = 1;
        this.setOpacity(0);
    },
    update:function (dt) {
    	this.setRotation(this._radians);
    },
    getAngryLevel:function(){
      return this._angryLevel;
    },
    increaseAngryLevel:function(){
      this._angryLevel++;
      if(this._isActive == 0){
        this._isActive = 1;
        var action = cc.Sequence.create(cc.FadeIn.create(0.5), cc.CallFunc.create(this, this.activate));
        this.runAction(action);
      }
    },

    activate:function(){
        this._isActive = 2;
    },

    decreaseAngryLevel:function(){
      this._angryLevel--;
      if (this._angryLevel < 0){
        this._angryLevel = 0;
      }
    },
    catchCat:function(cat, dt) {
        if(this._isActive == 2){
        	this.sinceLastCatch += dt;
        	if(this.sinceLastCatch > 1){
        		this.sinceLastCatch = 0;
        		this.stopAllActions();
            var time = uu.timeMP(this.getPosition(), 100 + this._angryLevel * this._angryLevel * 0.001, cat.getPosition());
            this.setFlipX(this.getPositionX() > cat.getPositionX());
        		this.runAction(cc.MoveTo.create(time, cat.getPosition()));
        	}
        }
    }

});