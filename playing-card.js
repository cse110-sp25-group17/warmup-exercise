// --------------------------------------------------
// Custom Element: <playing-card>
// --------------------------------------------------
// This web component shows a single card face (or its back).
// It loads an external HTML template (playing-card.html) so we
// don’t clutter this file with markup.

class PlayingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    // Fetch the template file once the card appears
    const response = await fetch('./playing-card.html');
    const html = await response.text();

    // Pull out the <template> inside that file
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const template = tempDiv.querySelector('template');

    const content = template.content.cloneNode(true);
    // Copy template content
    this.shadowRoot.appendChild(content);

    // Fill in suit, value, etc.
    this.updateCard();
  }

  // Observe these attributes for changes
  static get observedAttributes() {
    return ['value', 'suit', 'flipped'];
  }

  // Called whenever value, suit, or flipped changes
  attributeChangedCallback() {
    this.updateCard();
  }

  // Put the right text/icons inside the template
  updateCard() {
    const value = this.getAttribute('value') || 'A';
    const suit = this.getAttribute('suit') || '♠';
    const flipped = this.getAttribute('flipped') === 'true';

    const shadow = this.shadowRoot;
    if (!shadow) return;

    shadow.querySelector('.top-left').textContent = `${value}${suit}`;
    shadow.querySelector('.bottom-right').textContent = `${value}${suit}`;
    shadow.querySelector('.suit').textContent = suit;

    // Add/remove .flipped class so CSS can show back/front
    const card = shadow.querySelector('.card');
    if (card) {
      card.classList.toggle('flipped', flipped);
    }
  }
}

customElements.define('playing-card', PlayingCard);
