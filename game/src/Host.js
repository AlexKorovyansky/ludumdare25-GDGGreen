var Host = cc.Sprite.extend({
    _radians:0,
    ctor:function () {
        this._super();
        this.initWithFile('game/res/host_man.png');
        this.setScale(0.5);
    },
    update:function (dt) {
      this.setRotation(this._radians);
    }
});