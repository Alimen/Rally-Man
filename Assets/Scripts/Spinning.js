#pragma strict

function Update () {
	transform.Rotate(Vector3(0, 360, 0)*Time.deltaTime);
}