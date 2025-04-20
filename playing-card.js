class PlayingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const response = await fetch('./playing-card.html');
    const html = await response.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const template = tempDiv.querySelector('template');

    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);

    this.updateCard();
  }

  static get observedAttributes() {
    return ['value', 'suit', 'flipped'];
  }

  attributeChangedCallback() {
    this.updateCard();
  }

  updateCard() {
    const value = this.getAttribute('value') || 'A';
    const suit = this.getAttribute('suit') || '♠';
    const flipped = this.getAttribute('flipped') === 'true';

    const shadow = this.shadowRoot;
    if (!shadow) return;

    shadow.querySelector('.top-left').textContent = `${value}${suit}`;
    shadow.querySelector('.bottom-right').textContent = `${value}${suit}`;
    shadow.querySelector('.suit').textContent = suit;

    const card = shadow.querySelector('.card');
    if (card) {
      card.classList.toggle('flipped', flipped);
    }
  }
}

customElements.define('playing-card', PlayingCard);
