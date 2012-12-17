var GAME = 5;
// State that help to determine wheather player loose or not
var LOOSE = 2;
// Calm state used to prevent multiple effect sound playing at GameLayer
var CALM = 4;

var uu = {
	timeMP: function(ownPosition, ownSpeed, point){
		var d = this.distance(ownPosition, point);
		return d / ownSpeed;
	},
	distance: function(object1, object2){
		return Math.sqrt( Math.pow(object1.x - object2.x, 2) + Math.pow(object1.y - object2.y, 2) );
	}
}