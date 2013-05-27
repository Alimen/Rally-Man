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

// State machine
private enum movingStates {idle, leaveCenter, leaveTile, enterTile, checkDirection};
private var state : movingStates;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset(_xy : int) {	
	direction = Vector3.zero;
	stopped = true;
	state = 0;
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
	switch(state) {
	case movingStates.idle:
		if(userInput != null) {
			direction = userInput.GetInput(xy, direction);
		} else {
			direction = aiInput.GetInput(xy, direction);
		}
		
		if(direction != Vector3.zero) {
			state = movingStates.leaveCenter;
		}
		break;
		
	case movingStates.leaveCenter:
		transform.Translate(direction * speed * Time.deltaTime);
		state = movingStates.leaveTile;
		break;
		
	case movingStates.leaveTile:
		if(userInput != null) {
			if(userInput.GetReversedLeaving(direction)) {
				direction = direction*(-1);
				state = movingStates.enterTile;
			}
		}
		transform.Translate(direction * speed * Time.deltaTime);
		if(boardManager.GetBoardXY(transform.position.x, transform.position.z) != xy) {
			state = movingStates.enterTile;
		}		
		break;
		
	case movingStates.enterTile:
		if(Vector3.Distance(transform.position, boardManager.GetCenter(xy)) < speed*Time.deltaTime) {
			transform.position = boardManager.GetCenter(xy);
			state = movingStates.checkDirection;
		} else {
			if(userInput != null) {
				if(userInput.GetReversed(direction)) {
					direction = direction*(-1);
					state = movingStates.leaveTile;
				}
			}
			transform.Translate(direction * speed * Time.deltaTime);
		}
		break;
		
	case movingStates.checkDirection:
		if(userInput != null) {
			direction = userInput.GetInput(xy, direction);
			SendMessage("OnTileCenter", xy);
		} else {
			direction = aiInput.GetInput(xy, direction);
		}
		
		if(direction == Vector3.zero) {
			state = movingStates.idle;
		} else {
			transform.Translate(direction * speed * Time.deltaTime);
			state = movingStates.leaveCenter;
		}
		break;
	}
}

function SetStopped(input : boolean) {
	stopped = input;
}
