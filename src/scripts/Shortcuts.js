class Shortcuts {
    constructor(){
        this.setupSearchShortcut();
    }
    setupSearchShortcut(){
        this.injectStylesSearch();
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'f') {
                event.preventDefault(); // Prevent the default find action
                const searchElement = document.getElementById('search');
                if (searchElement) {
                    searchElement.classList.toggle('stackexchange-redesign-quickSearch');
                }
            }
        });
    }
    injectStylesSearch() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .stackexchange-redesign-quickSearch {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.61) !important;
                backdrop-filter: blur(5px) !important;
                -webkit-backdrop-filter: blur(5px);
            }
            .stackexchange-redesign-quickSearch div {
                max-width: 50%;
            }
        `;
        document.head.appendChild(styleElement);
    }
}
