#pragma strict

function Start () {
	countdown = 3.0;
}

function Update() {
	countdown = countdown - Time.deltaTime;
	if(countdown <= 0.0) {
		Dissolve();
	}
}

private var countdown : float;

function Dissolve() {
	transform.Translate(Vector3.up*10000);
	Destroy(gameObject, 0.1);
}
