const template = document.createElement('template');
template.innerHTML = `
  <style>
  </style>
  <slot></slot>
`;
/**
 * @class OptionComponent
 */
export class OptionComponent extends HTMLElement {
  /**
    * @function constructor
    */
  constructor () {
    super();
    // create the shadowDom and insert the template
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    // locate the component
    // this.$elements = this.lastElementChild.assignedElements(); use lastChild for text
  }
  /**
   * @function connectedCallback
   * @returns {void}
   */
  connectedCallback () {
    this.addEventListener('click', (e) => {
      this.click();
      e.preventDefault();
    });
  }
}

// Register
customElements.define('se-option', OptionComponent);
