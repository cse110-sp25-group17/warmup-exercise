const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function createCardElement(card, index, total) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const front = document.createElement('div');
  front.className = 'card-front';
  front.textContent = `${card.value}${card.suit}`;

  const back = document.createElement('div');
  back.className = 'card-back';

  inner.appendChild(front);
  inner.appendChild(back);
  cardEl.appendChild(inner);

  // Only allow flipping the top card
  cardEl.addEventListener('click', () => {
    if (index === total - 1) {
      cardEl.classList.toggle('flipped');
    }
  });

  cardEl.style.zIndex = index;
  const offsetX = 0.8;
  const offsetY = 0.8;
  cardEl.style.transform = `translate(${index * offsetX}px, ${index * offsetY}px)`;

  return cardEl;
}


const deckContainer = document.getElementById('deck-container');
let deck = shuffle(createDeck());

function renderDeck() {
  deckContainer.innerHTML = '';
  deck.forEach((card, i) => {
    const cardEl = createCardElement(card, i, deck.length);
    deckContainer.appendChild(cardEl);
  });
}

renderDeck();

const shuffleBtn = document.getElementById('shuffle-btn');
shuffleBtn.addEventListener('click', () => {
  deck = shuffle(createDeck());
  renderDeck();
});
