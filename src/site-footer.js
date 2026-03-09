class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.renderFooter();
        // this.renderAuthControls();
        
    }

    renderNavbar() {
        this.innerHTML = ``;
    }
}
   

customElements.define('site-footer', SiteFooter);