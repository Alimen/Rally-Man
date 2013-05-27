#pragma strict
#pragma downcast

function Start() {
	gameManager = GameObject.Find("GameManager").GetComponent(GameManager);
	pauseScreen = GameObject.Find("PauseScreen").GetComponent(GUITexture);
	pauseLabel = GameObject.Find("PauseScreen/PAUSE").GetComponent(GUIText);
	pauseSound = GameObject.Find("PauseScreen/PauseSound").GetComponent(AudioSource);
	pause = false;
	Stop();
}

function Update() {
	if(Input.GetButtonUp("Fire3")) {
		pause = !pause;
		gameManager.SetPause(pause);
	}
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var gameManager : GameManager;
private var pauseScreen : GUITexture;
private var pauseLabel : GUIText;
private var pauseSound : AudioSource;

// Status variables
var pause : boolean;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset() {
	pauseScreen.enabled = true;
	pauseLabel.enabled = true;
	pauseSound.Play();
}

function Stop() {
	pauseScreen.enabled = false;
	pauseLabel.enabled = false;
	pauseSound.Stop();
}
