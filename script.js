//suits and values of the deck
const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

//makes a 52 card deck
function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

//shuffle deck with Fisher-Yates algorithm
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

//create a card element to be visible and interactable
function createCardElement(card, index, total) {
  const cardEl = document.createElement('playing-card');
  cardEl.setAttribute('value', card.value);
  cardEl.setAttribute('suit', card.suit);
  cardEl.setAttribute('flipped', 'false');

  //only interactable if on top
  if (index === total - 1) {
    cardEl.addEventListener('click', () => {
      const isFlipped = cardEl.getAttribute('flipped') === 'true';
      cardEl.setAttribute('flipped', (!isFlipped).toString());
    });
  }

  //offset for stack look
  const offsetX = 0.8;
  const offsetY = 0.8;
  cardEl.style.zIndex = index;
  cardEl.style.position = 'absolute';
  cardEl.style.transform = `translate(${index * offsetX}px, ${index * offsetY}px)`;

  return cardEl;
}

const deckContainer = document.getElementById('deck-container');
const discardPile = document.getElementById('discard-pile');

let currentDeck = shuffle(createDeck());

//render deck to deck container
function renderDeck(deck) {
  deckContainer.innerHTML = '';
  deck.forEach((card, index) => {
    const cardElement = createCardElement(card, index, deck.length);
    deckContainer.appendChild(cardElement);
  });
}

//moves a card to the discard pile with slight rotation
function discardCard(card) {
  const cardEl = document.createElement('playing-card');
  cardEl.setAttribute('value', card.value);
  cardEl.setAttribute('suit', card.suit);
  cardEl.setAttribute('flipped', 'true');
  cardEl.style.position = 'absolute';
  cardEl.style.transform = `translate(0, 0) rotate(${Math.random() * 10 - 5}deg)`;
  cardEl.style.zIndex = 100 + Math.floor(Math.random() * 100);
  discardPile.appendChild(cardEl);
}

renderDeck(currentDeck);

//shuffle button functionality
document.getElementById('shuffle-btn').addEventListener('click', () => {
  currentDeck = shuffle(createDeck());
  renderDeck(currentDeck);
  discardPile.innerHTML = ''; // clear discard pile on shuffle
});

//next button functionality
document.getElementById('next-btn').addEventListener('click', () => {
  if (currentDeck.length === 0) return;
  const topCard = currentDeck.pop();
  renderDeck(currentDeck);
  discardCard(topCard);
});
