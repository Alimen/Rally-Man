#pragma strict

function Start () {
	boardManager = GameObject.Find("BoardManager").GetComponent(BoardManager);
	userInput = GetComponent(UserInput);
	if(userInput == null) {
		aiInput = GetComponent(AiInput);
	}
}

function Update () {
	Move();
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var boardManager : BoardManager;
private var userInput : UserInput = null;
private var aiInput : AiInput = null;

// Status variables
var xy : int;
var speed : float = 0;
private var direction : Vector3;
private var stopped : boolean;
private var movingState : int;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset(_xy : int) {	
	direction = Vector3.zero;
	stopped = true;
	movingState = 0;
	xy = _xy;
	transform.position = boardManager.GetCenter(xy);
	if(userInput != null) {
		userInput.Reset();
	}
}

function Move() {
	if(stopped) {
		return;
	}

	xy = boardManager.GetBoardXY(transform.position.x, transform.position.z);
	switch(movingState) {
	case 0:	// Idle
		if(userInput != null) {
			direction = userInput.GetInput(xy, direction);
		} else {
			direction = aiInput.GetInput(xy, direction);
		}
		
		if(direction != Vector3.zero) {
			movingState = 1;
		}
		break;
		
	case 1: // Leave center
		transform.Translate(direction * speed * Time.deltaTime);
		movingState = 2;
		break;
		
	case 2:	// Moving
		if(Vector3.Distance(transform.position, boardManager.GetCenter(xy)) < speed*Time.deltaTime) {
			transform.position = boardManager.GetCenter(xy);
			movingState = 3;
		} else {
			if(userInput != null) {
				if(userInput.GetReversed(direction)) {
					direction = direction*(-1);
				}
			}
			transform.Translate(direction * speed * Time.deltaTime);
		}
		break;
		
	case 3:	 // Check direction
		if(userInput != null) {
			direction = userInput.GetInput(xy, direction);
			SendMessage("OnTileCenter", xy);
		} else {
			direction = aiInput.GetInput(xy, direction);
		}
		
		if(direction == Vector3.zero) {
			movingState = 0;
		} else {
			transform.Translate(direction * speed * Time.deltaTime);
			movingState = 1;
		}
		break;
	}
}

function SetStopped(input : boolean) {
	stopped = input;
}
