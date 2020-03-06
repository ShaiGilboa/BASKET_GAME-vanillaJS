const ENEMY1 = './images/barbell.png'
const ENEMY2 = './images/brick.png'
const ENEMY3 = './images/enemy2.png'
class Enemy extends Entity{

    constructor(theRoot, enemySpot, enemyKind) {
        super();
        this.render(theRoot, enemyKind, enemySpot * ENEMY_WIDTH, -ENEMY_HEIGHT, 5);
        this.spot = enemySpot;
        this.destroyed = false;
        this.speed = Math.random() * enemySpeed + 0.25;
        this.prize = false;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
        this.domElement.style.top = `${this.y}px`;

        this.rect = this.domElement.getBoundingClientRect();
        if (this.y > GAME_HEIGHT) {
                this.root.removeChild(this.domElement);
                this.destroyed = true;
        }
    }
}