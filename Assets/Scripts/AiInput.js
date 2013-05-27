#pragma strict

function Start () {
	boardManager = GameObject.Find("BoardManager").GetComponent(BoardManager);
}

///////////////////////////////////////////////////////////////////////////////
//
// Variable declarations
//
///////////////////////////////////////////////////////////////////////////////


// Required components
private var boardManager : BoardManager;

// Status variables
private var xy : int;

// AI parameters
private var targetType : int;
private var threshold : int;
private var targetXY : int;

///////////////////////////////////////////////////////////////////////////////
//
// Public functions
//
///////////////////////////////////////////////////////////////////////////////

function Reset(aiLevel : int) {
	targetType = aiLevel%10;
	threshold = Mathf.FloorToInt(aiLevel/10);
}

function GetInput(_xy : int, _direction : Vector3) {
	xy = _xy;
	var output : Vector3 = Vector3.zero;
	var avaDir = boardManager.GetAvailableDirection(xy);
	var avaCnt = ((avaDir>>3)&1) + ((avaDir>>2)&1) + ((avaDir>>1)&1) + (avaDir&1);
	if(avaCnt <= 2) {
		return BestWalk(_direction, avaDir, true);
	}

	GetTargetXY();
	output = BestWalk(_direction, avaDir, (Distance(xy, targetXY) < threshold));
	
	return output;
}

function GetTargetXY() {
	var flagXY : int[] = boardManager.GetFlagXY();
	switch(targetType) {
	case 0 :
		targetXY = flagXY[0];
		break;
	case 1 :
		targetXY = flagXY[1];
		break;
	case 2 :
		targetXY = flagXY[2];
		break;
	case 3 :
		targetXY = flagXY[3];
		break;
	case 4 :
		targetXY = flagXY[4];
		break;
	case 5 :
		targetXY = boardManager.GetPlayerXY();
		break;
	}
	
	return;
}

function BestWalk(_direction : Vector3, avaDir : int, randomMove : boolean) {
	var dim = boardManager.GetBoardDimension();
	var reversed = _direction*(-1);
	var max : int = 100;
	var dist : int[] = [max, max, max, max];
	
	if(((avaDir & 1) != 0) && (reversed != Vector3.left)) {
		if(randomMove) {
			dist[0] = 0;
		} else {
			dist[0] = Distance(xy-2, targetXY);
		}
	}
	if(((avaDir & 2) != 0) && (reversed != Vector3.forward)) {
		if(randomMove) {
			dist[1] = 0;
		} else {
			dist[1] = Distance(xy-dim[0], targetXY);
		}
	}
	if(((avaDir & 4) != 0) && (reversed != Vector3.right)) {
		if(randomMove) {
			dist[2] = 0;
		} else {
			dist[2] = Distance(xy+2, targetXY);
		}
	}
	if(((avaDir & 8) != 0) && (reversed != Vector3.back)) {
		if(randomMove) {
			dist[3] = 0;
		} else {
			dist[3] = Distance(xy+dim[0], targetXY);
		}
	}
	
	var i : int;
	var min : int = 0;
	var output : int[] = [0, -1, -1, -1];
	var cnt : int = 0;
	for(i = 1; i < 4; i++) {
		if(dist[i] < dist[min]) {
			min = i;
			cnt = 0;
			output[cnt] = i;
		} else if(dist[i] == dist[min]) {
			cnt++;
			output[cnt] = i;
		}
	}
	
	var r = Mathf.FloorToInt(Random.Range(0, cnt+1));
	var newDirection : Vector3 = Vector3.zero;
	switch(output[r]) {
	case 0:
		newDirection = Vector3.left;
		break;
	case 1:
		newDirection = Vector3.forward;
		break;
	case 2:
		newDirection = Vector3.right;
		break;
	case 3:
		newDirection = Vector3.back;
		break;
	}	
	
	return newDirection;
}

function Distance(xy1 : int, xy2 : int) {
	var dim = boardManager.GetBoardDimension();
	var distX : int = (xy1 % dim[0]) - (xy2 % dim[0]);
	var distY : int = Mathf.FloorToInt(xy1 / dim[0]) - Mathf.FloorToInt(xy2 / dim[0]);
	return Mathf.Abs(distX) + Mathf.Abs(distY);
}
