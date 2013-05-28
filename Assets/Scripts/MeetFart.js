#pragma strict

function OnTriggerEnter(collider : Collider) {
	if(collider.tag != "Fart") {
		return;
	}
	SendMessage("SetIsInFart", true);
}

function OnTriggerStay(collider : Collider) {
	if(collider.tag != "Fart") {
		return;
	}
	SendMessage("SetIsInFart", true);
}

function OnTriggerExit(collider : Collider) {
	if(collider.tag != "Fart") {
		return;
	}
	SendMessage("SetIsInFart", false);
}