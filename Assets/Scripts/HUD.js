#pragma strict

function Start () {
	guiHiscore = GameObject.Find("HUD/HI-SCORE").GetComponent(GUIText);
	guiScore = GameObject.Find("HUD/SCORE").GetComponent(GUIText);
	guiLife = GameObject.Find("HUD/LIFE").GetComponent(GUIText);
	for(var i = 1; i < 6; i++) {
		guiFlags[i-1] = GameObject.Find("HUD/Flag"+i).GetComponent(GUITexture);
	}
	guiFuelBarRed = GameObject.Find("HUD/FuelBarRed").GetComponent(GUITexture);
	guiFuelRed = GameObject.Find("HUD/FuelRed").GetComponent(GUITexture);
	guiFuelBarYellow = GameObject.Find("HUD/FuelBarYellow").GetComponent(GUITexture);
	guiFuelYellow = GameObject.Find("HUD/FuelYellow").GetComponent(GUITexture);
	
	guiHiscore.material.color = Color.red;
	guiScore.material.color = Color.cyan;
	
	Reset();
}

function Update () {
	guiHiscore.text = hiscore.ToString();
	guiScore.text = score.ToString();
	guiLife.text = "x" + life.ToString();
	
	for(var i = 0; i < 5; i++) {
		if(flagLeft > i) {
			guiFlags[i].enabled = true;
		} else {
			guiFlags[i].enabled = false;
		}
	}
	
	if(fuel > 0.3) {
		guiFuelBarRed.enabled = false;
		guiFuelRed.enabled = false;
		guiFuelBarYellow.enabled = true;
		guiFuelYellow.enabled = true;
		guiFuelYellow.pixelInset.width = fuel * 110;
	} else {
		guiFuelBarYellow.enabled = false;
		guiFuelYellow.enabled = false;
		if(blinkShow) {
			guiFuelBarRed.enabled = true;
			guiFuelRed.enabled = true;
			guiFuelRed.pixelInset.width = fuel * 110;
		} else {
			guiFuelBarRed.enabled = false;
			guiFuelRed.enabled = false;
		}
		blinkTimer -= Time.deltaTime;
		if(blinkTimer < 0) {
			blinkShow = !blinkShow;
			blinkTimer = 0.4;
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var guiHiscore : GUIText;
private var guiScore : GUIText;
private var guiLife : GUIText;
private var guiFlags : GUITexture[] = new GUITexture[5];
private var guiFuelBarRed : GUITexture;
private var guiFuelRed : GUITexture;
private var guiFuelBarYellow : GUITexture;
private var guiFuelYellow : GUITexture;

// Status variables
var hiscore : int;
var score : int;
var fuel : float;
var life : int;
var flagLeft : int;
var blinkShow : boolean;
var blinkTimer : float;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset() {
	blinkShow = true;
	blinkTimer = 0.4;
}

function SetScore(_hiscore : int, _score : int) {
	hiscore = _hiscore;
	score = _score;
}

function SetFuel(input : float) {
	if(input > 1) {
		input = 1;
	}
	if(input < 0) {
		input = 0;
	}
	fuel = input;
}

function SetLife(input : int) {
	if(input > 99) {
		input = 99;
	}
	if(input < 0) {
		input = 0;
	}
	life = input;
}

function SetFlagLeft(input : int) {
	if(input > 5) {
		input = 5;
	}
	if(input < 0) {
		input = 0;
	}
	flagLeft = input;
}
