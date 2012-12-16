// State that help to determine wheather player loose or not
LOOSE = 2;
WIN = 1;
// Calm state used to prevent multiple effect sound playing at GameLayer
CALM = 3;

uu = {
	timeMP: function(ownPosition, ownSpeed, point){
		var d = this.distance(ownPosition, point);
		return d / ownSpeed;
	},
	distance: function(object1, object2){
		return Math.sqrt( Math.pow(object1.x - object2.x, 2) + Math.pow(object1.y - object2.y, 2) );
	}
}

cc.Utils2 = {
	test: function(parameter){
		console.log("Test!! " + parameter);
	}
}