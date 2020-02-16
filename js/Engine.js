


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
            enemy.update(timeDiff);
        });

        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });
        while (this.enemies.length < MAX_ENEMIES) {

            const spot = nextEnemySpot(this.enemies);
            (randomIntegerInRange(1,11)%3 === 0)?this.enemies.push(newEnemy(this.root, spot)):this.enemies.push(newPrize(this.root, spot))
        }

        if (this.isPlayerDead()) {
            document.removeEventListener("keydown", keydownHandler);
            pause = true;
            restart();
            return;
        }
        if (this.scoreCount === 10){
            this.scoreCount = 0;
            this.score += 5;
            scoreTitle.update(`score: ${this.score}`)
        }
        this.scoreCount++;
        setTimeout(this.gameLoop, 20);
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
        document.removeEventListener("keydown", keydownHandler);
        if (pause) {
            document.addEventListener("keydown", keydownHandler);
            app.removeChild(pauseMessage)
            pause = false;
            gameTimeLoop = setInterval(() => {
                milliseconds++;
            }, 1);
            this.gameLoop();
        } else {
            pause = true;
            app.appendChild(pauseMessage)
            clearInterval(gameTimeLoop);
            document.addEventListener("keydown", keydownPauseHandler);
        }

    }
}