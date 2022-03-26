//classes
class Node{
    constructor(val){
        this.value = val;
        this.type = "node";
        this.domEl = this.getDOMEl();
        this.contains = [];
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
        let bgImg = this.domEl.style.backgroundImage;
        console.log(bgImg);
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
        this.type = "player";
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
let NUM_ROWS = 11; 
let NUM_COLS = 9;
let boardSetup = false;
let nodes = [];
let kim;
let kanye;
let kris;
let kLeft = false;
let walls = [
    [1,1],
    [1,3],
    [1,4],
    [1,5],
    [2,4],
    [1,7],
    [3,1],
    [3,2],
    [3,6],
    [3,7],
    [5,1],
    [5,3],
    [5,4],
    [5,5],
    [4,4],
    [6,4],
    [5,7],
    [7,1],
    [7,2],
    [7,6],
    [7,7],
    [9,1],
    [9,3],
    [9,4],
    [9,5],
    [8,4],
    [9,7]
];
let gems = [
    //[0,0],
    [0,1],
    [0,2],
    [0,3],
    [0,4],
    [0,5],
    [0,6],
    [0,7],
    [0,8],
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
    [8,8],
    [9,0],
    //[9,1],
    [9,2],
    //[9,3],
    //[9,4],
    //[9,5],
    [9,6],
    //[9,7],
    [9,8],
    [10,0],
    [10,1],
    [10,2],
    [10,3],
    [10,4],
    [10,5],
    [10,6],
    [10,7],
    //[10,8]
];

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
    document.addEventListener("keydown", arrowHandler);
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
    walls.forEach((element)=>{
        let newWall = new Wall(nodes[element[0]][element[1]]);
        nodes[element[0]][element[1]].contains.push(newWall);
        newWall.drawWall();
    })

    //initialize gems
    gems.forEach((element)=>{
        let newGem = new Gem(nodes[element[0]][element[1]]);
        nodes[element[0]][element[1]].contains.push(newGem);
        newGem.drawGem();
    })

    //initialize player(kim)
    kim = new Player(nodes[0][0]);
    nodes[0][0].contains.push(kim);
    kim.drawPlayer();

    //initialize ghosts
    kanye = new Ghost(nodes[10][8]);
    nodes[0][0].contains.push(kanye);
    kanye.drawGhost('kanye');

}

//game event functions
function arrowHandler(){

}
function ghostMove(){

}
function collisionDetection(){

}
function gameOver(){

}

//rendering functions
function render(){

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