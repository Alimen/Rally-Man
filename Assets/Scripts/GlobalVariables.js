#pragma strict

function Awake (){
	DontDestroyOnLoad(transform.gameObject);
}

// Parameters for next SetupGame()
var gameInitialState : int = 0;
var level : int = 1;

// Reseved variables over levels
var life : int = 3;
var hiscore : int = 10000;
var score : int = 0;
var nextLife : int = 4000;
