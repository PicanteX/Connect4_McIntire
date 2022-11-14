
let gameBoard = document.getElementById("gameBoard");
let columnHeight = 6;
let rowWidth = 7;

let board;

const colorPlayerOne = "Green";
const colorPlayerTwo = "Blue";
let turn=0;

let column;
let lockGame = false;

function boardCreate(){
	board = new Array(columnHeight).fill(null).map(()=>new Array(rowWidth).fill(null));
}

boardCreate();

function playerTurn() {
	turn++;
	return turn % 2 === 0 ? colorPlayerOne : colorPlayerTwo;
}

function renderGame() {

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			board[i][j] = document.createElement("div");
			board[i][j].className = "gameHole";
			board[i][j].setAttribute('id', String(j)+'-'+String(i));
			board[i][j].setAttribute('value', String(j)+'-'+String(i));
			gameBoard.appendChild(board[i][j]);
			board[i][j].addEventListener("click",playState);
		}
	}
}
renderGame();

function colorCheckBoard(column) {
	let pieceDrop = [];

	for (let i = board.length - 1 ; i >= 0; i--) {
		if (board[i][column].style.backgroundColor === "") {
			pieceDrop.push(board[i][column]);
		}
	}
	if (pieceDrop.length > 0) {
		pieceDrop[0].style.backgroundColor = playerTurn();
		return pieceDrop[0].style.backgroundColor;
	}
}

let array;
let gameToken;

function winnerAnnounce(array,gameToken) {

	let winner = gameToken;

	// checks to see if a row has (4) consecutive matching colors other than the base-game color across its columns
    for (let j = 0; j < columnHeight; j++) {
        for (let i = 0; i < rowWidth - 3; i++) {
			if (array[j][i].style.backgroundColor === gameToken
				&& array[j][i+1].style.backgroundColor === gameToken
				&& array[j][i+2].style.backgroundColor === gameToken
				&& array[j][i+3].style.backgroundColor === gameToken) {
                return winner;
            }
        }
    }

//   checks to see if a column has (4) consecutive matching colors other than the base-game color across its rows
    for (let i = 0; i < rowWidth; i++) {
        for (let j = 0; j < columnHeight - 3; j++) {
			if (array[j][i].style.backgroundColor === gameToken 
				&& array[j+1][i].style.backgroundColor === gameToken 
				&& array[j+2][i].style.backgroundColor === gameToken 
				&& array[j+3][i].style.backgroundColor === gameToken) {
                return winner;
            }
        }
    }
 
// checks to see if diagonal win condition is met   
    for (let j = columnHeight - 1; j > 2; j--) {
        for (let i = 0; i < rowWidth - 3; i++) {
			if (array[j][i].style.backgroundColor === gameToken
				&& array[j-1][i+1].style.backgroundColor === gameToken 
				&& array[j-2][i+2].style.backgroundColor === gameToken
				&& array[j-3][i+3].style.backgroundColor === gameToken) {
                return winner;
            }
        }
    }
// checks to see if the other diagonal direction has the win condition
    for (let j = columnHeight - 1; j > 2; j--) {
        for (let i = rowWidth - 1; i > 2; i--) {
			if (array[j][i].style.backgroundColor === gameToken 
				&& array[j-1][i-1].style.backgroundColor === gameToken 
				&& array[j-2][i-2].style.backgroundColor === gameToken 
				&& array[j-3][j-3].style.backgroundColor === gameToken) {
                return winner;
            }
        }
    }
    return null;
}


function playState(event) {
	if(lockGame){
		return
	}
	let h2 = document.getElementById("h2");
	let column=event.srcElement.id.split("-")[0]
	let gameState;
	latestTurn = colorCheckBoard(column);
	if (turn > 6 && !lockGame) {

		gameState = winnerAnnounce(board,latestTurn);
		if (gameState !== null) {
			let winText = document.createElement("p");
			let content = document.createTextNode("Winner : " + gameState.toUpperCase());

			winText.appendChild(content);

			document.body.appendChild(winText);
			document.body.style.backgroundColor = gameState;
			lockGame = true;
			latestTurn = null;
			gameState=null;
		}
	}
	if (turn === 42 && gameState === null) {
        let winText = document.createElement("p");
        let content = document.createTextNode("The game ends in a Tie. Try again!");
        winText.appendChild(content);
		document.body.appendChild(winText);
		lockGame = true;
		latestTurn = null;
		gameState=null;
	}
}

function replay(){
	location.reload();
	resetGame(gameState,latestTurn);
}
let replayButton = document.getElementById("replayButton");
replayButton.addEventListener("click", replay);

function resetGame(){
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			board[i][j].style.backgroundColor = "";
		}
	}
}