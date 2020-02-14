
let gameTimeLoop = undefined;
let pause =false;
let milliseconds = 0;
let lives = 4;

class Engine {

    constructor(theRoot) {

        this.root = theRoot;

        this.player = new Player(this.root);

        this.enemies = [];

        addBackground(this.root);
        this.score = 0;
        this.scoreCount = 0;
    }


    gameLoop = () => {
        if (pause) return;
        if (this.lastFrame === undefined) this.lastFrame = milliseconds;
        let timeDiff = milliseconds - this.lastFrame;
        this.lastFrame = milliseconds;

        this.enemies.forEach(enemy => {
            // console.log(enemy)
            enemy.update(timeDiff);
        });

        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });
        while (this.enemies.length < MAX_ENEMIES) {

            const spot = nextEnemySpot(this.enemies);
            (randomIntegerInRange(1,3)%2 === 0)?this.enemies.push(new Enemy(this.root, spot)):this.enemies.push(new Prize(this.root, spot))
        }

        if (this.isPlayerDead()) {
            document.removeEventListener("keydown", keydownHandler);
            restart(lives);
            return;
        }
        setTimeout(this.gameLoop, 20);
        if (this.scoreCount === 10){
            this.scoreCount = 0;
            this.score += 5;
            scoreTitle.update(`score: ${this.score}`)
        }
        this.scoreCount++;
    }

    isPlayerDead = () => {
        let ret = false;
        let prize = false;
        this.enemies.forEach(enemy => {
            if(overLapping(this.player.rect, enemy.rect)){
                if (enemy.prize===true) {
                    prize = enemy.prize;
                    if (enemy.collect === false)this.score += 100;
                    enemy.collected();
                } else {
                    ret = true;
                }
            }
            });
        if (prize!==true)return ret;
    }

    pauseGame = () => {
        if (pause) {
            pause = false;
            gameTimeLoop = setInterval(() => {
                milliseconds++;
            }, 1);
            this.gameLoop();
        } else {
            pause = true;
            clearInterval(gameTimeLoop);
        }
    }
}