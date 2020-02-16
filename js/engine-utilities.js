
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
    const bg = document.createElement("img");

    bg.src = 'images/corn-field.jpg';
    bg.style.height = `${GAME_HEIGHT}px`;
    bg.style.width = `${GAME_WIDTH}px`;

    root.append(bg);
}

const overLapping = (player, enemy) => {

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
    // restartBtn.style.textAlign = 'center';
    // restartBtn.style.position = 'absolute';
    // restartBtn.style.left = `${GAME_WIDTH/2-50}px`;
    // restartBtn.style.top = `${GAME_HEIGHT/2-20}px`;
    // restartBtn.style.width = '100px';
    // restartBtn.style.height = '40px';
    // restartBtn.style.zIndex = 190;
    // restartBtn.style.display = 'none';
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


const handleRestart = (event) => {
    if (event.code === "Space"){
    document.removeEventListener('keydown', handleRestart);
    app.innerHTML = '';
    scoreBoard.innerHTML ='';
    clearInterval(gameTimeLoop);
    gameEngine.score = 0;
    gameEngine.scoreCount = 0;
    gameEngine.enemies = [];
    startGame();
    }
}

const handleNextRound = () => {
    gameEngine.enemies.forEach(enemy => {
        enemy.root.removeChild(enemy.domElement)
    })
    clearInterval(gameTimeLoop);
    gameTimeLoop = setInterval(() => {
            milliseconds++;
        }, 1);
    gameEngine.lastFrame = undefined;
    gameEngine.enemies = [];
    document.addEventListener("keydown", keydownHandler);
    restartBtn.style.display = 'none';
    gameEngine.player.x = GAME_WIDTH/2;
    gameEngine.player.y = GAME_HEIGHT - PLAYER_HEIGHT;
    gameEngine.player.domElement.style.left = `${GAME_WIDTH/2}px`;
    gameEngine.player.domElement.style.top = `${GAME_HEIGHT - PLAYER_HEIGHT}px`;
    gameEngine.player.rect = gameEngine.player.domElement.getBoundingClientRect();
    pause = false;
    gameEngine.gameLoop();
}

const takeOneLife = () => {
    // console.log(gameEngine.ene)
    restartBtn.style.display = 'inline-block';
    restartBtn.innerText = "Oh No!\nPress Space to continue";
    scoreBoard.removeChild(document.getElementById(`life#${gameEngine.player.lives}`))
    document.addEventListener('keydown', nextRoundHandler);
    gameEngine.player.lives --;
}


const nextRoundHandler = (event) => {
    if (event.code === "Space") {
        document.removeEventListener('keydown', nextRoundHandler);
        handleNextRound();
    }
}

const restart = () => {
    clearInterval(gameTimeLoop);
    if (gameEngine.player.lives === 0){
        restartBtn.style.display = 'inline-block';
        restartBtn.innerText = 'Game Over\nPress space to restart'
        document.addEventListener('keydown', handleRestart);
    } else {
        takeOneLife();
    }
}

const randomIntegerInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
