#pragma strict

function Start () {
	Reset();
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

private var inFart : boolean;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset() {
	inFart = false;
}

function OnTriggerEnter(collider : Collider) {
	if(collider.tag != "Fart") {
		return;
	}
	
	if(!inFart) {
		inFart = true;
		SendMessage("SetIsInFart", true);
	}
}

function OnTriggerExit(collider : Collider) {
	if(collider.tag != "Fart") {
		return;
	}
	
	if(inFart) {
		inFart = false;
		SendMessage("SetIsInFart", false);
	}
}