// Import styles
import "../assets/styles/main.scss";

// temp
import Logo from "../assets/images/logo.png";
console.log(Logo);

let body = document.querySelector("body");
let image = new Image(200, 200);
image.src = Logo;
body.appendChild(image);

let isDragging = false;
let currentDiv = null;
let mouse = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
};
let id = 0;

body.addEventListener("mousedown", e => {
    //console.log("mousedown", e);
    isDragging = true;
    mouse = {
        x: e.x,
        y: e.y,
        lastX: e.x,
        lastY: e.y
    };
});

body.addEventListener("mouseup", () => {
    //console.log("mouseup", e);
    isDragging = false;
    currentDiv = null;
    mouse = {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0
    };
});

body.addEventListener("mousemove", e => {
    //console.log(e);
    if (isDragging) {
        console.log("Je drag !!!");
        mouse.x = e.x;
        mouse.y = e.y;

        if (!currentDiv) {
            console.log(e);
            const { x, y } = mouse;
            id++;
            const styles = {
                left: `${x}px`,
                top: `${y}px`,
                zIndex: id,
                backgroundColor: getRandomColorHex()
            };
            currentDiv = divFactory(["shape"], id, styles);
            body.appendChild(currentDiv);
        }
        const { x, y, lastX, lastY } = mouse;
        currentDiv.style.width = Math.max(x - lastX, 10) + "px";
        currentDiv.style.height = Math.max(y - lastY, 10) + "px";
    }
});

body.addEventListener("event_del", e => {
    console.log(e.detail);
    document.getElementById(String(e.detail.id)).remove();
});

function divFactory(classes = [], id = null, styles = {}) {
    let div = document.createElement("div");
    div.classList.add(...classes);
    Object.assign(div.style, styles);
    if (id) {
        div.setAttribute("id", id);
    }

    let myEvent = new CustomEvent("event_del", {
        detail: { id },
        bubbles: true
    });

    div.addEventListener(
        "click",
        e => {
            e.stopPropagation();
            div.dispatchEvent(myEvent);
        },
        { capture: true }
    );
    div.addEventListener("mousedown", e => {
        e.stopPropagation();
    });
    return div;
}

function getRandomColorHex() {
    const colorLetters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += colorLetters[Math.floor(Math.random() * 16)];
    }
    return color;
}
