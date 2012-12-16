var Pee = cc.Sprite.extend({
    _radians:0,
    _disabled:false,
    _healthLevel:5,
    _before:null,
    _after:null,

    ctor:function (before, after, startHealthLevel) {
        this._super();
        this._before = before;
        this._after = after;
        this._healthLevel = startHealthLevel;
        this.initWithFile(this._before);
        this.setScale(0.5);
    },

    decreaseHealth: function(dt){
        this._healthLevel -= dt; 
        if(this._healthLevel <= 0 && !this._disabled){
            this.initWithFile(_after);
            this._disabled = true;
        }
    }
});