#pragma strict

function Start() {
	gameManager = GameObject.Find("GameManager").GetComponent(GameManager);
	countdown = 3.0;
}

function Update() {
	if(!gameManager.GetPause()) {
		countdown = countdown - Time.deltaTime;
	}
	if(countdown <= 0.0) {
		Dissolve();
	}
}

private var countdown : float;
private var gameManager : GameManager;

function Dissolve() {
	transform.Translate(Vector3.up*10000);
	Destroy(gameObject, 0.1);
}
