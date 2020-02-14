
let main = undefined;
let app = undefined;
let gameEngine = undefined;
let restartBtn = undefined;

let scoreTitle = undefined;

const createLives = (lives) => {
    console.log('loop ', lives)
    for (let i = 1; i <= lives; i++){
        let life = document.createElement('img');
        life.src = "./images/player.png";
        life.id = `life#${i}`;
        main.appendChild(life);
    }

}

const startGame = () => {
    // GAME_WIDTH = PLAYER_WIDTH * randomIntegerInRange(1,4)*2;
    clearInterval(gameTimeLoop);
    main = document.querySelector('body')
    main.style.margin = 0;
    app = document.getElementById('app');
    app.style.position = 'absolute';
    app.style.left = `calc(50% - ${GAME_WIDTH/2}px`;
    app.style.overflow = 'hidden';
    app.style.top = PLAYER_HEIGHT;
    gameEngine = new Engine(app);
    console.log(lives);
    createLives(lives);

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

    switch (event.code) {
        case "ArrowLeft":
        gameEngine.player.moveLeft();
        break;

        case "ArrowRight":
        gameEngine.player.moveRight();
        break;

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

startGame();
