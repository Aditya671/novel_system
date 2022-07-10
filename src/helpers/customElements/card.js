const template = document.createElement('template');
template.innerHTML = `<style>h2{color:#ecd21f;}</style><button>buy It!<button>
<div><slot/><div><slot name='price'/></div></div>`
function chnageProduct(){
   document.querySelector('h2').setAttribute('name','Aditya')
}

class MyCard extends HTMLElement {
   // Supply all attributes on which we want to add changes
   static get observedAttributes(){
      return ['name']
   }
   constructor(){
      super()
      this.attachShadow({mode:'open'})
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector('h2').innerText = this.getAttribute('name')

   }
   get name(){
      return this.shadowRoot.querySelector('h2').innerText ;
   }
   set name(val){
      return this.shadowRoot.querySelector('h2').innerText = val ;
   }
   // LifeCycle Method to Update the value by telling the browser what to do
   attributeChangeCallback(name,oldValue,newValue){
      if(name === 'name'){
         this.shadowRoot.querySelector('h2').innerText = newValue;
      }
   }
   // listen to event Listeners
   connectedCallback(){
      this.shadowRoot.querySelector('button').addEventListener('click',
         function(){this.dispatchEvent(new Event('buy',{}))}
      )
   }
   // listen to event Listeners
   disconnectedCallback(){
      this.shadowRoot.querySelector('button')
   }
}
window.customElements.define('card',MyCard)

{/* <card name='Aditya'>
   some really cool stuff to show
   <div slot='price'>$1.99</div>
</card> */}