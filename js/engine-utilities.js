const newEnemy = (root, spot) => {
    let x = randomIntegerInRange(1,4);
    switch (x){
        case 1:
        return new Enemy(root, spot, ENEMY1);
        case 2:
        return new Enemy(root, spot, ENEMY2);
        case 3:
        return new Enemy(root, spot, ENEMY3);
    }
}

const newPrize = (root,spot) => {
    let x = randomIntegerInRange(1,4);
    switch (x){
        case 1:
        return new Prize(root, spot, PRIZE1);
        case 2:
        return new Prize(root, spot, PRIZE2);
        case 3:
        return new Prize(root, spot, PRIZE3);
    }
}


const keydownPauseHandler = event => {
    switch (event.code) {
        case "ArrowLeft":
        document.removeEventListener("keydown", keydownPauseHandler);
        gameEngine.player.moveLeft();
        gameEngine.pauseGame();
        break;

        case "ArrowRight":
        document.removeEventListener("keydown", keydownPauseHandler);
        gameEngine.player.moveRight();
        gameEngine.pauseGame();
        break;

        case "ArrowUp":
        document.removeEventListener("keydown", keydownPauseHandler);
        gameEngine.player.moveUp();
        gameEngine.pauseGame();

        break;

        case "ArrowDown":
            document.removeEventListener("keydown", keydownPauseHandler);
        gameEngine.player.moveDown(); 
        gameEngine.pauseGame();
        break;
    }
}

const nextEnemySpot = enemies => {
    const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

    const spotsTaken = [false, false, false, false, false,false,false,false,false,false];
    enemies.forEach(enemy => {
        spotsTaken[enemy.spot] = true;
    });
    let candidate = undefined;
    while (candidate === undefined || spotsTaken[candidate]) {
        candidate = Math.floor(Math.random() * enemySpots);
    }
    return candidate;
}

const addBackground = root => {
    bg = document.createElement("img");

    // bg.style.border = 'images/corn-field.jpg';
    bg.style.height = `${GAME_HEIGHT}px`;
    bg.style.width = `${GAME_WIDTH}px`;

    root.append(bg);
}

const endCase = () => {
    document.removeEventListener("keydown", keydownHandler);
    pause = true;
    restart();
}

const overLapping = (player, enemy) => {
    if(enemy.collect === true)return false;
    if ((enemy.bottom >= player.top && enemy.top < player.bottom-15) && (player.left < enemy.right && player.right > enemy.left))   
    // if ((player.x < enemy.x+ENEMY_WIDTH && player.x+PLAYER_WIDTH > enemy.x) && (enemy.y+ENEMY_HEIGHT > player.y && enemy.y < player.y +PLAYER_HEIGHT))
    {
        return true; 
    } else {
        return false;
    }
}

const createRestartBtn = (restartBtn) => {
    restartBtn.innerText = 'Game Over\nPress space to restart';
    app.appendChild(restartBtn)
}

const createLives = (lives) => {
    for (let i = 1; i <= lives; i++){
        let life = document.createElement('img');
        life.src = "./images/player.png";
        life.id = `life#${i}`;
        life.classList.add('lives')
        scoreBoard.appendChild(life);
    }
}

const gameLoopTimer = () => {
    gameTimeLoop = setInterval(() => {
            milliseconds++;
            if(milliseconds % 100 === 0){
                roundTime.secondPassed();
            }
        }, 10);
}

const playerToStartPosition = () => {
    gameEngine.player.x = GAME_WIDTH/2;
    gameEngine.player.y = GAME_HEIGHT - PLAYER_HEIGHT;
    gameEngine.player.domElement.style.left = `${GAME_WIDTH/2}px`;
    gameEngine.player.domElement.style.top = `${GAME_HEIGHT - PLAYER_HEIGHT}px`;
    gameEngine.player.rect = gameEngine.player.domElement.getBoundingClientRect();
}

const handleNextRound = () => {
    roundTime.seconds = roundSeconds;
    roundTime.minutes = roundMinutes;
    gameEngine.enemies.forEach(enemy => {
    enemy.root.removeChild(enemy.domElement)
    })
    clearInterval(gameTimeLoop);
    gameEngine.lastFrame = undefined;
    gameEngine.enemies = [];
    document.addEventListener("keydown", keydownHandler);
    restartBtn.style.display = 'none';

    playerToStartPosition();
    gameLoopTimer();
    pause = false;
    gameEngine.player.src = "images/basket1.png"
    gameEngine.player.domElement.src = "images/basket1.png"

    gameEngine.gameLoop();
}

const takeOneLife = () => {
    restartBtn.style.display = 'inline-block';
    restartBtn.innerText = "Oh No!\nPress Space to continue";
    scoreBoard.removeChild(document.getElementById(`life#${gameEngine.player.lives}`))
    gameEngine.player.lives --;
    document.addEventListener('keydown', nextRoundHandler);
}

const nextRoundHandler = (event) => {
    if (event.code === "Space") {
        document.removeEventListener('keydown', nextRoundHandler);
        handleNextRound();
    }
}

const handleRestart = (event) => {
    if (event.code === "Space"){
    prizesCollected = 0;    
    document.removeEventListener('keydown', handleRestart);
    app.innerHTML = '';
    scoreBoard.innerHTML ='';
    clearInterval(gameTimeLoop);
    gameEngine.enemies = [];
    startGame();
    }
}
const nextLevel = (event) => {
    if (event.code === "Space"){
        gameEngine.enemies.forEach(enemy => {
        enemy.root.removeChild(enemy.domElement)
    })
    document.removeEventListener('keydown', nextLevel);
    app.innerHTML = '';
    scoreBoard.innerHTML ='';
    clearInterval(gameTimeLoop);
    prizesCollected = 0;    
    prizesNeeded+=5;
    roundSeconds+=15;
    enemySpeed+=1;
    enemyRatio+=1;
    gameEngine.enemies = [];
    level++;
    startGame();
    }
}

const restart = () => {
    clearInterval(gameTimeLoop);

    if (prizesCollected === prizesNeeded) {
        restartBtn.style.display = 'inline-block';
        restartBtn.innerText = 'Success!\nPress space for next level';
        document.addEventListener('keydown', nextLevel);
    }else {
        gameEngine.player.src = "images/brokenBasket1.png"
        gameEngine.player.domElement.src = "images/brokenBasket1.png"
        if (gameEngine.player.lives === 0){
            restartBtn.style.display = 'inline-block';
            restartBtn.innerText = 'Game Over\nPress space to restart';
            level = 1;
            prizesNeeded = 2;
            document.addEventListener('keydown', handleRestart);
        } else {
            takeOneLife();
        }
    }
}

const randomIntegerInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
