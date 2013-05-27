#pragma strict

function Start() {
	levelScreen = GameObject.Find("LevelScreen").GetComponent(GUITexture);
	levelLabel = GameObject.Find("LevelScreen/LEVEL").GetComponent(GUIText);
	lifeLabel = GameObject.Find("LevelScreen/LIFE label").GetComponent(GUITexture);
	lifeCounter = GameObject.Find("LevelScreen/LIFE").GetComponent(GUIText);
	
	Stop();
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////

// Required components
private var levelScreen : GUITexture;
private var levelLabel : GUIText;
private var lifeLabel : GUITexture;
private var lifeCounter : GUIText;

// Status variables
private var level : int;
private var life : int;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset(_level : int, _life : int) {
	level = _level;
	levelLabel.text = Mathf.CeilToInt((level*1.0)/3).ToString() + " - " + ((level-1)%3+1).ToString();
	
	life = _life;
	lifeCounter.text = "X " + life.ToString();
	
	levelScreen.enabled = true;
	levelLabel.enabled = true;
	lifeLabel.enabled = true;
	lifeCounter.enabled = true;
}

function Stop() {
	levelScreen.enabled = false;
	levelLabel.enabled = false;
	lifeLabel.enabled = false;
	lifeCounter.enabled = false;
}
