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
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.defaultStyle = {
            left: `${this.x}px`,
            top: `${this.y}px`,
            width: `${this.width}px`,
            height: `${this.height}px`,
            backgroundColor: getRandomColorHex(),
            zIndex: id
        };
        this.DOM = {
            el: nodeFactory("div", ["shape"], this.id, this.defaultStyle)
        };
        this.isSpining = false;

        this.initEvents();
    }

    /**
     * Events initialisation
     */
    initEvents() {
        this.DOM.el.addEventListener(
            "dblclick",
            this.dblclickHandler.bind(this),
            {
                capture: true
            }
        );
    }

    /**
     * DoubleClick handler
     * @param e
     */
    dblclickHandler(e) {
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

    setPosX(x) {
        this.x = x;
        this.DOM.el.style.left = `${this.x}px`;
    }

    setPosY(y) {
        this.y = y;
        this.DOM.el.style.top = `${this.y}px`;
    }

    /**
     * Animate the shape and return a promise
     * @returns {Promise<unknown>}
     */
    spinMe() {
        this.isSpining = true;
        this.DOM.el.classList.add("shape--spin");
        return new Promise(resolve => {
            setTimeout(() => {
                this.isSpining = false;
                resolve();
            }, 2000);
        });
    }

    cleanMe() {
        this.DOM.el.removeEventListener(
            "dblclick",
            this.dblclickHandler.bind(this),
            {
                capture: true
            }
        );
    }
}

export default Shape;
