#pragma strict

function Start () {
	bonusSound = GameObject.Find("BonusSound").GetComponent(AudioSource);
	state = 0;
}

function Update () {
	if(Input.GetButtonUp("Fire3")) {
		bonusSound.Stop();
		Application.LoadLevel("Game");		
	}

	if(state == 0) {
		player.transform.Translate(Vector3(-1.2, 0, 0)*Time.deltaTime);
		for(var i in enemys) {
			i.transform.Translate(Vector3(-1.2, 0, 0)*Time.deltaTime);
		}
		if(player.transform.position.x > 5.3) {
			state = 1;
			bonusSound.Play();
			player.transform.localScale += Vector3(2, 2, 2);
			player.transform.position.z = 0.7;
		}
	} else if(state == 1) {
		player.transform.Translate(Vector3(1.2, 0, 0)*Time.deltaTime);
		for(var i in enemys) {
			i.transform.Translate(Vector3(1.2, 0, 0)*Time.deltaTime);
		}
		if(player.transform.position.x < -3.0) {
			Application.LoadLevel("Game");
		}
	}
}

var player : Transform;
var enemys : Transform[];
private var bonusSound : AudioSource;

private var state;
