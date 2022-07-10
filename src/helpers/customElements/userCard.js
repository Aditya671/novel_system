const template = document.createElement('template');
template.innerHTML = `
  <style>
  .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: darkorchid 5px solid;
	}

	.user-card img {
		width: 100%;
	}

	.user-card button {
		cursor: pointer;
		background: darkorchid;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 5px 10px;
	}
  </style>
  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
         <p><a href='mailto:${jkm}' id='#mailto'></p>
         <p><a href='' id='#phone'></p>
         <!--
         <p><slot name="email" /></p>
         <p><slot name="phone" /></p> -->
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    this.shadowRoot.querySelector('#mailId').setAttribute('href',`mailto:${this.getAttribute('email')}`)
    this.shadowRoot.querySelector('#phone').setAttribute('href',`phone:${this.getAttribute('phone')}`)
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if(this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);

{/* <user-card name="John Doe" avatar="https://randomuser.me/api/portraits/men/1.jpg">
    <div slot="email">johndoe@gmail.com</div>
    <div slot="phone">555-555-5555</div>
  </user-card>
  <user-card name="Jane Doe" avatar="https://randomuser.me/api/portraits/women/1.jpg">
    <div slot="email">janedoe@gmail.com</div>
    <div slot="phone">333-333-3333</div>
  </user-card> */}