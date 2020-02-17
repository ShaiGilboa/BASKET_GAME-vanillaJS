const startGame = () => {
    pause = false;
    // GAME_WIDTH = PLAYER_WIDTH * randomIntegerInRange(1,4)*2;
    clearInterval(gameTimeLoop);
    main = document.querySelector('body')
    // main.style.margin = 0;
    main.style.backgroundImage = 'url("images/corn-field.jpg")';
    main.style.backgroundSize = 'cover';

    app = document.getElementById('app');
    app.style.position = 'absolute';
    app.style.left = `calc(50% - ${GAME_WIDTH/2}px`;
    app.style.overflow = 'hidden';
    app.style.maxWidth = `${GAME_WIDTH}px`
    app.style.top = PLAYER_HEIGHT;
    scoreBoard = document.getElementById('score-board');
    gameEngine = new Engine(app);

    pauseMessage = document.createElement('h2');
    pauseMessage.classList.add('message')
    pauseMessage.innerText = "Game Paused\nMove to continue"
    createLives(gameEngine.player.lives);

    restartBtn = document.createElement('h2');
    restartBtn.classList.add('message')
    restartBtn.style.display = 'none'
    createRestartBtn(restartBtn);

    levelNumber = document.getElementById('level-number');
    levelNumber.innerText = level;
    
    document.addEventListener("keydown", keydownHandler);

    roundTime = new Time(roundSeconds, roundMinutes);

    timeLeft = new Text (app, `calc(50% - ${GAME_WIDTH/2}px + 5px`, '0px', 'div')
    timeLeft.update(`Time Left: ${roundTime.minutes}:${roundTime.seconds}`)

    prizeCollection = new Text (app, `70%`, '0px', 'div')
    prizeCollection.update(`collected ${prizesCollected}/${prizesNeeded}`)
    
    gameLoopTimer();
    

    gameEngine.gameLoop();
    
}

const keydownHandler = event => {

    switch (event.code) {
        case "ArrowLeft":
        gameEngine.player.moveLeft();
        break;

        case "ArrowRight":
        gameEngine.player.moveRight();
        break;

        case "Space":
        case "KeyP":
        gameEngine.pauseGame();
        break;

        case "ArrowUp":
        gameEngine.player.moveUp();
        break;

        case "ArrowDown":
        gameEngine.player.moveDown();
        break;
}
}

function resize() {
    if(!pause)gameEngine.pauseGame();
    if(GAME_HEIGHT !== window.innerHeight - PLAYER_HEIGHT){
        if(GAME_HEIGHT < window.innerHeight - PLAYER_HEIGHT){
            gameEngine.player.y = GAME_HEIGHT - PLAYER_HEIGHT;
            gameEngine.player.top = `${GAME_HEIGHT - PLAYER_HEIGHT}px`;
        }
        GAME_HEIGHT = window.innerHeight - PLAYER_HEIGHT;
        app.style.height = GAME_HEIGHT;

        bg.style.height = `${GAME_HEIGHT-1}px`;
    }
}

GAME_HEIGHT = window.innerHeight - PLAYER_HEIGHT
window.onresize = resize;
startGame();
