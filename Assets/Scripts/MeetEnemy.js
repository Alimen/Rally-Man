#pragma strict

function Start () {
	Reset();
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

var inEnemy : boolean;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset() {
	inEnemy = false;
}

function OnTriggerEnter(collider : Collider) {
	if(collider.tag != "Enemy") {
		return;
	}
	
	if(!inEnemy) {
		inEnemy = true;
		SendMessage("SetIsInEnemy", true);
	}
}

function OnTriggerExit(collider : Collider) {
	if(collider.tag != "Enemy") {
		return;
	}
	
	if(inEnemy) {
		inEnemy = false;
		SendMessage("SetIsInEnemy", false);
	}
}
