
let main = undefined;
let app = undefined;
let gameEngine = undefined;
let restartBtn = undefined;

let scoreTitle = undefined;

const startGame = () => {
    // GAME_WIDTH = PLAYER_WIDTH * randomIntegerInRange(1,4)*2;
    main = document.querySelector('body')
    main.style.margin = 0;
    app = document.getElementById('app');
    app.style.position = 'absolute';
    app.style.left = `calc(50% - ${GAME_WIDTH/2}px`;
    app.style.overflow = 'hidden';
    app.style.top = PLAYER_HEIGHT;
    gameEngine = new Engine(app);

    restartBtn = document.createElement('button');
    createRestartBtn(restartBtn);

    scoreTitle = new Text (app, `calc(50% - ${GAME_WIDTH/2}px`, '0px', 'div')
    scoreTitle.update('score: 0');
    
    document.addEventListener("keydown", keydownHandler);

    gameTimeLoop = setInterval(() => {
            milliseconds++;
        }, 1);
    
    gameEngine.gameLoop();
    
}

const keydownHandler = event => {
    if (event.code === "ArrowLeft") {
        gameEngine.player.moveLeft();
    }

    if (event.code === "ArrowRight") {
        gameEngine.player.moveRight();
    }

    if (event.code === "KeyP"){
        gameEngine.pauseGame()
    }
}

startGame();
