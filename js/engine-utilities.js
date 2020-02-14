
const nextEnemySpot = enemies => {
    const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

    const spotsTaken = [];
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

    bg.src = 'images/stars.png';
    bg.style.height = `${GAME_HEIGHT}px`;
    bg.style.width = `${GAME_WIDTH}px`;

    root.append(bg);
}

const overLapping = (player, enemy) => {

    if ((enemy.bottom >= player.top && enemy.top < player.bottom-20) && (player.left < enemy.right && player.right > enemy.left))
    // if ((player.x < enemy.x+ENEMY_WIDTH && player.x+PLAYER_WIDTH > enemy.x) && (enemy.y+ENEMY_HEIGHT > player.y && enemy.y < player.y +PLAYER_HEIGHT))
    {
        return true; 
    } else {
        return false;
    }
}

const createRestartBtn = (restartBtn) => {
    restartBtn.innerText = 'Game Over\nrestart';
    restartBtn.style.textAlign = 'center';
    restartBtn.style.position = 'absolute';
    restartBtn.style.left = `${GAME_WIDTH/2-50}px`;
    restartBtn.style.top = `${GAME_HEIGHT/2-20}px`;
    restartBtn.style.width = '100px';
    restartBtn.style.height = '40px';
    restartBtn.style.zIndex = 190;
    restartBtn.style.display = 'none';
    app.appendChild(restartBtn)
}

const handleRestartClick = (event) => {
    restartBtn.removeEventListener('click', handleRestartClick);
    // console.log('restart')
    app.innerHTML = '';
    for(let i = 1; i<=3; i++) document.getElementById(`life#${i}`).style.display = 'inline-block';
    lives = 4;
    startGame();
}

const handleNextRoundClick = (event) => {
    gameEngine.enemies.forEach(enemy => {
        enemy.root.removeChild(enemy.domElement)
    })
    gameTimeLoop = setInterval(() => {
            milliseconds++;
        }, 1);
    gameEngine.lastFrame = undefined;
    gameEngine.enemies = [];
    document.addEventListener("keydown", keydownHandler);
    restartBtn.style.display = 'none'   
    gameEngine.gameLoop();
}

const takeOneLife = () => {
    // console.log(lives)
    restartBtn.style.display = 'inline-block';
    restartBtn.innerText = "next round";
    document.getElementById(`life#${lives}`).style.display = 'none';
    restartBtn.addEventListener('click', handleNextRoundClick);
}

const restart = () => {
    lives --;
    clearInterval(gameTimeLoop);
    if (lives === 0){
        restartBtn.style.display = 'inline-block';
        restartBtn.innerText = 'Game Over\nrestart'
        restartBtn.addEventListener('click', handleRestartClick);
    } else {
        takeOneLife();
    }
}

const randomIntegerInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
