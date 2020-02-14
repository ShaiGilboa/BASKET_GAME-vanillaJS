// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Enemy extends Entity{

    constructor(theRoot, enemySpot) {
        super();
        this.render(theRoot, './images/enemy2.png', enemySpot * ENEMY_WIDTH, -ENEMY_HEIGHT, 5);
        this.spot = enemySpot;
        this.destroyed = false;
        this.speed = Math.random() * 2;
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