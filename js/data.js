
let GAME_HEIGHT = undefined;


const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;


const PLAYER_WIDTH = 74;
const PLAYER_HEIGHT = 54;

const GAME_WIDTH = ENEMY_WIDTH *10;

const MAX_ENEMIES = Math.floor(GAME_WIDTH / ENEMY_WIDTH);


let gameTimeLoop = undefined;
let pause =false;
let milliseconds = 0;
let LIVES_AMOUNT = 3;


let main = undefined;
let app = undefined;
let gameEngine = undefined;
let restartBtn = undefined;

let scoreBoard = undefined;

let scoreTitle = undefined;

let pauseMessage = undefined;