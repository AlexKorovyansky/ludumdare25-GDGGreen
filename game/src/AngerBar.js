var AngerBar = cc.Sprite.extend({
    _progressMax:0,
    _progress:0,
    _bar:null,
    ctor:function () {
      this._super();

      this._progressMax = 0;
      this._progress = 0;

      this.initWithFile('game/res/transparent.png');

      this.setPosition(cc.p(0, 20));

      this.setAnchorPoint(cc.p(1, 0));
      this.setOpacity(190);

      this._bar = cc.Sprite.create('game/res/progress.png');
      this._bar.setAnchorPoint(cc.p(0, 0));
      this.addChild(this._bar);
    },
    addMaxProgress:function(value){
      this._progressMax += value;
    },
    progress:function(value){
      this._progress += value;
    },
    update:function(dt) {
      // TODO: make better dt count - need to get the real anoumt of health the pee lost
      // 760 - is an absolutely magic constant
      var scale = 760 * parseFloat(this._progress) / parseFloat(this._progressMax);
      if (scale == 0){
        return;
      }
      this._bar.setScaleX(scale);
    }
});