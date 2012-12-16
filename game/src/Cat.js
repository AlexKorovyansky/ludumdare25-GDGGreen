var Cat = cc.Sprite.extend({
    _radians:0,
    _speed:0,
    _catched:false,
    ctor:function () {
        this._super();
        this._speed = 600;
        this.initWithFile('game/res/cat_right.png');
    },
    update:function(dt) {
      this.setRotation(this._radians);

      if (this._catched){
        this._stateProgress -= 50 * dt;
      }
      if (this._state && !this._disabled && this._stateProgress <= 0) {
        this.initWithFile(this.fileNameActive);
        this._state = false;
        this._disabled = true;
      }
    },
    setChatched:function(){
      this._catched = true;
    },
    handleTouch:function(touchLocation)
    {
      this.setFlipX(touchLocation.x < this.getPositionX());
      
      this.stopAllActions();
      var time = uu.timeMP(this.getPosition(), this._speed, touchLocation);
      console.log(this._speed + " " + time);
      this.runAction( cc.MoveTo.create(time, touchLocation) );
    }
});