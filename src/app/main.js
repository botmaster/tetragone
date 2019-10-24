// Import styles
import "../assets/styles/main.scss";

// temp
import Logo from "../assets/images/logo.png";
console.log(Logo);

let body = document.querySelector("body");
let image = new Image(200, 200);
image.src = Logo;
//body.appendChild(image);

let isDraging = false;
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
    isDraging = true;
    mouse = {
        x: e.x,
        y: e.y,
        lastX: e.x,
        lastY: e.y
    };
});
// eslint-disable-next-line no-unused-vars
body.addEventListener("mouseup", e => {
    //console.log("mouseup", e);
    isDraging = false;
    currentDiv = null;
    mouse = {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0
    };
});
// eslint-disable-next-line no-unused-vars
body.addEventListener("mousemove", e => {
    //console.log(e);
    if (isDraging) {
        console.log("Je drag !!!");
        mouse.x = e.x;
        mouse.y = e.y;

        if (!currentDiv) {
            console.log(e);
            const { x, y } = mouse;
            const options = { x, y, id: id++ };
            currentDiv = divFactory(options);
            body.appendChild(currentDiv);
        }
        const { x, y, lastX, lastY } = mouse;
        currentDiv.style.width = Math.max(x - lastX, 10) + "px";
        currentDiv.style.height = Math.max(y - lastY, 10) + "px";
    }
});

body.addEventListener("event_del", e => {
    console.log(e.detail);
    document.getElementById(e.detail.id).remove();
});

const divFactory = options => {
    let div = document.createElement("div");
    div.classList.add("shape");
    div.style.left = options.x ? options.x + "px" : 0;
    div.style.top = options.y ? options.y + "px" : 0;
    div.style.zIndex = options.id;
    div.setAttribute("id", options.id);

    let myEvent = new CustomEvent("event_del", {
        detail: {
            id: options.id
        },
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
};
