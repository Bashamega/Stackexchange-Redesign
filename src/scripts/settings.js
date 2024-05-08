class Setting {
    constructor() {
        this.additionalCSS();
        this.initalView();
    }
    initalView() {
        const Header = document.getElementsByTagName("header")[0];
        if (Header) {
            const Nav = Header.getElementsByClassName('s-topbar--container')[0];
            if (Nav) {
                const container = document.createElement('div');
                const img = document.createElement('img')
                img.src = "https://raw.githubusercontent.com/Bashamega/Stackexchange-Redesign/master/src/logo/logo.png";
                img.alt = "Logo Icon"
                img.className = "stackexchange-redesign-logo-small s-topbar--item"
                container.append(img);
                img.addEventListener('click', this.popup),
                    Nav.append(container)
            }
        }
    }
    additionalCSS() {
        const linkElement = document.createElement('style');
        linkElement.innerHTML = `
        .stackexchange-redesign-logo-small{
            //width:18px;
            height:50px;
            cursor:pointer;
        }
        `
        document.head.append(linkElement);
    }

    popup() {
        const bodyElement = document.getElementsByClassName('stackexchange-redesign-body')[0];
        if(bodyElement){
            bodyElement.remove();
            return;
        }
        const linkElement = document.createElement('style');
        linkElement.innerHTML = `
        .stackexchange-redesign-main .toggle-container {
            margin: 10px 0;
            display: flex;
            align-items: center;
        }
        
        .stackexchange-redesign-main .toggle-label {
            margin-right: 10px;
            font-size: 16px;
        }
        
        .stackexchange-redesign-main .toggle {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }
        
        .stackexchange-redesign-main .toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .stackexchange-redesign-main .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }
        
        .stackexchange-redesign-main .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        .stackexchange-redesign-main input:checked+.slider {
            background-color: #2196F3;
        }
        
        .stackexchange-redesign-main input:checked+.slider:before {
            transform: translateX(26px);
        }
        
        .stackexchange-redesign-main {
            background-color: white;
            border-radius: 15px;
            padding: 15px;
            width: 50%;
        }
        
        .stackexchange-redesign-main h1 {
            text-align: center;
        }
        
        .stackexchange-redesign-main button {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 12px;
        }
        .stackexchange-redesign-body{
            color:black;
            position: fixed;
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
        `
        document.head.append(linkElement);
        const body = document.createElement("main");
        body.className = "stackexchange-redesign-body";
        body.innerHTML = `
        <main class="stackexchange-redesign-main">
    <h1>Settings</h1>
    <div class="toggle-container">
        <label class="toggle-label" for="feature1">Enable grid layout</label>
        <label class="toggle">
            <input type="checkbox" id="feature1">
            <span class="slider"></span>
        </label>
    </div>
    <div class="toggle-container">
        <label class="toggle-label" for="feature2">Enable keyboard shortcuts</label>
        <label class="toggle">
            <input type="checkbox" id="feature2">
            <span class="slider"></span>
        </label>
    </div>
    <button onclick="()=>{window.location.reload();}">Save</button>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const features = ['feature1', 'feature2'];
            features.forEach(feature => {
                const main = document.getElementsByClassName("stackexchange-redesign-main")[0];
                if(main){
                    const checkbox = main.getElementById(feature);
                    checkbox.checked = localStorage.getItem(feature) != 'true'; // Corrected the logic to properly restore the saved state
                    checkbox.addEventListener('change', function () {
                        localStorage.setItem(feature, checkbox.checked);
                    });  
                }
                
            });
        });
    </script>
</main>
        `
        document.body.append(body)
    }
}
new Setting()