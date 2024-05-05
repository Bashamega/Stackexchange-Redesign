class Shortcuts {
    constructor(){
        this.search;
    }
    search(){
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
    }
}