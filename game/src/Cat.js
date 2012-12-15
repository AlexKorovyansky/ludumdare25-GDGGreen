var Cat = cc.Sprite.extend({
    _radians:0,
    ctor:function () {
        this._super();
        this.initWithFile('game/res/cat.png');
    },
    update:function (dt) {
      this.setRotation(this._radians);
    }
});