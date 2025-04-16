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

const discardPile = document.getElementById('discard-pile');
const nextBtn = document.getElementById('next-btn');

nextBtn.addEventListener('click', () => {
  if (deck.length === 0) return;

  const topCard = deck.pop(); // remove top card
  renderDeck(); // re-render to show the next card now on top

  // create a copy of the card and move it to the discard pile
  const discardCard = createCardElement(topCard, 0, 1);
  discardCard.classList.add('flipped');
  discardCard.style.position = 'absolute';
  discardCard.style.transform = 'translate(0, 0) rotate(-5deg)';
  discardCard.style.zIndex = 100 + Math.floor(Math.random() * 100); // stack randomness

  discardPile.appendChild(discardCard);
});

