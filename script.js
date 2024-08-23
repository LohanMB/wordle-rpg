const imageIds = ['Bárbara', 'Camponesa', 'Espadachim', 'Guerreira', 'Lanceiro']; // Lista de IDs das imagens
let correctSequence = []; // Sempre será aleatório a ordem
let selectedSequence = [];
let attemptsLeft = 3; // Começa com 3 tentativas

document.getElementById('check-btn').addEventListener('click', checkSequence);
document.getElementById('reset-btn').addEventListener('click', resetGame);

function initGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Gera a sequência correta aleatória
    correctSequence = shuffleArray([...imageIds]);

    // Embaralha a ordem das imagens para o jogador escolher
    const shuffledSequence = shuffleArray([...correctSequence]);

    shuffledSequence.forEach(imgId => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const img = document.createElement('img');
        img.src = `src/${imgId}.png`; // Ajuste o caminho das imagens conforme necessário
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
    updateSelectedSequenceDisplay(); // Atualiza a exibição da sequência escolhida
}

function checkSequence() {
    if (selectedSequence.length < correctSequence.length) {
        document.getElementById('feedback').innerText = "Selecione todas as imagens antes de verificar.";
        return;
    }

    const cells = document.querySelectorAll('.cell');
    let correctCount = 0;

    cells.forEach((cell, index) => {
        const imgId = cell.querySelector('img').id;
        cell.classList.remove('correct', 'wrong-position', 'incorrect');

        if (imgId === correctSequence[selectedSequence.indexOf(imgId)]) {
            cell.classList.add('correct');
            correctCount++;
        } else if (correctSequence.includes(imgId)) {
            cell.classList.add('wrong-position');
        } else {
            cell.classList.add('incorrect');
        }
    });

    if (arraysEqual(selectedSequence, correctSequence)) {
        document.getElementById('feedback').innerText = "Parabéns! Você acertou!";
        disableGame();
    } else {
        attemptsLeft--;
        document.getElementById('attempts').innerText = `Tentativas restantes: ${attemptsLeft}`;

        if (attemptsLeft > 0) {
            document.getElementById('feedback').innerText = "Tente novamente.";
        } else {
            document.getElementById('feedback').innerText = "Game Over! Você usou todas as tentativas.";
            disableGame();
        }
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
    attemptsLeft = 3;
    document.getElementById('attempts').innerText = `Tentativas restantes: ${attemptsLeft}`;
    document.getElementById('check-btn').disabled = false;
    initGameBoard();
}

function disableGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
    document.getElementById('check-btn').disabled = true;
}

function updateSelectedSequenceDisplay() {
    const selectedSequenceDisplay = document.getElementById('selected-sequence');
    selectedSequenceDisplay.innerHTML = 'Sequência Escolhida: ' + selectedSequence.join(', ');
}

// Inicializa o tabuleiro de jogo na primeira carga da página
initGameBoard();
