var Cat = cc.Sprite.extend({
    _radians:0,
    _speed:0,
    ctor:function () {
        this._super();
        this._speed = 300;
        this.initWithFile('game/res/cat.png');
    },
    update:function (dt) {
      this.setRotation(this._radians);
    },
    handleTouch:function(touchLocation)
    {
      this.stopAllActions();
      var time = uu.timeMP(this.getPosition(), this._speed, touchLocation);
      this.runAction( cc.MoveTo.create(time, touchLocation) );
    }
});