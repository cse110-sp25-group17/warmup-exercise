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

function createCardElement(card) {
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

  cardEl.addEventListener('click', () => {
    cardEl.classList.toggle('flipped');
  });

  return cardEl;
}

const deckContainer = document.getElementById('deck-container');
const deck = shuffle(createDeck());

deck.forEach((card, i) => {
  const cardEl = createCardElement(card);

  // 控制堆叠顺序
  cardEl.style.zIndex = i;

  // 给每张牌一个微小偏移，参数可以自行调节
  const offsetX = 0.8;  // 横向每张牌偏移 0.8px
  const offsetY = 0.8;  // 纵向每张牌偏移 0.8px
  cardEl.style.transform = `translate(${i * offsetX}px, ${i * offsetY}px)`;

  deckContainer.appendChild(cardEl);
});
