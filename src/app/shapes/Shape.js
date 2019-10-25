import { nodeFactory } from "../utils";
import { getRandomColorHex } from "../utils";

/**
 * Shape Class
 */
class Shape {
    /**
     * Constructor
     * @param id
     * @param width
     * @param height
     * @param x
     * @param y
     */
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

    /**
     * Events initialisation
     */
    initEvents() {
        this.DOM.el.addEventListener("click", this.clickHandler.bind(this), {
            capture: true
        });
    }

    /**
     * Click handler
     * @param e
     */
    clickHandler(e) {
        // console.log(e);
        e.stopPropagation();
        this.spinMe().then(() => {
            let myEvent = new CustomEvent("event_del", {
                detail: { id: this.id },
                bubbles: true
            });

            this.DOM.el.dispatchEvent(myEvent);
        });
    }

    /**
     * Define the shape size
     * @param w
     * @param h
     */
    setSize(w, h) {
        this.width = w;
        this.height = h;
        this.DOM.el.style.width = `${this.width}px`;
        this.DOM.el.style.height = `${this.height}px`;
    }

    /**
     * Animate the shape and return a promise
     * @returns {Promise<unknown>}
     */
    spinMe() {
        this.DOM.el.classList.add("shape--spin");
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, 2000);
        });
    }

    cleanMe() {
        this.DOM.el.removeEventListener("click", this.clickHandler.bind(this), {
            capture: true
        });
    }
}

export default Shape;
