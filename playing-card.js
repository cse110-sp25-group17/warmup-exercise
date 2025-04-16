class PlayingCard extends HTMLElement {
    constructor() {
      super();
  
      const suit = this.getAttribute('suit') || '♠';
      const value = this.getAttribute('value') || 'A';
      const flipped = this.getAttribute('flipped') === 'true';
  
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          .card {
            width: 120px;
            height: 180px;
            perspective: 1000px;
            cursor: pointer;
          }
  
          .card-inner {
            width: 100%;
            height: 100%;
            position: relative;
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }
  
          .flipped .card-inner {
            transform: rotateY(180deg);
          }
  
          .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px;
            font-family: monospace;
            box-shadow: 0 0 8px rgba(0,255,255,0.4);
          }
  
          .card-front {
            background: linear-gradient(to bottom, #001010, #002020);
            color: #0ff;
          }
  
          .card-back {
            background: url('./card-back.png') center/cover no-repeat;
            transform: rotateY(180deg);
          }
  
          .corner {
            font-size: 18px;
          }
  
          .top-left {
            align-self: flex-start;
          }
  
          .bottom-right {
            align-self: flex-end;
          }
  
          .suit {
            font-size: 48px;
            text-align: center;
          }
        </style>
  
        <div class="card ${flipped ? 'flipped' : ''}">
          <div class="card-inner">
            <div class="card-face card-front">
              <span class="corner top-left">${value}${suit}</span>
              <span class="suit">${suit}</span>
              <span class="corner bottom-right">${value}${suit}</span>
            </div>
            <div class="card-face card-back"></div>
          </div>
        </div>
      `;
  
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    connectedCallback() {
      this.shadowRoot.querySelector('.card').addEventListener('click', () => {
        const flipped = this.getAttribute('flipped') === 'true';
        this.setAttribute('flipped', (!flipped).toString());
        this.shadowRoot.querySelector('.card').classList.toggle('flipped');
      });
    }
  }
  
  customElements.define('playing-card', PlayingCard);
  