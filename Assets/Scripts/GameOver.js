#pragma strict

function Start() {
	guiGameOverScreen = GameObject.Find("GameOverScreen").GetComponent(GUITexture);
	guiAngelRing = GameObject.Find("GameOverScreen/AngelRing").GetComponent(GUITexture);
	guiCloud1 = GameObject.Find("GameOverScreen/Cloud1").GetComponent(GUITexture);
	guiCloud2 = GameObject.Find("GameOverScreen/Cloud2").GetComponent(GUITexture);
	guiDeadman = GameObject.Find("GameOverScreen/Deadman").GetComponent(GUITexture);
	guiGameOverLabel = GameObject.Find("GameOverScreen/GameOverLabel").GetComponent(GUITexture);
	guiWingUp = GameObject.Find("GameOverScreen/WingUp").GetComponent(GUITexture);
	guiWingDown = GameObject.Find("GameOverScreen/WingDown").GetComponent(GUITexture);
	gameoverSound = GetComponent(AudioSource);
	Stop();
}

function Update() {
	if(wingTimer <= -10) {
		return;
	}

	// Wing movements
	if(wingUp) {
		guiWingUp.enabled = true;
		guiWingDown.enabled = false;
	} else {
		guiWingUp.enabled = false;
		guiWingDown.enabled = true;
	}
	wingTimer -= Time.deltaTime;
	if(wingTimer < 0) {
		wingUp = !wingUp;
		wingTimer = 0.4;
	}
	
	// Cloud movements
	cloud1y -= 50*Time.deltaTime;
	cloud2y -= 50*Time.deltaTime;
	if(cloud1y < -600) {
		cloud1y = 0;
	}
	if(cloud2y < -600) {
		cloud2y = 0;
	}
	guiCloud1.pixelInset.y = cloud1y;
	guiCloud2.pixelInset.y = cloud2y;
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var guiGameOverScreen : GUITexture;
private var guiAngelRing : GUITexture;
private var guiCloud1 : GUITexture;
private var guiCloud2 : GUITexture;
private var guiDeadman : GUITexture;
private var guiGameOverLabel : GUITexture;
private var guiWingUp : GUITexture;
private var guiWingDown : GUITexture;
private var gameoverSound : AudioSource;

// Status variables
private var wingTimer : float;
private var wingUp : boolean;
private var cloud1y : float;
private var cloud2y : float;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset() {
	guiGameOverScreen.enabled = true;
	guiAngelRing.enabled = true;
	guiCloud1.enabled = true;
	guiCloud2.enabled = true;
	guiDeadman.enabled = true;
	guiGameOverLabel.enabled = true;
	guiWingUp.enabled = true;
	guiWingDown.enabled = false;
	
	gameoverSound.Play();
	
	wingTimer = 0.4;
	wingUp = true;
	
	cloud1y = -100;
	cloud2y = -400;
}

function Stop() {
	guiGameOverScreen.enabled = false;
	guiAngelRing.enabled = false;
	guiCloud1.enabled = false;
	guiCloud2.enabled = false;
	guiDeadman.enabled = false;
	guiGameOverLabel.enabled = false;
	guiWingUp.enabled = false;
	guiWingDown.enabled = false;
	
	gameoverSound.Stop();
	
	wingTimer = -10;
}
