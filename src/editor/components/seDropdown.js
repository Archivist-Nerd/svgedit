const template = document.createElement('template');
template.innerHTML = `
<style>
    button {
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        padding: 1px 3px;
        margin-left: 3px;
    }
    .closed {
        display: none;
    }
    </style>
  <div>
    <input type="number" value=10></input>
    <button>
      <img class="svg_icon" src="./images/arrow_down.svg" alt="icon" width="7" height="7" />
    </button>
    <div class="se-options closed">
        <slot></slot>
    </div>
  </div>
`;
/**
 * @class SEDropDown
 */
export class DropDown extends HTMLElement {
  /**
    * @function constructor
    */
  constructor () {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('button');
    this.$options = this._shadowRoot.querySelector('.se-options');
    // the last element of the div is the slot
    // we retrieve all elements added in the slot (i.e. se-dropdown-item)
    this.$elements = this.$options.lastElementChild.assignedElements();
  }
  /**
   * @function connectedCallback
   * @returns {void}
   */
  connectedCallback () {
    const onClickHandler = (ev) => {
      ev.stopPropagation();
      console.log(ev);
      switch (ev.target.nodeName) {
      case 'BUTTON':
        this.$options.classList.toggle('closed');
        break;
      case 'SE-OPTION':
        if (ev.target.getAttribute('data-val')) {
          window.editor.canvas.zoomChanged(window, ev.target.getAttribute('data-val'));
        } else {
          const ctl = {value: Number.parseFloat(ev.target.getAttribute('data-per'))};
          const zoomlevel = ctl.value / 100;
          if (zoomlevel < 0.001) {
            ctl.value = 0.1;
            return;
          }
          const zoom = window.editor.canvas.getZoom();
          const wArea = document.getElementById('workarea');
          window.editor.canvas.zoomChanged(window, {
            width: 0,
            height: 0,
            // center pt of scroll position
            x: (wArea.scrollLeft + wArea.clientWidth / 2) / zoom,
            y: (wArea.scrollTop + wArea.clientHeight / 2) / zoom,
            zoom: zoomlevel
          }, true);
        }
        break;
      }
    };
    this.$options.addEventListener('click', onClickHandler);
    this.$button.addEventListener('click', onClickHandler);
  }
}

// Register
customElements.define('se-dropdown', DropDown);
