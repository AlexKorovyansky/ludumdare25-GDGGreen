var Pee = cc.Sprite.extend({
    _radians:0,
    _state:false,
    _disabled:false,
    _stateProgress:100,
    _fileNameActive:null,

    ctor:function (fileName, fileNameActive) {
        this._super();
        this.fileNameActive = fileNameActive;
        this.initWithFile("game/res/box.png");
        this.setScale(0.5);
        this.scheduleUpdate();
    },
    setDestroyTime:function(time){
       this._stateProgress = time;
    },
    collisionBoundingBox:function () {
        var collisionBox = cc.rectInset(this.getBoundingBox(), 3, 0);
        var diff = cc.pSub(this.desiredPosition, this.getPosition());
        var returnBoundingBox = cc.rectOffset(collisionBox, diff.x, diff.y);
        return returnBoundingBox;
    },
    update:function(dt) {
      this.setRotation(this._radians);

      if (this._state && !this._disabled){
        this._stateProgress -= 50 * dt;
      }
      if (this._state && !this._disabled && this._stateProgress <= 0) {
        this.initWithFile(this.fileNameActive);
        this._state = false;
        this._disabled = true;
      }
    },
    setState:function(state){
      this._state = state;
    }
});