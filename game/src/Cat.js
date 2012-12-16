var Cat = cc.Sprite.extend({
    _radians:0,
    _speed:0,
    ctor:function () {
        this._super();
        this._speed = 300;
        this.initWithFile('game/res/cat.png');
    },
    collisionBoundingBox:function () {
        var collisionBox = cc.rectInset(this.getBoundingBox(), 3, 0);
        var diff = cc.pSub(this.desiredPosition, this.getPosition());
        var returnBoundingBox = cc.rectOffset(collisionBox, diff.x, diff.y);
        return returnBoundingBox;
    },
    update:function (dt) {
      this.setRotation(this._radians);
    },
    handleTouch:function(touchLocation)
    {
      this.stopAllActions();
      var distance = Math.sqrt( Math.pow(this.getPositionX() - touchLocation.x, 2) + Math.pow(this.getPositionY() - touchLocation.y, 2) );
      this.runAction( cc.MoveTo.create(distance / this._speed, touchLocation) );
    }
});