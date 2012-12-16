var Host = cc.Sprite.extend({
    _radians:0,
    _angryLevel:0,
    sinceLastCatch:0,
    ctor:function () {
        this._super();
        this.initWithFile('game/res/host_right.png');
    },
    update:function (dt) {
    	this.setRotation(this._radians);
    },
    getAngryLevel:function(){
      return this._angryLevel;
    },
    increaseAngryLevel:function(){
      this._angryLevel++; 
    },
    decreaseAngryLevel:function(){
      this._angryLevel--;
      if (this._angryLevel < 0){
        this._angryLevel = 0;
      }
    },
    setAngryLevel:function(level){
      this._angryLevel = level; 
    },
    catchCat:function(cat, dt) {
    	this.sinceLastCatch += dt;
    	if(this.sinceLastCatch > 1){
    		this.sinceLastCatch = 0;
    		this.stopAllActions();
        var time = uu.timeMP(this.getPosition(), 200, cat.getPosition());
    		this.runAction(cc.MoveTo.create(time, cat.getPosition()));
    	}
    }
});