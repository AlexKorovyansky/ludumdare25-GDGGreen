var Pee = cc.Sprite.extend({
    _radians:0,
    _state:false,
    _disabled:false,
    _fileNameActive:null,

    ctor:function (fileName, fileNameActive) {
        this._super();
        this.fileNameActive = fileNameActive;
        this.initWithFile(fileName);
    },
    update:function (dt) {
      this.setRotation(this._radians);

      if (this._state && !this._disabled) {
        this.initWithFile(this.fileNameActive);
        this._state = false;
        this._disabled = true;
      }
    },
    setActiveState:function(){
      this._state = true;
    },
    handleTouch:function(touchLocation)
    {
      this.setActiveState();
      this.update();
    }
});