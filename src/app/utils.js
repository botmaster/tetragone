/**
 * Return an HTML node
 * @param tag
 * @param classes
 * @param id
 * @param styles
 * @returns {HTMLDivElement}
 */
export function nodeFactory(tag = "div", classes = [], id = null, styles = {}) {
    let node = document.createElement(tag);
    node.classList.add(...classes);
    Object.assign(node.style, styles);
    if (id) {
        node.setAttribute("id", id);
    }

    return node;
}

/**
 * Return a random color. Hex format.
 * @returns {string}
 */
export function getRandomColorHex() {
    const colorLetters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += colorLetters[Math.floor(Math.random() * 16)];
    }
    return color;
}
