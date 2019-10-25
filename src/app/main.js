// Import styles
import "../assets/styles/main.scss";

// temp
import Logo from "../assets/images/logo.png";
console.log(Logo);
import Shape from "./shapes/Shape";

let artBoard = document.querySelector("#artBoard");
let isDragging = false;
let currentShape = null;
let mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
};
let id = 0;
let shapeList = [];

artBoard.addEventListener("mousedown", e => {
    //console.log("mousedown", e);
    isDragging = true;
    mouse = {
        x: e.x,
        y: e.y,
        startX: e.x,
        startY: e.y
    };
});

artBoard.addEventListener("mouseup", () => {
    //console.log("mouseup", e);
    if (
        currentShape &&
        (currentShape.width <= 10 || currentShape.height <= 10)
    ) {
        killShape(currentShape);
    }
    isDragging = false;
    currentShape = null;
    mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
});

artBoard.addEventListener("mousemove", e => {
    if (isDragging) {
        console.log("Dragging!!!");
        mouse.x = e.x;
        mouse.y = e.y;

        if (!currentShape) {
            const { x, y } = mouse;
            id++;
            currentShape = new Shape(id, 10, 10, x, y);
            artBoard.appendChild(currentShape.DOM.el);
            shapeList.push(currentShape);
        }
        const { x, y, startX, startY } = mouse;
        currentShape.setSize(Math.abs(x - startX), Math.abs(y - startY));
        if (e.x < mouse.startX) {
            currentShape.setPosX(e.x);
        }
        if (e.y < mouse.startY) {
            currentShape.setPosY(e.y);
        }
    }
});

artBoard.addEventListener("event_del", e => {
    console.log(e.detail);
    let shape = shapeList.find(item => item.id === e.detail.id);
    shape && killShape(shape);
    console.log(shapeList);
});

/**
 * Delete shape object and remove dom element
 * @param shape
 */
function killShape(shape) {
    if (!shape) {
        return;
    }
    document.getElementById(String(shape.id)).remove();
    shape.cleanMe();
    shapeList = shapeList.filter(item => item !== shape);
    shape = null;
}
