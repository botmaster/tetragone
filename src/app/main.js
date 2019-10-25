// Import styles
import "../assets/styles/main.scss";

// temp
import Logo from "../assets/images/logo.png";
console.log(Logo);
import Shape from "./shapes/Shape";

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
let shapeList = [];

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
            currentDiv = new Shape(id, 10, 10, x, y);
            body.appendChild(currentDiv.DOM.el);
            shapeList.push(currentDiv);
        }
        const { x, y, lastX, lastY } = mouse;
        currentDiv.setSize(Math.max(x - lastX, 10), Math.max(y - lastY, 10));
    }
});

body.addEventListener("event_del", e => {
    console.log(e.detail);
    let shape = shapeList.find(item => item.id === e.detail.id);
    document.getElementById(String(shape.id)).remove();
    shape.cleanMe();
    shapeList = shapeList.filter(item => item !== shape);
    shape = null;
    console.log(shapeList);
});
