import { nodeFactory } from "../utils";
import { getRandomColorHex } from "../utils";

class Shape {
    constructor(id, width = 10, height = 10, x = 0, y = 0) {
        this.id = id;
        this.defaultStyle = {
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: getRandomColorHex(),
            zIndex: id
        };

        this.width = width;
        this.height = height;
        this.DOM = {
            el: nodeFactory("div", ["shape"], this.id, this.defaultStyle)
        };

        this.initEvents();
    }

    initEvents() {
        this.DOM.el.addEventListener("click", this.clickHandler, false);
    }

    clickHandler(e) {
        console.log(e);
    }

    setSize(w, h) {
        this.width = w;
        this.height = h;

        this.DOM.el.styles.width = `${this.width}px`;
        this.DOM.el.styles.height = `${this.height}px`;
    }
}

export default Shape;
