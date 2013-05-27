#pragma strict

function Start() {
	boardManager = GameObject.Find("BoardManager").GetComponent(BoardManager);
	mainCharacter = GetComponent(MainCharacter);
	currentInput = Vector3.zero;
}

function Update() {
	GetDirection();
	GetButtons();
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var boardManager : BoardManager;
private var mainCharacter : MainCharacter;

// Current location
private var xy : int;
private var currentInput : Vector3;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset() {
	currentInput = Vector3.zero;
}

function GetDirection() {
	if(Input.GetKeyDown(KeyCode.LeftArrow)) {
		currentInput = Vector3.left;
	} else if(Input.GetKeyDown(KeyCode.UpArrow)) {
		currentInput = Vector3.forward;
	} else if(Input.GetKeyDown(KeyCode.RightArrow)) {
		currentInput = Vector3.right;
	} else if(Input.GetKeyDown(KeyCode.DownArrow)) {
		currentInput = Vector3.back;
	}
}

function GetButtons() {
	if(Input.GetButton("Fire2")) {
		mainCharacter.SetAccelerated(true);
	} else {
		mainCharacter.SetAccelerated(false);
	}
	if(Input.GetButton("Fire1")) {
/*		mainCharacter.SetFarting(true);
	} else {
		mainCharacter.SetFarting(false);
*/
		mainCharacter.furt();
	}
}

function GetInput(_xy : int, _direction : Vector3) {
	xy = _xy;
	var availableDirection = boardManager.GetAvailableDirection(xy);
	var output : Vector3;
	
	if(currentInput == Vector3.left && (availableDirection&1) != 0) {
		output = Vector3.left;
	} else if(currentInput == Vector3.forward && (availableDirection&2) != 0) {
		output = Vector3.forward;
	} else if(currentInput == Vector3.right && (availableDirection&4) != 0) {
		output = Vector3.right;
	} else if(currentInput == Vector3.back && (availableDirection&8) != 0) {
		output = Vector3.back;
	} else {
		if(CheckDirection(_direction) == false) {
			output = Vector3.zero;
		} else {
			output = _direction;
		}
	}
			
	return output;
}

function GetReversed(_direction : Vector3) {
	if(_direction == Vector3.zero) {
		return false;
	}

	var reversed = _direction*(-1);	
	if(currentInput == reversed) {
		return true;
	} else {
		return false;
	}
}

function GetReversedLeaving(_direction : Vector3) {
	if(_direction == Vector3.zero) {
		return false;
	}
	
	if(currentInput == _direction) {
		return false;
	} else {
		if(CheckDirection(currentInput)) {
			return true;
		}
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
//
// Private functions
//
///////////////////////////////////////////////////////////////////////////////

private function CheckDirection(nextDirection : Vector3) {
	var availableDirection = boardManager.GetAvailableDirection(xy);
		
	if(nextDirection == Vector3.left && (availableDirection&1) != 0) {
		return true;
	}
	if(nextDirection == Vector3.forward && (availableDirection&2) != 0) {
		return true;
	}
	if(nextDirection == Vector3.right && (availableDirection&4) != 0) {
		return true;
	}
	if(nextDirection == Vector3.back && (availableDirection&8) != 0) {
		return true;
	}
	
	return false;
}
