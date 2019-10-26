// Import styles
import "../assets/styles/main.scss";
import "./polyfills";

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
let shapeTrash = [];

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

    // Change pointer
    artBoard.classList.remove("cursor--resize");
});

artBoard.addEventListener("mousemove", e => {
    if (isDragging) {
        console.log("Dragging!!!");

        // Save mouse position
        mouse.x = e.x;
        mouse.y = e.y;

        // Create shape if needed
        if (!currentShape) {
            const { x, y } = mouse;
            id++;
            currentShape = new Shape(id, 10, 10, x, y);
            artBoard.appendChild(currentShape.DOM.el);
            shapeList.push(currentShape);
        }

        // Change pointer
        artBoard.classList.add("cursor--resize");

        // Size the shape.
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

artBoard.addEventListener(Shape.EVENT_SHAPE_CLICK, async e => {
    console.log(e.detail);
    let shape = shapeList.find(item => item.id === e.detail.id);
    shapeTrash.push(shape);
    await shape.spinMe();
    if (shapeTrash.lastIndexOf(shape) === shapeTrash.length - 1) {
        shapeTrash.forEach(item => {
            item && killShape(item);
            console.log(shapeList);
            shapeTrash = [];
        });
    }
});

/**
 * Delete shape object and remove dom element
 * @param shape
 */
function killShape(shape) {
    if (!shape) {
        return;
    }
    let el = document.getElementById(String(shape.id));
    el.parentNode.removeChild(el);
    shape.cleanMe();
    shapeList = shapeList.filter(item => item !== shape);
    shape = null;
}
