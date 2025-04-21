// Deck of Cards Demo
// ==================
// 
// 1. Make a fresh, full deck (52 cards).
// 2. Shuffle the deck.
// 3. Show the deck on screen as a stack.
// 4. Draw the top card to a discard pile.
// 5. Shuffle again at any time.

const suits = ['♠', '♥', '♦', '♣']; //four suits
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; // 13 faces 

/*
  This function creates the deck of cards

  Returns an array of 52 objects: {suit:'♠', value:'A'}
*/

function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

/*
  This function shuffles the deck of cards

  Returns an array of shuffled cards
*/

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // pick random card
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}


/*
  This function creates one card element for the page
*/

function createCardElement(card, index, total) {
  const cardEl = document.createElement('playing-card');
  cardEl.setAttribute('value', card.value);
  cardEl.setAttribute('suit', card.suit);
  cardEl.setAttribute('flipped', 'false'); //start face down

  // lets the user flip only the top most card

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

/*
  This function shows the deck on the screen
*/

function renderDeck(deck) {
  deckContainer.innerHTML = '';
  deck.forEach((card, index) => {
    const cardElement = createCardElement(card, index, deck.length);
    deckContainer.appendChild(cardElement);
  });
}


/*
  This function moves the card to the discard pile
*/

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

// Shuffle button: new deck + clear discard pile

document.getElementById('shuffle-btn').addEventListener('click', () => {
  currentDeck = shuffle(createDeck());
  renderDeck(currentDeck);
  discardPile.innerHTML = ''; // clear discard pile on shuffle
});

// Next button: draw top card

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentDeck.length === 0) return;
  const topCard = currentDeck.pop();
  renderDeck(currentDeck);
  discardCard(topCard);
});
