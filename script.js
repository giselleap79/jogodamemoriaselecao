// Lista dos craques da Seleção
const players = [
    { name: "Vini Jr.", emoji: "⚡" },
    { name: "Rodrygo", emoji: "🪄" },
    { name: "Neymar Jr.", emoji: "🔟" },
    { name: "Endrick", emoji: "💎" },
    { name: "Raphinha", emoji: "🏹" },
    { name: "Bruno G.", emoji: "🦁" },
    { name: "Marquinhos", emoji: "🛡️" },
    { name: "Alisson", emoji: "🧤" }
];

// Duplica a lista para formar os pares do jogo da memória
let gameCards = [...players, ...players];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

const container = document.querySelector('.game-container');
const winScreen = document.getElementById('winScreen');

function initGame() {
    container.innerHTML = "";
    matchedCount = 0;
    
    // Embaralha o array de cartas
    gameCards.sort(() => Math.random() - 0.5);

    // Cria os elementos HTML das cartas dinamicamente
    gameCards.forEach((player, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.playerName = player.name;

        card.innerHTML = `
            <div class="card-face card-back">⚽</div>
            <div class="card-face card-front">
                <span class="player-emoji">${player.emoji}</span>
                <span class="player-name">${player.name}</span>
            </div>
        `;

        card.addEventListener('click', flipCard);
        container.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; // Evita clicar duas vezes na mesma carta

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.playerName === secondCard.dataset.playerName;
    
    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    
    matchedCount += 2;
    if (matchedCount === gameCards.length) {
        setTimeout(() => {
            winScreen.classList.add('show');
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    // Tempo de espera para o usuário decorar antes de desvirar
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1200); 
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function resetGame() {
    winScreen.classList.remove('show');
    initGame();
}

// Inicializa ao carregar a página
initGame();
