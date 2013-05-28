#pragma strict

function Start() {
	if(GameObject.Find("GlobalVariables(Clone)") == null) {
		globalVariables = Instantiate(GVs, Vector3.zero, Quaternion.identity).GetComponent(GlobalVariables);
	} else {
		globalVariables = GameObject.Find("GlobalVariables(Clone)").GetComponent(GlobalVariables);
	}
	
	boardManager = GameObject.Find("BoardManager").GetComponent(BoardManager);
	showLevelSlide = GameObject.Find("LevelScreen").GetComponent(ShowLevel);
	playerReadySlide = GameObject.Find("PlayerReady").GetComponent(PlayerReady);
	pauseSlide = GameObject.Find("PauseScreen").GetComponent(Pause);
	gameoverSlide = GameObject.Find("GameOverScreen").GetComponent(GameOver);
	hud = GameObject.Find("HUD").GetComponent(HUD);
	
	player = GameObject.Find("Self").GetComponent(MainCharacter);
	enemys = new Enemy[5];
	for(var i : int = 0; i < 5; i++) {
		enemys[i] = GameObject.Find("Enemy"+(i+1).ToString()).GetComponent(Enemy);
	}
	
	bgm = GameObject.Find("BGM").GetComponent(AudioSource);
	crash = GameObject.Find("Crash").GetComponent(AudioSource);
	scoringSound = GameObject.Find("Scoring").GetComponent(AudioSource);
	
	state = gameStates.start;
}

function Update() {
	switch(state) {
	case gameStates.start:
		SetupGame();
		break;
		
	case gameStates.showLevel:
		timer -= Time.deltaTime;
		if(timer <= 0) {
			showLevelSlide.Stop();
			ChangeState(gameStates.playerReady);
		}
		break;
		
	case gameStates.playerReady:
		timer -= Time.deltaTime;
		if(timer <= 0) {
			playerReadySlide.Stop();
			ChangeState(gameStates.game);
		}
		break;
		
	case gameStates.game:
		break;
		
	case gameStates.clear:
		timer -= Time.deltaTime;
		scoring -= Time.deltaTime/4;
		if(fuelScore - scoring > 0.01 && scoring >= 0) {
			AddScore(globalVariables.level);
			fuelScore = scoring;
			hud.SetFuel(fuelScore);
			scoringSound.Stop();
			scoringSound.Play();
		}		
		if(timer <= 0) {
			globalVariables.level++;
			if(globalVariables.level % 3 == 1) {
				globalVariables.gameInitialState = 1;
				Application.LoadLevel("EyeCandy");
			} else {
				globalVariables.gameInitialState = 2;
				ChangeState(gameStates.start);
			}			
		}
		break;
		
	case gameStates.crash:
		timer -= Time.deltaTime;
		if(timer <= 0) {
			if(globalVariables.life == 0) {
				ChangeState(gameStates.gameover);
			} else {
				globalVariables.gameInitialState = 3;
				ChangeState(gameStates.start);
			}
		}
		break;
		
	case gameStates.gameover:
		timer -= Time.deltaTime;
		if(timer <= 0) {
			Application.LoadLevel("Title");
		}
		break;
	}
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Global variables
var GVs : Transform;
private var globalVariables : GlobalVariables;

// Board manager
private var boardManager : BoardManager;

// Slides
private var showLevelSlide : ShowLevel;
private var playerReadySlide : PlayerReady;
private var pauseSlide : Pause;
private var gameoverSlide : GameOver;

// Audio sources
private var bgm : AudioSource;
private var crash : AudioSource;
private var scoringSound : AudioSource;

// HUD
private var hud : HUD;

// Characters
private var player : MainCharacter;
private var enemys : Enemy[];

// State machine
private enum gameStates {start, showLevel, playerReady, game, crash, clear, gameover};
var state : gameStates;

// Game variables
var flags : int;
private var fuelScore : float;
private var scoring : float;

// Status variables
private var timer : float;
var pause : boolean;

///////////////////////////////////////////////////////////////////////////////
//
// Subroutines
//
///////////////////////////////////////////////////////////////////////////////

function SetupGame() {
	var start : int = globalVariables.gameInitialState;
	SendPauseMessage(true);
	
	// 1. Starts a whole new game
	if(start <= 0) {
		globalVariables.level = 1;
		globalVariables.life = 3;
		globalVariables.score = 0;
		globalVariables.nextLife = 8000;
	}
	
	// 2. Change to a new stage
	if(start <= 1) {
		boardManager.SetupBoard(Mathf.FloorToInt((globalVariables.level*1.0)/3)%3);
	}
	
	// 3. Change to a new sub-stage
	if(start <= 2) {
		boardManager.PlaceFlags();
		flags = 5;
	}
	
	// 4. Rebirth
	// 4-1. Place player & enemys
	player.Reset(boardManager.GetInitialPlayerXY());
	var enemyXY : int[] = boardManager.GetInitialEnemysXY();
	var aiLevels : int[] = [5, 105, 101, 302, 103];
	for(var i : int = 0; i < 5; i++) {
		enemys[i].Reset(enemyXY[i], aiLevels[i]);
	}
	
	// 4-2. Refill fuel
	var maxFuel : int = 200 - (globalVariables.level - 1) * 20;
	if(maxFuel <= 60) {
		maxFuel = 60;
	}
	player.RefillFuel(maxFuel);
	
	// 4-3. Setup HUD
	hud.SetScore(globalVariables.hiscore, globalVariables.score);
	hud.SetLife(globalVariables.life);
	hud.SetFuel(1.00);
	hud.SetFlagLeft(flags);
	
	// 4-4. Reset audio sources
	bgm.Stop();
	crash.Stop();
	
	// 5. Change states to showLevel
	ChangeState(gameStates.showLevel);
}

function ChangeState(input : gameStates) {
	state = input;
	switch(state) {
	case gameStates.showLevel:
		showLevelSlide.Reset(globalVariables.level, globalVariables.life);
		timer = 2.0;
		break;
		
	case gameStates.playerReady:
		playerReadySlide.Reset();
		timer = 1.5;
		break;
		
	case gameStates.game:
		SendPauseMessage(false);
		pause = false;
		break;
		
	case gameStates.clear:
		SendPauseMessage(true);
		timer = 6.0;
		fuelScore = hud.fuel;
		scoring = 1.1;
		break;
		
	case gameStates.crash:
		SendPauseMessage(true);
		crash.Play();
		timer = 3.0;
		break;
		
	case gameStates.gameover:
		SendPauseMessage(true);
		gameoverSlide.Reset();
		timer = 5.0;
		break;
	}
}

function SetPause(input : boolean) {
	if(state != gameStates.game) {
		return;
	}
	if(pause == input) {
		return;
	}
	pause = input;
	
	if(pause) {
		pauseSlide.Reset();
	} else {
		pauseSlide.Stop();
	}
	SendPauseMessage(pause);
}

function GetPause() {
	return pause;
}

function SendPauseMessage(input : boolean) {
	player.SetStopped(input);
	for(var i in enemys) {
		i.SendMessage("SetStopped", input);
	}
	if(input) {
		bgm.Pause();
	} else {
		bgm.Play();
	}
}

function UpdateFuel(input : float) {
	if(input > 1) {
		input = 1;
	}
	if(input < 0) {
		input = 0;
	}
	hud.SetFuel(input);
}

function AddScore(input : int) {
	globalVariables.score += input;
	if(globalVariables.score > globalVariables.hiscore) {
		globalVariables.hiscore = globalVariables.score;
	}
	if(globalVariables.score >= globalVariables.nextLife) {
		globalVariables.life++;
		globalVariables.nextLife *= 2;
		hud.SetLife(globalVariables.life);
	}
	hud.SetScore(globalVariables.hiscore, globalVariables.score);
}

function EatFlag() {
	flags--;
	hud.SetFlagLeft(flags);
	if(flags == 0) {
		ChangeState(gameStates.clear);
	}
}

function Dead() {
	globalVariables.life--;
	hud.SetLife(globalVariables.life);
	ChangeState(gameStates.crash);
}
