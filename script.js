//classes
class Node{
    constructor(val){
        this.value = val;
        this.type = "node";
        this.domEl = this.getDOMEl();
        this.contains = [];
    }
    draw(){
        let hasGhost = false;
        this.contains.forEach((element)=>{
            if (element.type === 'player'){
                element.drawPlayer();
            } else if (element.type === 'ghost'){
                hasGhost = true;
                element.drawGhost();
            } else if (element.type === 'gem' && !hasGhost){
                element.drawGem();
            } else if (element.type === 'wall'){
                element.drawWall();
            }
        })
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
    getBG(){
        return this.domEl.style.backgroundImage;
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
    constructor(node){
        this.node = node;
        this.x = nodeToCoord(node.value)[0];
        this.y = nodeToCoord(node.value)[1];
        this.type = "ghost";
    }
    drawGhost(ghostName){
        this.node.updateBG(ghostName, true);
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
// let NUM_ROWS = 11; 
// let NUM_COLS = 9;
let NUM_ROWS = 9; 
let NUM_COLS = 20;
let boardSetup = false;
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
    //[0,0],
    [0,1],
    [0,2],
    [0,3],
    [0,4],
    [0,5],
    [0,6],
    [0,7],
    [0,8],
    [0,10],
    [0,11],
    [0,12],
    [0,13],
    [0,14],
    [0,15],
    [0,16],
    [0,17],
    [1,0],
    //[1,1],
    [1,2],
    //[1,3],
    //[1,4],
    //[1,5],
    [1,6],
    //[1,7],
    [1,8],
    [2,0],
    [2,1],
    [2,2],
    [2,3],
    //[2,4],
    [2,5],
    [2,6],
    [2,7],
    [2,8],
    [3,0],
    //[3,1],
    //[3,2],
    [3,3],
    [3,4],
    [3,5],
    //[3,6],
    //[3,7],
    [3,8],
    [4,0],
    [4,1],
    [4,2],
    [4,3],
    //[4,4],
    [4,5],
    [4,6],
    [4,7],
    [4,8],
    [5,0],
    //[5,1],
    [5,2],
    //[5,3],
    //[5,4],
    //[5,5],
    [5,6],
    //[5,7],
    [5,8],
    [6,0],
    [6,1],
    [6,2],
    [6,3],
    //[6,4],
    [6,5],
    [6,6],
    [6,7],
    [6,8],
    [7,0],
    //[7,1],
    //[7,2],
    [7,3],
    [7,4],
    [7,5],
    //[7,6],
    //[7,7],
    [7,8],
    [8,0],
    [8,1],
    [8,2],
    [8,3],
    //[8,4],
    [8,5],
    [8,6],
    [8,7],
    [8,8]

];
let walls = [];
let gems = [];
let intervId;
let score = 0;

//cache elements
let btn = document.getElementById("restart");
let pointsEl = document.getElementById("points");
let board = document.querySelector(".board");
let resultEl = document.getElementById("result");

//initialize
init();

//event listeners
btn.addEventListener("click", restart);


//functions
function init(){

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
    }
    boardSetup = true;

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

    //initialize gems
    gemsMap.forEach((element)=>{
        let newGem = new Gem(nodes[element[0]][element[1]]);
        nodes[element[0]][element[1]].contains.push(newGem);
        gems.push(newGem);
        newGem.drawGem();
    })

    //initialize player(kim)
    kim = new Player(nodes[0][0]);
    nodes[0][0].contains.push(kim);
    kim.drawPlayer();

    //initialize ghosts
    kanye = new Ghost(nodes[8][8]);
    ghosts.push(kanye);
    nodes[8][8].contains.push(kanye);
    kanye.drawGhost('kanye');


    //initialize ghostMove interval
    intervId = setInterval(ghostMove, 500);

}

//game event functions
function playerMove(e){
    switch (e.keyCode) {
        case 37: //left
            kLeft = true;
            if (kim.y!==0 && nodes[kim.x][kim.y-1]){
                if(!collisionDetectionWall(nodes[kim.x][kim.y-1])){
                    nodes[kim.x][kim.y].updateBG("black", false);
                    kim.y--;
                    kim.node = nodes[kim.x][kim.y];
                }
            }
            collisionDetectionGem(kim.node);
            collisionDetectionGhost(kim.node);
            render();
        break;
        case 38: //up
        console.log(wallMap.includes([1, 1]));
            if (kim.x!==0 && nodes[kim.x-1][kim.y]){
                if(!collisionDetectionWall(nodes[kim.x-1][kim.y])){
                    nodes[kim.x][kim.y].updateBG("black", false);
                    kim.x--;
                    kim.node = nodes[kim.x][kim.y];
                }
            }
            collisionDetectionGem(kim.node);
            render();
            break;
        case 39: //right
            kLeft = false;
            if (kim.y!==NUM_COLS-1 && nodes[kim.x][kim.y+1]){
                if(!collisionDetectionWall(nodes[kim.x][kim.y+1])){
                    nodes[kim.x][kim.y].updateBG("black", false);
                    kim.y++;
                    kim.node = nodes[kim.x][kim.y];
                    }
                }
                collisionDetectionGem(kim.node);
                render();
            break;
        case 40: //down
            if (kim.x!==NUM_ROWS-1 && nodes[kim.x+1][kim.y]){
                if(!collisionDetectionWall(nodes[kim.x+1][kim.y])){
                    nodes[kim.x][kim.y].updateBG("black", false);
                    kim.x++;
                    kim.node = nodes[kim.x][kim.y];
                }
            }
            collisionDetectionGem(kim.node);
            render();
            break;
    }

}
function ghostMove(){

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
function collisionDetectionGem(node){
//check for kim/gem collision
gems.forEach((gem, i)=>{
    if (gem.node.value === node.value){
        score++;
        gems.splice(i,1);
        pointsEl.innerText = score;
    }
});

}
function collisionDetectionGhost(node){
    //check and handle ghost/node collision
    


}
function gameOver(){

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
        ghost.drawGhost('kanye');
    })

}

//helper functions
function nodeToCoord(node){
    let x = Math.floor(node/NUM_COLS);
    let y = node%NUM_COLS;
    return [x,y];
}
function coordToNode(x,y){
    return ((x*NUM_COLS)+(y));
}


//full array
let allSquares = [
[0,0],
[0,1],
[0,2],
[0,3],
[0,4],
[0,5],
[0,6],
[0,7],
[0,8],
[1,0],
[1,1],
[1,2],
[1,3],
[1,4],
[1,5],
[1,6],
[1,7],
[1,8],
[2,0],
[2,1],
[2,2],
[2,3],
[2,4],
[2,5],
[2,6],
[2,7],
[2,8],
[3,0],
[3,1],
[3,2],
[3,3],
[3,4],
[3,5],
[3,6],
[3,7],
[3,8],
[4,0],
[4,1],
[4,2],
[4,3],
[4,4],
[4,5],
[4,6],
[4,7],
[4,8],
[5,0],
[5,1],
[5,2],
[5,3],
[5,4],
[5,5],
[5,6],
[5,7],
[5,8],
[6,0],
[6,1],
[6,2],
[6,3],
[6,4],
[6,5],
[6,6],
[6,7],
[6,8],
[7,0],
[7,1],
[7,2],
[7,3],
[7,4],
[7,5],
[7,6],
[7,7],
[7,8],
[8,0],
[8,1],
[8,2],
[8,3],
[8,4],
[8,5],
[8,6],
[8,7],
[8,8],
[9,0],
[9,1],
[9,2],
[9,3],
[9,4],
[9,5],
[9,6],
[9,7],
[9,8],
[10,0],
[10,1],
[10,2],
[10,3],
[10,4],
[10,5],
[10,6],
[10,7],
[10,8]
];