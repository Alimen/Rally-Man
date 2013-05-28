#pragma strict

function Start() {
	boardManager = GameObject.Find("BoardManager").GetComponent(BoardManager);
	characterMovement = GetComponent(CharacterMovement);
	aiInput = GetComponent(AiInput);
}

function Update() {
	if(paused) {
		return;
	}

	if(isInFart) {
		transform.RotateAround(fartPos, Vector3.up, 360*Time.deltaTime);
	}
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
var paused : boolean;
var isInFart : boolean;
private var fartPos : Vector3;

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
	transform.rotation = Quaternion.identity;
	if(gameObject.GetComponent(Spinning) != null) {
		Destroy(gameObject.GetComponent(Spinning));
	}
	aiInput.Reset(aiLevel);
}

function SetStopped(input : boolean) {
	paused = input;
	if(paused) {
		characterMovement.SetStopped(true);
	} else {
		characterMovement.SetStopped(isInFart);
	}
}

function SetIsInFart(input : boolean) {
	if(isInFart == input) {
		return;
	}

	isInFart = input;
	if(isInFart) {
		fartPos = transform.position;
		gameObject.tag = "Untagged";
		characterMovement.SetStopped(true);
	} else {
		transform.rotation = Quaternion.identity;
		transform.position = fartPos;
		gameObject.tag = "Enemy";
		characterMovement.SetStopped(paused);
	}
}
