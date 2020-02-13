var names = [ prompt(`PLAYER-1'S NAME : `), prompt(`PLAYER-2'S NAME :`) ];
TicTacTocGame();

function TicTacTocGame() {
	const ceilElements = Array.from(document.querySelectorAll('.col'));
	let circleTurn = true;
	var winner = false;
	const winningText = document.querySelector('.winning-text');
	const winningMessange = document.getElementById('winningMessange');
	const restartButton = document.getElementById('RestartButton');

	// players
	const player1 = document.getElementById('player1');
	const player2 = document.getElementById('player2');

	// players' and draw's score
	const player1Score = document.getElementById('player1Score');
	const player2Score = document.getElementById('player2Score');
	const drawScore = document.getElementById('draw');

	// scores' and draw's value
	var score1 = 0;
	var score2 = 0;
	var drawValue = 0;

	// setup players' name
	player1.innerHTML = names[0] + ' ✖️';
	player2.innerHTML = names[1] + ' ⭕️';

	const board = new Board();

	start();
	restartButton.addEventListener('click', start);

	function start() {
		board.positions.forEach((el) => {
			winner = false;
			el.innerText = '';
			el.classList.remove('winner');
			el.classList.remove('✖️');
			el.classList.remove('⭕️');
			el.removeEventListener('click', haddleClick);
			el.addEventListener('click', haddleClick, { once: true });
		});

		winningMessange.classList.remove('show');
	}

	function haddleClick(e) {
		const ceil = e.target;
		const currentPlayer = circleTurn ? '✖️' : '⭕️';

		ceil.classList.add(currentPlayer);

		if (!winner) placerMark(ceil, currentPlayer);

		if (board.checkForWinner()) {
			endGame(false);
		} else if (isDraw()) {
			endGame(true);
		} else {
			swapTurn();
		}
	}
	function isDraw() {
		return ceilElements.every((ceil) => {
			return ceil.innerText === '⭕️' || ceil.innerText === '✖️';
		});
	}

	function endGame(draw) {
		if (draw) {
			drawValue += 1;
			drawScore.innerText = drawValue;
			winningText.innerText = 'Draw!';
			winningMessange.classList.add('show');
		}
	}

	function placerMark(ceil, currentPlayer) {
		ceil.innerText = currentPlayer;
	}

	function swapTurn() {
		circleTurn = !circleTurn;
	}

	function Board() {
		this.positions = ceilElements;

		this.checkForWinner = () => {
			const winnerCombinations = [
				[ 0, 1, 2 ],
				[ 3, 4, 5 ],
				[ 6, 7, 8 ],
				[ 0, 4, 8 ],
				[ 2, 4, 6 ],
				[ 0, 3, 6 ],
				[ 1, 4, 7 ],
				[ 2, 5, 8 ]
			];

			const positions = this.positions;

			winnerCombinations.forEach((winningCombo) => {
				const pos0InnerText = positions[winningCombo[0]].innerText;
				const pos1InnerText = positions[winningCombo[1]].innerText;
				const pos2InnerText = positions[winningCombo[2]].innerText;

				const isWinnigCombo =
					pos0InnerText !== '' && pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;

				if (isWinnigCombo) {
					winner = true;
					winningCombo.forEach((index) => {
						var winnerClass = positions[index].innerText;
						positions[index].className += ' winner';

						if (winnerClass === '⭕️') {
							// set points
							score2 += 1 / 3;
							player2Score.innerText = Math.ceil(score2);

							positions[index].classList.remove('0');
							winningText.innerText = `⭕️'s Wins!`;
						} else {
							// set points
							score1 += 1 / 3;
							player1Score.innerText = Math.ceil(score1);

							positions[index].classList.remove('X');
							winningText.innerText = `✖️'s Wins!`;
						}

						winningMessange.classList.add('show');
					});
				}
			});

			return winner;
		};
	}
}
