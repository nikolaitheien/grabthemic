/**
 * Tic Tac Toe
 *
 * A Tic Tac Toe game in HTML/JavaScript/CSS.
 *
 * No dependencies - Uses Vanilla JS
 *
 * @author: Vasanth Krishnamoorthy
 */
var N_SIZE = 3,
    EMPTY = '&nbsp;',
    boxes = [],
    turn = 'X',
    score,
    moves;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
    var board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);

    var identifier = 1;
    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('col' + j, 'row' + i);
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == N_SIZE - i - 1) {
                cell.classList.add('diagonal1');
            }
            cell.identifier = identifier;
            cell.addEventListener('click', set);
            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;
        }
    }

    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
}

/**
 * New game
 */
function startNewGame() {
    new Audio('assets/click.mp3').play();
    score = {
        '🍦': 0,
        '🌉': 0
    };
    moves = 0;
    turn = '🍦';
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });

    document.getElementById('turn').textContent = 'Player ' + turn;
}

/**
 * Check if a win or not
 */
function win(clicked) {
    // Get all cell classes
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
        var items = contains('#tictactoe ' + testClass, turn);
        // winning condition: turn == N_SIZE
        if (items.length == N_SIZE) {
            return true;
        }
    }
    return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}

/**
 * Sets clicked square and also updates the turn.
 */
function set() {
    if (this.innerHTML !== EMPTY) return;

    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;

    // If either of the players win
    if (win(this)) {
        new Audio('assets/win.mp3').play();
        document.getElementById('turn').textContent = 'Player ' + turn + ' wins!';

        boxes.forEach(function (square) {
            if (square.innerHTML === EMPTY)
                square.innerHTML = ' ';
        });
    }

    // If the game draws
    else if (moves === N_SIZE * N_SIZE) {
        new Audio('assets/draw.mp3').play();
        document.getElementById('turn').textContent = 'The game was a draw.';
    }

    // If we're still playing
    else {
        if (turn === '🍦') {
            new Audio('assets/lick.mp3').play();
            turn = '🌉';
        } 

        else {
            new Audio('assets/honk.mp3').play();
            turn = '🍦';
        }

        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

init();