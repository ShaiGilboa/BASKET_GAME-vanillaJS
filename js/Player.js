// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player extends Entity{
    // The constructor takes one parameter. This parameter refers to the parent DOM node.
    // We will be adding a DOM element to this parent DOM node.
    constructor(root) {
        super();
        this.render(root, 'images/basket1.png',GAME_WIDTH/2, GAME_HEIGHT - PLAYER_HEIGHT, 10);
        this.domElement.style.width = PLAYER_WIDTH;
        this.domElement.style.height = PLAYER_HEIGHT
        this.yAxisMove = PLAYER_HEIGHT/2;
        this.rect = this.domElement.getBoundingClientRect();
        
        this.lives = LIVES_AMOUNT;
    }
    // This method will be called when the user presses the left key. See in Engine.js
    // how we relate the key presses to this method
    moveLeft() {
        if (this.x > 0) {
            this.x = this.x - ENEMY_WIDTH;
            this.domElement.style.left = `${this.x}px`;
            this.rect = this.domElement.getBoundingClientRect();
        }
    }
    // We do the same thing for the right key. See Engine.js to see when this happens.
    moveRight() {
        if (this.x + ENEMY_WIDTH < GAME_WIDTH) {
            this.x = this.x + ENEMY_WIDTH;
            this.domElement.style.left = `${this.x}px`;
            this.rect = this.domElement.getBoundingClientRect();
        }
    }

    moveUp() {
        if (this.y > 15) {
            this.y = this.y - this.yAxisMove;
            this.domElement.style.top = `${this.y}px`;
            this.rect = this.domElement.getBoundingClientRect();
        }
    }
    moveDown() {
        if (this.y + PLAYER_HEIGHT+ this.yAxisMove < GAME_HEIGHT) {
            this.y = this.y + this.yAxisMove;
            this.domElement.style.top = `${this.y}px`;
            this.rect = this.domElement.getBoundingClientRect();
        } else {
            this.y = GAME_HEIGHT - PLAYER_HEIGHT;
            this.domElement.style.top = `${this.y}px`;
        }
    }
}