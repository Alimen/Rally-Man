#pragma strict

function Start () {
	playerReady = GetComponent(GUIText);
	playerReady.text = "PLAYER\n\n\n\nReady!";
	playerReady.material.color = Color.red;
	
	Stop();
}

function Update () {
	if(blinkTimer <= -10) {
		return;
	}

	playerReady.enabled = blinkShow;
	blinkTimer -= Time.deltaTime;
	if(blinkTimer < 0) {
		blinkShow = !blinkShow;
		blinkTimer = 0.3;
	}
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var playerReady : GUIText;

// Status variables
private var blinkShow : boolean;
private var blinkTimer : float;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset() {
	blinkShow = true;
	blinkTimer = 0.3;
	playerReady.enabled = true;	
}

function Stop() {
	blinkShow = false;
	blinkTimer = -10;
	playerReady.enabled = false;
}
