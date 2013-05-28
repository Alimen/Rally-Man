#pragma strict

function Start() {
	gameManager = GameObject.Find("GameManager").GetComponent(GameManager);
	boardManager = GameObject.Find("BoardManager").GetComponent(BoardManager);
	characterMovement = GetComponent(CharacterMovement);
}

function Update() {
	Camera.main.transform.position = transform.position + Vector3(0, 3.5, 0);
	if(paused) {
		return;
	}

	if(fuel > 0) {
		fuel -= consumption*Time.deltaTime;
		if(accelerated) {
			fuel -= consumption*Time.deltaTime;
		}
		gameManager.UpdateFuel(fuel/maxFuel);
		if(fuel <= 0) {
			speed = initialSpeed;
		}
	} else if(speed > 0) {
		speed -= initialSpeed*Time.deltaTime;
		characterMovement.speed = speed;
	} else {
		speed = initialSpeed;
		characterMovement.SetStopped(true);
	}
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
var Fart : Transform;
private var gameManager : GameManager;
private var boardManager : BoardManager;
private var characterMovement : CharacterMovement;

// Fuel variables
var maxFuel : float;
var fuel : float;
private var consumption : float = 1.0;

// Scoring variables
private var flagS : int;
private var nextFlag : int;

// Status variables
private var initialSpeed : float = 1.2;
private var speed : float = 1.2;
var accelerated : boolean;
var isInFart : boolean;
var paused : boolean;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset(xy : int) {
	flagS = 1;
	nextFlag = 100;
	
	accelerated = false;
	isInFart = false;
	paused = true;
	
	Destroy(gameObject.GetComponent(Spinning));
	transform.rotation = Quaternion.identity;	
	characterMovement.speed = initialSpeed;
	characterMovement.Reset(xy);
}

function OnTileCenter(xy : int) {
	boardManager.UpdatePlayerXY(xy);
}

function furt() {
	if(!isInFart && fuel > 0.0) {
		var xy = boardManager.GetBoardXY(transform.position.x, transform.position.z);
		fuel -= 2.0;
		Instantiate(Fart, boardManager.GetCenter(xy)+Vector3(0, 0.25, 0) , Fart.transform.rotation);
	}
}

function SetAccelerated(input : boolean) {
	if(input == accelerated || fuel <= 0.0) {
		return;
	}
	
	accelerated = input;
	if(accelerated) {
		speed = initialSpeed * 1.5;
		characterMovement.speed = speed;
	} else {
		speed = initialSpeed;
		characterMovement.speed = speed;
	}
}

function SetIsInFart(input : boolean) {
	isInFart = input;
}

function SetStopped(input : boolean) {
	paused = input;
	characterMovement.SetStopped(paused);
}

function RefillFuel(input : float) {
	maxFuel = input;
	fuel = maxFuel;
}

function OnTriggerEnter(collider : Collider) {
	if(collider.tag != "Flag-Normal" && collider.tag != "Flag-S") {
		return;
	}
	Destroy(collider.gameObject);
	
	if(collider.tag == "Flag-S") {
		flagS = 2;
	}
	
	gameManager.EatFlag();
	gameManager.AddScore(nextFlag * flagS);
	nextFlag += 100;	
}

function SetIsInEnemy(input : boolean) {
	if(paused) {
		return;
	}
	
	if(input) {
		gameObject.AddComponent(Spinning);
		gameManager.Dead();
	} else {
		Destroy(gameObject.GetComponent(Spinning));
	}
}
