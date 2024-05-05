class StackExchangeRedesign {
    constructor() {
        this.initializeStyles();
        this.addButton(document.getElementById('mainbar'), '.d-flex', '#question-mini-list div');
        this.addButton(document.getElementById('mainbar'), '.d-flex', '#questions');
        this.addButton(document.getElementById('user-tab-questions'), 'div', '#js-post-summaries');
        this.addButton(document.getElementById('user-tab-answers'), 'div', '#js-post-summaries');
        this.addButton(document.getElementById('user-tab-tags'), 'div', '#user-tab-tags .ba');
    }

    initializeStyles() {
        const linkElement = document.createElement('style');
        linkElement.innerHTML = `.stackexchange-redesign-button-icon{border-radius:15px;padding:15px;border:0;background:transparent;color:var(--theme-body-font-color);cursor:pointer}.stackexchange-redesign-button-icon.stackexchange-redesign-focus{background:rgba(0,0,0,0.5)}.stackexchange-redesign-button-icon svg path{stroke:var(--theme-body-font-color)}.stackexchange-redesign-button-icon.stackexchange-redesign-focus svg path{stroke:white}.stackexchange-redesign-grid{padding:10px}.stackexchange-redesign-grid>div{display:flex!important;--_ca-bc:var(--bc-medium);border:var(--su-static1) solid var(--_ca-bc);background-color:var(--white);border-radius:var(--br-sm);padding:var(--su12);flex-direction:column!important;position:relative;width:100%;margin:0 auto;text-align:left}.stackexchange-redesign-grid>div>.s-post-summary--stats{display:block!important}.stackexchange-redesign-grid>div>.s-post-summary--stats>div{margin-bottom:10px}`;
        document.head.append(linkElement);
    }

    addButton(container, selector, questionsSelector) {
        if (!container) return;
        const items = container.querySelectorAll(selector);
        if (items.length < 2) return;
        const bar = items[1].querySelector('.flex--item');
        if (!bar) return;

        const questions = document.querySelector(questionsSelector);
        const btn1 = this.createButton(1);
        const btn2 = this.createButton(2);
        if (bar.getElementsByTagName('button').length === 0) {
            bar.append(btn1, btn2);
        }

        this.setInitialView(btn1, btn2, questions);
        btn1.addEventListener('click', () => {
            //console.log('click')
            localStorage.setItem('stackexchange-storage-view', 'col');
            this.setInitialView(btn1, btn2, questions)
        });
        btn2.addEventListener('click', () => {
            //console.log('click')
            localStorage.setItem('stackexchange-storage-view', 'grid');
            this.setInitialView(btn1, btn2, questions)
        });
    }

    createButton(type) {
        const btn = document.createElement('button');
        btn.classList.add('stackexchange-redesign-button-icon');
        btn.innerHTML = type == 1 ? `<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 9.5H20M4 14.5H20M9 4.5V19.5M7.2 19.5H16.8C17.9201 19.5 18.4802 19.5 18.908 19.282C19.2843 19.0903 19.5903 18.7843 19.782 18.408C20 17.9802 20 17.4201 20 16.3V7.7C20 6.5799 20 6.01984 19.782 5.59202C19.5903 5.21569 19.2843 4.90973 18.908 4.71799C18.4802 4.5 17.9201 4.5 16.8 4.5H7.2C6.0799 4.5 5.51984 4.5 5.09202 4.71799C4.71569 4.90973 4.40973 5.21569 4.21799 5.59202C4 6.01984 4 6.57989 4 7.7V16.3C4 17.4201 4 17.9802 4.21799 18.408C4.40973 18.7843 4.71569 19.0903 5.09202 19.282C5.51984 19.5 6.07989 19.5 7.2 19.5Z" stroke="#000000" stroke-width="2"/>
      </svg>`: `<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12L20 12M12 4L12 20M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
        return btn;
    }

    setInitialView(btn1, btn2, questions) {
        if (localStorage.getItem('stackexchange-storage-view') === "grid") {
            btn2.classList.add('stackexchange-redesign-focus');
            if (questions) questions.className = "d-grid grid__3 lg:grid__2 md:grid__1 sm:grid__1 g12 stackexchange-redesign-grid";
            if (btn1.classList.contains('stackexchange-redesign-focus')) {
                btn1.classList.remove('stackexchange-redesign-focus');
            }
        } else {
            btn1.classList.add('stackexchange-redesign-focus');
            if (questions) questions.className = "";
            if (btn2.classList.contains('stackexchange-redesign-focus')) {
                btn2.classList.remove('stackexchange-redesign-focus');
            }
        }
    }
}

new StackExchangeRedesign();

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent the default save action
        //console.log('Ctrl + S was pressed');
        document.getElementById('search').classList.toggle('stackexchange-redesign-quickSearch')
    }
});
const linkElement = document.createElement('style');
linkElement.innerHTML = `.stackexchange-redesign-quickSearch{
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.61) !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px);
  }
  .stackexchange-redesign-quickSearch div{
    max-width:50%;
  }`;
document.head.append(linkElement);


