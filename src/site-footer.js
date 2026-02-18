class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Footer: single source of truth -->
              <footer>
      <section id="footer">
        <div>Help</div>
        <div>Resources</div>
      </section>
    </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);