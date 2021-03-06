//plist
// var s_objects_plist = "game/res/objects.plist";

var background_music = "game/res/sound/bg";
var meow_effect 		 = "game/res/sound/meow";
var pee_config = [
	{
		before:"game/res/armchair_before.png",
		after:"game/res/armchair_after.png",
		x: 300,
		y: 240,
		level: 2
	},
	{
		before:"game/res/tv_before.png",
		after:"game/res/tv_after.png",
		x: 120,
		y: 240,
		level: 3
	},
	{
		before:"game/res/fish_before.png",
		after:"game/res/fish_after.png",
		x: 600,
		y: 140,
		level: 1
	},
	{
		before:"game/res/flower_before.png",
		after:"game/res/flower_after.png",
		x: 350,
		y: 470,
		level: 2
	},
	{
		before:"game/res/boots_before.png",
		after:"game/res/boots_after.png",
		x: 740,
		y: 370,
		level: 0.5
	},
];

var g_ressources = [
    //images
    {type:"image", src:"game/res/about.png"},
    {type:"image", src:"game/res/room.png"},
    {type:"image", src:"game/res/start.png"},
    {type:"image", src:"game/res/progress.png"},
    {type:"image", src:"game/res/armchair_after.png"},
    {type:"image", src:"game/res/armchair_before.png"},
    {type:"image", src:"game/res/host_right.png"},
    {type:"image", src:"game/res/cat_right.png"},
    {type:"image", src:"game/res/tv_before.png"},
    {type:"image", src:"game/res/tv_after.png"},
    {type:"image", src:"game/res/fish_before.png"},
    {type:"image", src:"game/res/fish_after.png"},
    {type:"image", src:"game/res/flower_before.png"},
    {type:"image", src:"game/res/flower_after.png"},
    {type:"image", src:"game/res/boots_before.png"},
    {type:"image", src:"game/res/boots_after.png"},

    //plist
    // {type:"plist", src:s_objects_plist},

    //music
    {type:"sound", src:background_music + ".mp3"},
    {type:"sound", src:background_music + ".ogg"},
    {type:"sound", src:meow_effect + ".mp3"},
    {type:"sound", src:meow_effect + ".ogg"}
];
