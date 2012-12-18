var Pee = cc.Sprite.extend({
    _radians:0,
    _disabled:false,
    _healthLevel:5,
    _before:null,
    _after:null,

    ctor:function (peeConf) {
        this._super();
        this._before = peeConf.before;
        this._after = peeConf.after;
        this._healthLevel = peeConf.level;
        this.initWithFile(this._before);
        this.setPosition(cc.p(peeConf.x, peeConf.y));
        this.setAnchorPoint(cc.p(0.5, 0.5));
    },

    decreaseHealth: function(dt){
        this._healthLevel -= dt;
        if(this._healthLevel <= 0 && !this._disabled){
            this.initWithFile(this._after);
            this._disabled = true;
        }
    },

    isDisabled: function(){
        return this._disabled;
    }
});