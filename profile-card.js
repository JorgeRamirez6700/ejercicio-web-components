class ProfileCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.following = false;
        this.render();
    }

    static get observedAttributes() {
        return ["username", "avatar"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    toggleFollow() {
        this.following = !this.following;
        this.shadowRoot.querySelector(".follow-btn").textContent = this.following ? "Siguiendo" : "Seguir";
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles.css">
        <div class="profile-card">
            <img src="${this.getAttribute("avatar") || "default-avatar.png"}" alt="Avatar">
            <div class="username">${this.getAttribute("username") || "Usuario"}</div>
            <button class="follow-btn">Seguir</button>
        </div>
        `;

        this.shadowRoot.querySelector(".follow-btn").addEventListener("click", () => this.toggleFollow());
    }
}

customElements.define("profile-card", ProfileCard);