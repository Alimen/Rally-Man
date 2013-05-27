#pragma strict

function Start() {
	boardManager = GameObject.Find("BoardManager").GetComponent(BoardManager);
	characterMovement = GetComponent(CharacterMovement);
	aiInput = GetComponent(AiInput);
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var boardManager : BoardManager;
private var characterMovement : CharacterMovement;
private var aiInput : AiInput;

// Status variables
private var initialSpeed : float = 1.2;
private var paused : boolean;
private var isInFart : boolean;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset(xy : int, aiLevel : int) {
	paused = true;
	isInFart = false;
	characterMovement.speed = initialSpeed;
	characterMovement.Reset(xy);
	aiInput.Reset(aiLevel);
}

function SetStopped(input : boolean) {
	paused = input;
	characterMovement.SetStopped(paused);
}

function SetIsInFart(input : boolean) {
	if(isInFart == input) {
		return;
	}
	
	isInFart = input;
	if(isInFart) {
		gameObject.AddComponent(Spinning);
		gameObject.tag = "Untagged";
		SetStopped(true);
	} else {
		Destroy(gameObject.GetComponent(Spinning));
		transform.rotation = Quaternion.identity;
		gameObject.tag = "Enemy";
		SetStopped(false);
	}
}
