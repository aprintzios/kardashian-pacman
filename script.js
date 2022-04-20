/* CLASSES COMMENTING FOR PRACTICE*/
class Node{
    constructor(val){
        this.value = val;
        this.type = "node";
        this.domEl = this.getDOMEl();
    }
    updateBG(update, img){
        if (img === false){
            this.domEl.style.background = "none";
            this.domEl.style.backgroundColor = update;
        } else{
            this.domEl.style.backgroundImage = "url(./img/" + update + ".png)";
            this.domEl.style.backgroundSize = "contain";
        }
    }
    getDOMEl(){
        let coords = nodeToCoord(this.value);
        let x = coords[0];
        let y = coords[1];
        if (x<10){
            x = "0"+x;
        }
        if (y<10){
            y = "0"+y;
        }
        let id = "sqr" + x+y;
        return document.getElementById(id);
    }
}
class Player{
    constructor(node){
        this.node = node;
        this.x = nodeToCoord(node.value)[0];
        this.y = nodeToCoord(node.value)[1];
        this.type = "player";
    }
    drawPlayer(){
        if (kLeft){
            this.node.updateBG('kLeft', true);
        } else {
            this.node.updateBG('kRight', true);
        }
    }
}
class Ghost{
    constructor(node, name){
        this.node = node;
        this.x = nodeToCoord(node.value)[0];
        this.y = nodeToCoord(node.value)[1];
        this.type = "ghost";
        this.name = name;
    }
    drawGhost(){
        this.node.updateBG(this.name, true);
    }
}
class Gem{
    constructor(node){
        this.node = node;
        this.type = "gem";
    }
    drawGem(){
        this.node.updateBG('gem', true);
    }
}
class Wall{
    constructor(node){
        this.node = node;
        this.type = "wall";
    }
    drawWall(){
        this.node.updateBG('wall', true);
    }
}

/* CONSTANTS */
let NUM_ROWS = 9; 
let NUM_COLS = 20;
let NUM_KANYES = 3; 
let FINAL_LEVEL = 5; //up to level 12

/* VARIABLES */
let boardSetup = false;
let node;
let nodes = [];
let ghosts = [];
let kim;
let kLeft = false;
let walls = [];
let gems = [];
let adj = [];
let intervId;
let score = 0;
let win;
let level = 1;
let audioOn = false;
let seOn = false;
let wallModule = [
    [1,1],
    [1,3],
    [1,4],
    [1,5],
    [1,7],
    [2,4],
    [2,9],
    [2,10],
    [3,1],
    [3,2],
    [3,6],
    [3,7],    
    [4,4],
    [5,1],
    [5,3],
    [5,4],
    [5,5],
    [5,7],
    [6,4],
    [6,9],
    [6,10],
    [7,1],
    [7,2],
    [7,6],
    [7,7],
    [8,4],
];
let gemsMap = [];
let wallMap = [];

//generate first half of wallsMap according to wallModule, removing each wall node from gemsMap
//add the same walls to other half to make the game board vertically symmetrical
let mid;
if (NUM_COLS%2 === 0){
    mid = NUM_COLS/2;
} else{
    mid = Math.floor(NUM_COLS/2)+1; 
}
for (let i=0; i<NUM_ROWS; i++){
    for (let j=0; j<mid; j++){
        let xMod = i%9;
        let yMod = j%11;
            if (includedInWM(xMod, yMod)){
                //make this element a wall 
                wallMap.push([i,j]);
                wallMap.push([i,NUM_COLS-1-j]);
            } else{
                if (!(i===0 && j=== 0)){
                    gemsMap.push([i,j]);
                }
                gemsMap.push([i,NUM_COLS-1-j]);
            }
    }
}

/* DOM ELEMENTS */
let btn = document.getElementById("restart");
let board = document.querySelector(".board");
let resultEl = document.getElementById("result");
let gameStartBtn = document.getElementById("startGame");
let nextLvlBtn = document.getElementById("nextLvl");
let loseRestartBtn = document.getElementById("loseRestart");
let winRestartBtn = document.getElementById("winRestart");
let lvlImg = document.getElementById("levelImg");

//overlay elements
let overlayStartEl = document.getElementById("overlayStart");
let overlayWinEl = document.getElementById("overlayWin");
let overlayLoseEl = document.getElementById("overlayLose");
let overlayFinalEl = document.getElementById("overlayFinal");

//audio elements
let blingAudio = document.getElementById("bling");
let kimLoseAudio = document.getElementById("kimLoseAudio");
let kimWinAudio = document.getElementById("kimWinAudio");
let bgAudio = document.getElementById("bgAudio");
let soundBtn = document.getElementById("sound");
let seBtn = document.getElementById("soundEffects");
let soundStartBtn = document.getElementById("soundStart");
let seStartBtn = document.getElementById("seStart");


/* EVENT LISTENERS */
gameStartBtn.addEventListener("click", gameStart);
seStartBtn.addEventListener("click", handleSEStart);
soundStartBtn.addEventListener("click", handleSoundStart);


/* FUNCTIONS */
function gameStart(){
    //event listeners
    btn.addEventListener("click", restart);
    soundBtn.addEventListener("click", handleSound);
    seBtn.addEventListener("click", handleSE);
    //initialize
    init();
}
function init(){
    win = false;
    clearOverlays();
    kimWinAudio.pause();
    kimLoseAudio.pause();

    lvlImg.src="./img/level" +level+ ".png"
    if (audioOn){
        bgAudio.play();
    }
    //arrow key event lsitener
    document.addEventListener("keydown", playerMove);
    //initialize DOM
    if (!boardSetup){
        setUpBoard();
    } else{
        //clear map
        gemsMap.forEach((element)=>{
            clearNode(nodes[element[0]][element[1]]);
        });
        //initialize Kim
        kim.node = nodes[0][0];
        kim.x = 0;
        kim.y = 0;

        //initialize ghosts
        ghosts.forEach((ghost)=>{
            let randX = Math.floor(Math.random()*NUM_ROWS);
            let randY = Math.floor(Math.random()*NUM_COLS);
            //need to make sure the coords arent a wall, kim or another kanye
            while ((randX===0 && randY === 0)||(isWall(randX, randY) || kanyeLocationTaken(randX, randY))){
                randX = Math.floor(Math.random()*NUM_ROWS);
                randY = Math.floor(Math.random()*NUM_COLS);
            }
            ghost.node = nodes[randX][randY];
        });
    }

    //initialize gems
    gemsMap.forEach((element)=>{
        let newGem = new Gem(nodes[element[0]][element[1]]);
        gems.push(newGem);
        newGem.drawGem();
    })

    //initialize ghostMove interval
    intervId = setInterval(ghostMove, 1000-(level*100));

    render();
}
//game event functions
function playerMove(e){
    switch (e.keyCode) {
        case 37: //left
            kLeft = true;
            if (kim.y!==0 && nodes[kim.x][kim.y-1]){
                if(!collisionDetectionWall(nodes[kim.x][kim.y-1])){
                    clearNode(nodes[kim.x][kim.y]);
                    kim.y--;
                    kim.node = nodes[kim.x][kim.y];
                }
            }
            collisionDetectionKimGem(kim.node);
            if (collisionDetectionGhost(kim.node)){
                gameOver();
            }
            render();
            checkForWin();
        break;
        case 38: //up
            if (kim.x!==0 && nodes[kim.x-1][kim.y]){
                if(!collisionDetectionWall(nodes[kim.x-1][kim.y])){
                    clearNode(nodes[kim.x][kim.y]);
                    kim.x--;
                    kim.node = nodes[kim.x][kim.y];
                }
            }
            collisionDetectionKimGem(kim.node);
            if (collisionDetectionGhost(kim.node)){
                gameOver();
            }
            render();
            checkForWin();
            break;
        case 39: //right
            kLeft = false;
            if (kim.y!==NUM_COLS-1 && nodes[kim.x][kim.y+1]){
                if(!collisionDetectionWall(nodes[kim.x][kim.y+1])){
                    clearNode(nodes[kim.x][kim.y]);
                    kim.y++;
                    kim.node = nodes[kim.x][kim.y];
                    }
                }
                collisionDetectionKimGem(kim.node);
                if (collisionDetectionGhost(kim.node)){
                    gameOver();
                }
                render();
                checkForWin();
            break;
        case 40: //down
            if (kim.x!==NUM_ROWS-1 && nodes[kim.x+1][kim.y]){
                if(!collisionDetectionWall(nodes[kim.x+1][kim.y])){
                    clearNode(nodes[kim.x][kim.y]);
                    kim.x++;
                    kim.node = nodes[kim.x][kim.y];
                }
            }
            collisionDetectionKimGem(kim.node);
            if (collisionDetectionGhost(kim.node)){
                gameOver();
            }
            render();
            checkForWin();
            break;
    }

}
function ghostMove(){
    let nextMoves = [];
    ghosts.forEach((ghost)=>{
        //get minPath
        let mP = findMP(kim.node.value, ghost.node.value)
        if (!collisionDetectionGhostGem(ghost.node)){
            clearNode(ghost.node);
        }
        //get next move
        let nextMove = mP.pop();
        if (!nextMoves.includes(nextMove)){
            nextMoves.push(nextMove);
            let nextCoords = nodeToCoord(nextMove);
            ghost.node = nodes[nextCoords[0]][nextCoords[1]];
        }
        if (collisionDetectionGhost(kim.node)){
            gameOver();
        }
        render();
     });

}
function gameOver(){
    clearInterval(intervId);
    document.removeEventListener("keydown", playerMove);
    if (win){
        if (level === FINAL_LEVEL){
            overlayFinalEl.style.display = "block";
            winRestartBtn.addEventListener("click", restart);
        } else{
            overlayWinEl.style.display = "block";
            level++;
            nextLvlBtn.addEventListener("click", init);
        }
    } else{
        bgAudio.pause();
        overlayLoseEl.style.display = "block";
        loseRestartBtn.addEventListener("click", restart);
        if (seOn){
            kimLoseAudio.play();
        }
    }   
}
function restart(){
    level = 1;
    bgAudio.pause();
    bgAudio.currentTime = 0;
    clearInterval(intervId);
    init();
}
function render(){
    //render gems
    gems.forEach((gem)=>{
        gem.drawGem();
    })
    //render player(kim)
    kim.drawPlayer();
    //render ghosts
    ghosts.forEach((ghost)=>{
        ghost.drawGhost();
    })
}