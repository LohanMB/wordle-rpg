const correctSequence = ['img1', 'img3', 'img5', 'img2', 'img4'];
let selectedSequence = [];

document.getElementById('check-btn').addEventListener('click', checkSequence);
document.getElementById('reset-btn').addEventListener('click', resetGame);

function initGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Embaralha a ordem das imagens
    const shuffledSequence = shuffleArray([...correctSequence]);

    shuffledSequence.forEach(imgId => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const img = document.createElement('img');
        img.src = `src/${imgId}.png`;
        img.alt = `Image ${imgId}`;
        img.id = imgId;
        cell.appendChild(img);
        gameBoard.appendChild(cell);
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const cell = event.currentTarget;
    const imgId = cell.querySelector('img').id;

    if (selectedSequence.includes(imgId)) {
        selectedSequence = selectedSequence.filter(id => id !== imgId);
        cell.classList.remove('selected');
    } else if (selectedSequence.length < correctSequence.length) {
        selectedSequence.push(imgId);
        cell.classList.add('selected');
    }
}

function checkSequence() {
    if (selectedSequence.length < correctSequence.length) {
        document.getElementById('feedback').innerText = "Selecione todas as imagens antes de verificar.";
        return;
    }

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const imgId = cell.querySelector('img').id;
        cell.classList.remove('correct', 'wrong-position', 'incorrect');

        if (imgId === correctSequence[selectedSequence.indexOf(imgId)]) {
            cell.classList.add('correct');
        } else if (correctSequence.includes(imgId)) {
            cell.classList.add('wrong-position');
        } else {
            cell.classList.add('incorrect');
        }
    });

    if (arraysEqual(selectedSequence, correctSequence)) {
        document.getElementById('feedback').innerText = "Parabéns! Você acertou!";
    } else {
        document.getElementById('feedback').innerText = "Tente novamente.";
    }

    resetSelection();
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function resetSelection() {
    selectedSequence = [];
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('selected'));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetGame() {
    document.getElementById('feedback').innerText = "";
    selectedSequence = [];
    initGameBoard();
}

// Inicializa o tabuleiro de jogo na primeira carga da página
initGameBoard();
