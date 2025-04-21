/**
 * HTML element representing a playing card with value, suit, and flip state.
 * Extends HTMLElement to create a reusable web component.
 */
class PlayingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  //loads the card template and sets up initial state.
  async connectedCallback() {
    const response = await fetch('./playing-card.html');
    const html = await response.text();
    
    //parse HTML to extract template
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const template = tempDiv.querySelector('template');

    //clone and append template to shadow 
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);

    this.updateCard();
  }

  //returns array list of observed attributes
  static get observedAttributes() {
    return ['value', 'suit', 'flipped'];
  }

  attributeChangedCallback() {
    this.updateCard();
  }

  //updates card
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

//register in the browser
customElements.define('playing-card', PlayingCard);
