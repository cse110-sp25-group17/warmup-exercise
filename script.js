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
  const cardEl = document.createElement('playing-card');
  cardEl.setAttribute('value', card.value);
  cardEl.setAttribute('suit', card.suit);
  cardEl.setAttribute('flipped', 'false');

  // Flips top Card
  cardEl.addEventListener('click', () => {
    if (index === total - 1) {
      const isFlipped = cardEl.getAttribute('flipped') === 'true';
      cardEl.setAttribute('flipped', (!isFlipped).toString());
    }
  });

  // Visual stacking (optional style)
  const offsetX = 0.8;
  const offsetY = 0.8;
  cardEl.style.zIndex = index;
  cardEl.style.position = 'absolute';
  cardEl.style.transform = `translate(${index * offsetX}px, ${index * offsetY}px)`;

  return cardEl;
}

const deckContainer = document.getElementById('deck-container');
let currentDeck = shuffle(createDeck());

function renderDeck(deck) {
  deckContainer.innerHTML = '';
  deckContainer.style.position = 'relative'; // Important for absolute stacking
  deck.forEach((card, index) => {
    const cardElement = createCardElement(card, index, deck.length);
    deckContainer.appendChild(cardElement);
  });
}

renderDeck(currentDeck);

document.getElementById('shuffle-btn').addEventListener('click', () => {
  currentDeck = shuffle(createDeck());
  renderDeck(currentDeck);
});
