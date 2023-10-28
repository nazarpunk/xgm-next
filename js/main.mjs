class BasicElement extends HTMLElement {
    connectedCallback() {

        this.textContent = 'Just a basic custom element. + 2222'
    }
}

console.log(11)


customElements.define('basic-element', BasicElement)
