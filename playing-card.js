
// --------------------------------------------------
// Custom Element: <playing-card>
// --------------------------------------------------
// This web component shows a single card face (or its back).
// It loads an external HTML template (playing-card.html) so we
// don’t clutter this file with markup.

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
    // Fetch the template file once the card appears
    const response = await fetch('./playing-card.html');
    const html = await response.text();
    
    // Pull out the <template> inside that file
    
    //parse HTML to extract template
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const template = tempDiv.querySelector('template');

    //clone and append template to shadow 
    const content = template.content.cloneNode(true);
    // Copy template content
    this.shadowRoot.appendChild(content);

    // Fill in suit, value, etc.
    this.updateCard();
  }

  // Observe these attributes for changes
  //returns array list of observed attribute
  static get observedAttributes() {
    return ['value', 'suit', 'flipped'];
  }

  // Called whenever value, suit, or flipped changes
  attributeChangedCallback() {
    this.updateCard();
  }

  // Put the right text/icons inside the template
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

    // Add/remove .flipped class so CSS can show back/front
    const card = shadow.querySelector('.card');
    if (card) {
      card.classList.toggle('flipped', flipped);
    }
  }
}

//register in the browser
customElements.define('playing-card', PlayingCard);
