var AngerBar = cc.Sprite.extend({
    _progressMax:0,
    _progress:0,
    _bar:null,
    ctor:function () {
      this._super();

      this.initWithFile('game/res/transparent.png');
      this._bar = cc.Sprite.create('game/res/cat_left.png');
      this.addChild(this._bar);
    },
    addMaxProgress:function(value){
      this._progressMax += value;
    },
    progress:function(value){
      this._progress += value;
    },
    update:function(dt) {
      var scale = parseFloat(this._progress) / parseFloat(this._progressMax);
      this._bar.setScaleX(scale);
    }
});