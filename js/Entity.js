// this class is the base class for all things that appear in the game

class Entity {
    constructor (){}

    render (root, src, x, y, z) {
        this.x = x;
        this.y = y;
        this.root = root;
        this.domElement = document.createElement('img');
        this.domElement.src = src;
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top =` ${this.y}px`;
        this.domElement.style.zIndex = z;
        // this.rect = this.domElement.getBoundingClientRect();
        root.appendChild(this.domElement);
        this.rect = this.domElement.getBoundingClientRect();
        this.domElement.id = `enemy${gameTimeLoop+randomIntegerInRange(1,100)}`
        this.domElement.style.border = '-1px red solid'
    }
}