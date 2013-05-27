#pragma strict

function Start () {
	titleScreen = GameObject.Find("TitleScreen").GetComponent(GUITexture);
	titleScreen.pixelInset.y = -800;
	
	gameStart = GameObject.Find("GameStart").GetComponent(GUIText);
	gameStart.enabled = false;
	
	if(GameObject.Find("GlobalVariables(Clone)") == null) {
		globalVariables = Instantiate(GVs, Vector3.zero, Quaternion.identity).GetComponent(GlobalVariables);
	} else {
		globalVariables = GameObject.Find("GlobalVariables(Clone)").GetComponent(GlobalVariables);
	}
	globalVariables.gameInitialState = 0;
	
	state = titleStates.scrolling;
}

function Update () {
	switch(state) {
	case titleStates.scrolling:
		titleScreen.pixelInset.y += 80*Time.deltaTime;
		if(titleScreen.pixelInset.y >= -400) {
			ChangeState(titleStates.idle);
		}
		if(Input.GetButtonUp("Fire3")) {
			ChangeState(titleStates.idle);
		}
		break;
		
	case titleStates.idle:
		blinkTimer -= Time.deltaTime;
		if(blinkTimer < 0) {
			blinkShow = !blinkShow;
			blinkTimer = 0.4;
			gameStart.enabled = blinkShow;
		}
		if(Input.GetButtonUp("Fire3")) {
			Application.LoadLevel("Game");
		}
		break;
	}
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var titleScreen : GUITexture;
private var gameStart : GUIText;
var GVs : Transform;
private var globalVariables : GlobalVariables;

// Title state machine
private enum titleStates {scrolling, idle};
var state : titleStates;

// Idle variables
private var blinkShow : boolean;
private var blinkTimer : float;

///////////////////////////////////////////////////////////////////////////////
//
// Subroutines
//
///////////////////////////////////////////////////////////////////////////////

function ChangeState(input : titleStates) {
	state = input;
	switch(state) {
	case titleStates.idle:
		titleScreen.pixelInset.y = -400;
		blinkShow = true;
		blinkTimer = 0.4;
		gameStart.enabled = true;
		break;
	}
}
