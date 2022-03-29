//classes
class Node{
    constructor(val){
        this.value = val;
        this.type = "node";
        this.domEl = this.getDOMEl();
        this.contains = [];
    }
    // draw(){
    //     let hasGhost = false;
    //     this.contains.forEach((element)=>{
    //         if (element.type === 'player'){
    //             element.drawPlayer();
    //         } else if (element.type === 'ghost'){
    //             hasGhost = true;
    //             element.drawGhost();
    //         } else if (element.type === 'gem' && !hasGhost){
    //             element.drawGem();
    //         } else if (element.type === 'wall'){
    //             element.drawWall();
    //         }
    //     });
    // }
    updateBG(update, img){
        if (img === false){
            this.domEl.style.background = "none";
            this.domEl.style.backgroundColor = update;
        } else{
            this.domEl.style.backgroundImage = "url(./img/" + update + ".png)";
            this.domEl.style.backgroundSize = "contain";
        }
    }
    // getBG(){
    //     return this.domEl.style.backgroundImage;
    // }
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

//vars/constants
let NUM_ROWS = 9; 
let NUM_COLS = 20;
let boardSetup = false;
let node;
let nodes = [];
let ghosts = [];
let kim;
let kanye;
let kris;
let kLeft = false;
let wallMap = [
    [1,1],
    [1,3],
    [1,4],
    [1,5],
    [1,7],
    [1,12],
    [1,14],
    [1,15],
    [1,16],
    [1,18],
    [2,4],
    [2,9],
    [2,10],
    [2,15],
    [3,1],
    [3,2],
    [3,6],
    [3,7],    
    [3,12],
    [3,13],
    [3,17],
    [3,18],
    [4,4],
    [4,15],
    [5,1],
    [5,3],
    [5,4],
    [5,5],
    [5,7],
    [5,12],
    [5,14],
    [5,15],
    [5,16],
    [5,18],
    [6,4],
    [6,9],
    [6,10],
    [6,15],
    [7,1],
    [7,2],
    [7,6],
    [7,7],
    [7,12],
    [7,13],
    [7,17],
    [7,18],
    [8,4],
    [8,15]
];
let gemsMap = [
    //[0,0], //kim position
    [0,1],
    [0,2],
    [0,3],
    [0,4],
    [0,5],
    [0,6],
    [0,7],
    [0,8],
    [0,9],
    [0,10],
    [0,11],
    [0,12],
    [0,13],
    [0,14],
    [0,15],
    [0,16],
    [0,17],
    [0,18],
    [0,19],
    [1,0],
    //[1,1],
    [1,2],
    //[1,3], 
    //[1,4], 
    //[1,5], 
    [1,6],
    //[1,7], 
    [1,8],
    [1,9],
    [1,10],
    [1,11],
    //[1,12],
    [1,13],
    //[1,14],
    //[1,15],
    //[1,16],
    [1,17],
    //[1,18],
    [1,19],
    [2,0],
    [2,1],
    [2,2],
    [2,3],
    //[2,4],
    [2,5],
    [2,6],
    [2,7],
    [2,8],
    //[2,9],
    //[2,10],
    [2,11],
    [2,12],
    [2,13],
    [2,14],
    //[2,15],
    [2,16],
    [2,17],
    [2,18],
    [2,19],
    [3,0],
    //[3,1],
    //[3,2],
    [3,3],
    [3,4],
    [3,5],
    //[3,6],
    //[3,7],
    [3,8],
    [3,9],
    [3,10],
    [3,11],
    //[3,12],
    //[3,13],
    [3,14],
    [3,15],
    [3,16],
    //[3,17],
    //[3,18],
    [3,19],
    [4,0],
    [4,1],
    [4,2],
    [4,3],
    //[4,4],
    [4,5],
    [4,6],
    [4,7],
    [4,8],
    [4,9],
    [4,10],
    [4,11],
    [4,12],
    [4,13],
    [4,14],
    //[4,15],
    [4,16],
    [4,17],
    [4,18],
    [4,19],
    [5,0],
    //[5,1],
    [5,2],
    //[5,3],
    //[5,4],
    //[5,5],
    [5,6],
    //[5,7],
    [5,8],
    [5,9],
    [5,10],
    [5,11],
    //[5,12],
    [5,13],
    //[5,14],
    //[5,15],
    //[5,16],
    [5,17],
    //[5,18],
    [5,19],
    [6,0],
    [6,1],
    [6,2],
    [6,3],
    //[6,4],
    [6,5],
    [6,6],
    [6,7],
    [6,8],
    // [6,9],
    // [6,10],
    [6,11],
    [6,12],
    [6,13],
    [6,14],
    //[6,15],
    [6,16],
    [6,17],
    [6,18],
    [6,19],
    [7,0],
    //[7,1],
    //[7,2],
    [7,3],
    [7,4],
    [7,5],
    //[7,6],
    //[7,7],
    [7,8],
    [7,9],
    [7,10],
    [7,11],
    //[7,12],
    //[7,13],
    [7,14],
    [7,15],
    [7,16],
    //[7,17],
    //[7,18],
    [7,19],
    [8,0], //ghost position
    [8,1],
    [8,2],
    [8,3],
    //[8,4],
    [8,5],
    [8,6],
    [8,7],
    [8,8], //ghost position
    [8,9],
    [8,10],
    [8,11],
    [8,12],
    [8,13],
    [8,14],
    //[8,15],
    [8,16],
    [8,17],
    [8,18],
    [8,19]

];
let emptyMap = [
    [0,0],
    [0,1],
    [0,2],
    [0,3],
    [0,4],
    [0,5],
    [0,6],
    [0,7],
    [0,8],
    [0,9],
    [0,10],
    [0,11],
    [0,12],
    [0,13],
    [0,14],
    [0,15],
    [0,16],
    [0,17],
    [0,18],
    [0,19],
    [1,0],
    //[1,1],
    [1,2],
    //[1,3],
    //[1,4],
    //[1,5],
    [1,6],
    //[1,7],
    [1,8],
    [1,9],
    [1,10],
    [1,11],
    //[1,12],
    [1,13],
    //[1,14],
    //[1,15],
    //[1,16],
    [1,17],
    //[1,18],
    [1,19],
    [2,0],
    [2,1],
    [2,2],
    [2,3],
    //[2,4],
    [2,5],
    [2,6],
    [2,7],
    [2,8],
    //[2,9],
    //[2,10],
    [2,11],
    [2,12],
    [2,13],
    [2,14],
    //[2,15],
    [2,16],
    [2,17],
    [2,18],
    [2,19],
    [3,0],
    //[3,1],
    //[3,2],
    [3,3],
    [3,4],
    [3,5],
    //[3,6],
    //[3,7],
    [3,8],
    [3,9],
    [3,10],
    [3,11],
    //[3,12],
    //[3,13],
    [3,14],
    [3,15],
    [3,16],
    //[3,17],
    //[3,18],
    [3,19],
    [4,0],
    [4,1],
    [4,2],
    [4,3],
    //[4,4],
    [4,5],
    [4,6],
    [4,7],
    [4,8],
    [4,9],
    [4,10],
    [4,11],
    [4,12],
    [4,13],
    [4,14],
    //[4,15],
    [4,16],
    [4,17],
    [4,18],
    [4,19],
    [5,0],
    //[5,1],
    [5,2],
    //[5,3],
    //[5,4],
    //[5,5],
    [5,6],
    //[5,7],
    [5,8],
    [5,9],
    [5,10],
    [5,11],
    //[5,12],
    [5,13],
    //[5,14],
    //[5,15],
    //[5,16],
    [5,17],
    //[5,18],
    [5,19],
    [6,0],
    [6,1],
    [6,2],
    [6,3],
    //[6,4],
    [6,5],
    [6,6],
    [6,7],
    [6,8],
    // [6,9],
    // [6,10],
    [6,11],
    [6,12],
    [6,13],
    [6,14],
    //[6,15],
    [6,16],
    [6,17],
    [6,18],
    [6,19],
    [7,0],
    //[7,1],
    //[7,2],
    [7,3],
    [7,4],
    [7,5],
    //[7,6],
    //[7,7],
    [7,8],
    [7,9],
    [7,10],
    [7,11],
    //[7,12],
    //[7,13],
    [7,14],
    [7,15],
    [7,16],
    //[7,17],
    //[7,18],
    [7,19],
    [8,0],
    [8,1],
    [8,2],
    [8,3],
    //[8,4],
    [8,5],
    [8,6],
    [8,7],
    [8,8],
    [8,9],
    [8,10],
    [8,11],
    [8,12],
    [8,13],
    [8,14],
    //[8,15],
    [8,16],
    [8,17],
    [8,18],
    [8,19]
];
let walls = [];
let gems = [];
let adj = [];
let intervId;
let score = 0;
let win;
let level = 1;
let audioOn = false;
let seOn = false;

//cache elements
let btn = document.getElementById("restart");
let board = document.querySelector(".board");
let resultEl = document.getElementById("result");
let overlayStartEl = document.getElementById("overlayStart");
let overlayWinEl = document.getElementById("overlayWin");
let overlayLoseEl = document.getElementById("overlayLose");
let overlayFinalEl = document.getElementById("overlayFinal");
let gameStartBtn = document.getElementById("startGame");
let nextLvlBtn = document.getElementById("nextLvl");
let loseRestartBtn = document.getElementById("loseRestart");
let winRestartBtn = document.getElementById("winRestart");
let lvlImg = document.getElementById("levelImg");
let blingAudio = document.getElementById("bling");
let kimLoseAudio = document.getElementById("kimLoseAudio");
let kimWinAudio = document.getElementById("kimWinAudio");
let bgAudio = document.getElementById("bgAudio");
let soundBtn = document.getElementById("sound");
let seBtn = document.getElementById("soundEffects");
let soundStartBtn = document.getElementById("soundStart");
let seStartBtn = document.getElementById("seStart");

//event listeners
// btn.addEventListener("click", restart);
// soundBtn.addEventListener("click", handleSound);
// seBtn.addEventListener("click", handleSE);
gameStartBtn.addEventListener("click", gameStart);
seStartBtn.addEventListener("click", handleSEStart);
soundStartBtn.addEventListener("click", handleSoundStart);


//functions
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
    overlayStartEl.style.display = "none";
    overlayWinEl.style.display = "none";
    overlayLoseEl.style.display = "none";
    overlayFinalEl.style.display = "none";
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
        for (let i=0; i<NUM_ROWS; i++){
            let row = document.createElement("div");
            row.classList.add("row");
            board.appendChild(row);
            for (let j=0; j<NUM_COLS; j++){
                let sqr = document.createElement("div");
                sqr.classList.add("square");
                let newID = "sqr"
                if (i<10){
                    newID +="0" + i;
                } else{
                    newID += i;
                }
                if (j<10){
                    newID +="0" + j;
                } else{
                    newID += j;
                }
                sqr.id = newID;
                row.appendChild(sqr);
            }
        }

        //initialize node array
        for (let i=0; i<NUM_ROWS; i++){
            nodes[i] = [];
            for (let j=0; j<NUM_COLS; j++){
                let newNode = new Node(coordToNode(i,j));
                nodes[i].push(newNode);
            }
        }
        //initialize walls
        wallMap.forEach((element)=>{
            let newWall = new Wall(nodes[element[0]][element[1]]);
            nodes[element[0]][element[1]].contains.push(newWall);
            walls.push(newWall);
            newWall.drawWall();
        })

        //initialize Dijkstra adjacency array
        for (let i=0; i<NUM_ROWS; i++){
            for (let j=0; j<NUM_COLS; j++){
                node = coordToNode(i,j);
                adj[node] = [];
                //add up neightbor
                if (i!==0 && !collisionDetectionWall(nodes[i-1][j])){
                    if (i===1 && j===0){
                    }
                    adj[node].push([nodes[i-1][j].value,1]);
                }
                //add down neighbor
                if (i!==(NUM_ROWS-1) && !collisionDetectionWall(nodes[i+1][j])){
                    adj[node].push([nodes[i+1][j].value,1]);
                }
                //add left neighbor
                if (j!==0 && !collisionDetectionWall(nodes[i][j-1])){
                    adj[node].push([nodes[i][j-1].value,1]);
                }
                //add right neighbor
                if (j!=(NUM_COLS-1) && !collisionDetectionWall(nodes[i][j+1])){
                    adj[node].push([nodes[i][j+1].value,1]);
                }
            }
        }

    //initialize ghosts
    kanye = new Ghost(nodes[8][10], "kanye");
    pete = new Ghost(nodes[8][0], "kanye");
    kris = new Ghost(nodes[8][19], "kanye");
    ghosts.push(kanye);
    ghosts.push(pete);
    ghosts.push(kris);
    //nodes[8][8].contains.push(kanye);
    kanye.drawGhost();
    pete.drawGhost();    
    kris.drawGhost();
    //initialize player(kim)
    kim = new Player(nodes[0][0]);
    nodes[0][0].contains.push(kim);
    kim.drawPlayer();
    boardSetup = true;
    } else{
        //clear map
        emptyMap.forEach((element)=>{
            clearNode(nodes[element[0]][element[1]]);
        });
        //initialize Kim
        kim.node = nodes[0][0];
        kim.x = 0;
        kim.y = 0;

        //initialize ghosts
        kanye.node = nodes[8][10];
        pete.node = nodes[8][0];
        kris.node = nodes[8][19];
    }

    //initialize gems
    gemsMap.forEach((element)=>{
        let newGem = new Gem(nodes[element[0]][element[1]]);
        nodes[element[0]][element[1]].contains.push(newGem);
        gems.push(newGem);
        newGem.drawGem();
    })

    //initialize ghostMove interval
    intervId = setInterval(ghostMove, 1000/level);

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
        // nextMove = mP.pop(); //get next move
        // mP.pop(); //throw away current location
        // let nextMove = mP.pop(); //get next move
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
function collisionDetectionWall(node){
    //check for node/wall collision
    let collision = false;
    walls.forEach((element)=>{
        if (element.node.value === node.value){
            collision = true;
        }
    });
    return collision;
}
function collisionDetectionKimGem(node){
    //check for kim/gem collision
    gems.forEach((gem, i)=>{
        if (gem.node.value === node.value){
            score++;
            gems.splice(i,1);
            // blingAudio.src = "";
            // blingAudio.src = "./audio/bling.wav";
            if (seOn){
                blingAudio.play();
            }
        }
    });

}
function collisionDetectionGhostGem(node){
    //check for ghost/gem collision
    let collision = false;
    gems.forEach((gem)=>{
        if (gem.node.value === node.value){
            collision = true;
        }
    });
    return collision;
}

function collisionDetectionGhost(node){
    //check and handle ghost/kim collision
    let collision = false;
    ghosts.forEach((ghost)=>{
        if (ghost.node.value === node.value){
            collision = true;
        }
    });
    return collision;
}

function gameOver(){
    clearInterval(intervId);
    document.removeEventListener("keydown", playerMove);
    if (win){
        if (level === 10){
            overlayFinalEl.style.display = "block";
            winRestartBtn.addEventListener("click", restart);
        } else{
            overlayWinEl.style.display = "block";
            level++;
            nextLvlBtn.addEventListener("click", goToNextLvl);
            //kimWinAudio.play();
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
function handleSound(){
    if (audioOn){
        //turn audio off
        audioOn = false;
        bgAudio.pause();
        //update img
        soundBtn.src = "./img/soundOff.png";
    } else{
        bgAudio.play();
        audioOn = true;
        //update img
        soundBtn.src = "./img/soundOn.png";
    }
}
function handleSE(){
    if (seOn){
        //turn off
        seOn = false;
        seBtn.src = "./img/seOff.png";
    } else{
        seOn = true;
        seBtn.src = "./img/seOn.png";
    }
}
function handleSoundStart(){
    if (audioOn){
        //turn audio off
        audioOn = false;
        bgAudio.pause();
        //update img
        soundStartBtn.src = "./img/sOffStart.png";
        soundBtn.src = "./img/soundOff.png";
    } else{
        bgAudio.play();
        audioOn = true;
        //update img
        soundStartBtn.src = "./img/sOnStart.png";
        soundBtn.src = "./img/soundOn.png";
    }
}
function handleSEStart(){
    if (seOn){
        //turn off
        seOn = false;
        seStartBtn.src = "./img/seOffStart.png";
        seBtn.src = "./img/seOff.png";
    } else{
        blingAudio.play();
        seOn = true;
        seStartBtn.src = "./img/seOnStart.png";
        seBtn.src = "./img/seOn.png";
    }
}
//rendering function
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
function checkForWin(){
    if (gems.length <1){
        win = true;
        gameOver();
    }
}
function goToNextLvl(){
    init();
}

//helper functions
function clearNode(node){
    node.updateBG("black", false);
}
function findMP(source, end){
    let result = dijkstra(NUM_ROWS*NUM_COLS,adj,source,end);
    //let minPath = [end];
    let minPath = [];
    while (result[1] !== source){
        minPath.unshift(result[1]);
        result = dijkstra(NUM_ROWS*NUM_COLS,adj,source,result[1]);
    }
    minPath.unshift(result[1]);
    return minPath;  
}

function nodeToCoord(node){
    let x = Math.floor(node/NUM_COLS);
    let y = node%NUM_COLS;
    return [x,y];
}
function coordToNode(x,y){
    return ((x*NUM_COLS)+(y));
}

// //generate full array
// for (let i=0; i<NUM_ROWS; i++){
//     for (let j=0; j< NUM_COLS; j++){
//         console.log("["+i+','+j+"]");
//     }
// }

// let allSquares = [
//     [0,0],
//     [0,1],
//     [0,2],
//     [0,3],
//     [0,4],
//     [0,5],
//     [0,6],
//     [0,7],
//     [0,8],
//     [0,9],
//     [0,10],
//     [0,11],
//     [0,12],
//     [0,13],
//     [0,14],
//     [0,15],
//     [0,16],
//     [0,17],
//     [0,18],
//     [0,19],
//     [1,0],
//     [1,1],
//     [1,2],
//     [1,3],
//     [1,4],
//     [1,5],
//     [1,6],
//     [1,7],
//     [1,8],
//     [1,9],
//     [1,10],
//     [1,11],
//     [1,12],
//     [1,13],
//     [1,14],
//     [1,15],
//     [1,16],
//     [1,17],
//     [1,18],
//     [1,19],
//     [2,0],
//     [2,1],
//     [2,2],
//     [2,3],
//     [2,4],
//     [2,5],
//     [2,6],
//     [2,7],
//     [2,8],
//     [2,9],
//     [2,10],
//     [2,11],
//     [2,12],
//     [2,13],
//     [2,14],
//     [2,15],
//     [2,16],
//     [2,17],
//     [2,18],
//     [2,19],
//     [3,0],
//     [3,1],
//     [3,2],
//     [3,3],
//     [3,4],
//     [3,5],
//     [3,6],
//     [3,7],
//     [3,8],
//     [3,9],
//     [3,10],
//     [3,11],
//     [3,12],
//     [3,13],
//     [3,14],
//     [3,15],
//     [3,16],
//     [3,17],
//     [3,18],
//     [3,19],
//     [4,0],
//     [4,1],
//     [4,2],
//     [4,3],
//     [4,4],
//     [4,5],
//     [4,6],
//     [4,7],
//     [4,8],
//     [4,9],
//     [4,10],
//     [4,11],
//     [4,12],
//     [4,13],
//     [4,14],
//     [4,15],
//     [4,16],
//     [4,17],
//     [4,18],
//     [4,19],
//     [5,0],
//     [5,1],
//     [5,2],
//     [5,3],
//     [5,4],
//     [5,5],
//     [5,6],
//     [5,7],
//     [5,8],
//     [5,9],
//     [5,10],
//     [5,11],
//     [5,12],
//     [5,13],
//     [5,14],
//     [5,15],
//     [5,16],
//     [5,17],
//     [5,18],
//     [5,19],
//     [6,0],
//     [6,1],
//     [6,2],
//     [6,3],
//     [6,4],
//     [6,5],
//     [6,6],
//     [6,7],
//     [6,8],
//     [6,9],
//     [6,10],
//     [6,11],
//     [6,12],
//     [6,13],
//     [6,14],
//     [6,15],
//     [6,16],
//     [6,17],
//     [6,18],
//     [6,19],
//     [7,0],
//     [7,1],
//     [7,2],
//     [7,3],
//     [7,4],
//     [7,5],
//     [7,6],
//     [7,7],
//     [7,8],
//     [7,9],
//     [7,10],
//     [7,11],
//     [7,12],
//     [7,13],
//     [7,14],
//     [7,15],
//     [7,16],
//     [7,17],
//     [7,18],
//     [7,19],
//     [8,0],
//     [8,1],
//     [8,2],
//     [8,3],
//     [8,4],
//     [8,5],
//     [8,6],
//     [8,7],
//     [8,8],
//     [8,9],
//     [8,10],
//     [8,11],
//     [8,12],
//     [8,13],
//     [8,14],
//     [8,15],
//     [8,16],
//     [8,17],
//     [8,18],
//     [8,19]
// ];