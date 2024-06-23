class Setting {
  constructor() {
    this.additionalCSS();
    this.initalView();
  }

  initalView() {
    const Header = document.getElementsByTagName("header")[0];
    if (Header) {
      const Nav = Header.getElementsByClassName("s-topbar--container")[0];
      if (Nav) {
        const container = document.createElement("div");
        const img = document.createElement("img");
        img.src =
          "https://raw.githubusercontent.com/Bashamega/Stackexchange-Redesign/master/src/logo/logo.png";
        img.alt = "Logo Icon";
        img.className = "stackexchange-redesign-logo-small s-topbar--item";
        container.append(img);
        img.addEventListener("click", this.popup.bind(this));
        Nav.append(container);
      }
    }
  }

  additionalCSS() {
    const linkElement = document.createElement("style");
    linkElement.innerHTML = `
        .stackexchange-redesign-logo-small {
          height: 50px;
          cursor: pointer;
        }
      `;
    document.head.append(linkElement);
  }

  toggle(feature, mainContainer, onchange) {
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "toggle-container";

    const label = document.createElement("label");
    label.className = "toggle-label";
    label.setAttribute("for", feature.id);
    label.textContent = feature.label;
    toggleContainer.appendChild(label);

    const toggle = document.createElement("label");
    toggle.className = "toggle";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = feature.id;
    input.checked = feature.checked === "true";
    input.addEventListener("change", onchange);
    toggle.appendChild(input);

    const slider = document.createElement("span");
    slider.className = "slider";
    toggle.appendChild(slider);

    toggleContainer.appendChild(toggle);
    mainContainer.appendChild(toggleContainer);
  }

  popup(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    const bodyElement = document.getElementsByClassName(
      "stackexchange-redesign-body"
    )[0];
    if (bodyElement) {
      bodyElement.remove();
      return;
    }

    const linkElement = document.createElement("style");
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
        
        .stackexchange-redesign-main input:checked + .slider {
          background-color: #2196F3;
        }
        
        .stackexchange-redesign-main input:checked + .slider:before {
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
        
        .stackexchange-redesign-body {
          color: black;
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
      `;
    document.head.appendChild(linkElement);

    const body = document.createElement("main");
    body.className = "stackexchange-redesign-body";
    const mainContainer = document.createElement("div");
    mainContainer.className = "stackexchange-redesign-main";
    mainContainer.addEventListener("click", (e) => e.stopPropagation()); // Prevent closing when clicking inside the popup

    const header = document.createElement("h1");
    header.textContent = "Settings";
    mainContainer.appendChild(header);

    const features = [
      {
        id: "feature1",
        label: "Enable grid layout",
        checked: localStorage.getItem("feature1"),
      },
      {
        id: "feature2",
        label: "Enable keyboard shortcuts",
        checked: localStorage.getItem("feature2"),
      },
    ];

    features.forEach((feature) => {
      this.toggle(feature, mainContainer, () => {
        localStorage.setItem(
          feature.id,
          document.getElementById(feature.id).checked
        );
      });
    });

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.onclick = () => {
      window.location.reload();
    };
    mainContainer.appendChild(saveButton);

    body.appendChild(mainContainer);
    document.body.appendChild(body);

    // Close the popup when clicking outside of the main container
    body.addEventListener("click", () => body.remove());
  }
}

new Setting();
