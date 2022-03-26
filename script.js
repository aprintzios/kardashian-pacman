//classes
class Node{
    constructor(val){
        this.value = val;
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
    constructor(){
        
    }
}
class Ghost{
    constructor(){
        
    }
}
class Gem{
    constructor(){
        
    }
}
class Wall{
    constructor(node){
        this.node = node;
    }
    drawWall(){
        
    }
}

//vars/constants
let NUM_ROWS = 15; 
let NUM_COLS = 15;
let boardSetup = false;
let nodes = [];
let map = [
    ['1','-','-', '2'],
    ['-','-','-', '-'],
    ['4','-','-', '3']
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
            //<div id="sqr00" class="square"></div>
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
    let sqr = 0;
    for (let i=0; i<NUM_ROWS; i++){
        nodes[i] = [];
        for (let j=0; j<NUM_COLS; j++){
            let newNode = new Node(sqr);
            nodes[i].push(newNode);
            sqr++;
        }
    }

    let wallX = 4;
    let wallY = 4;
    let newWall = new Wall();

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
function drawMap(){

}
function drawPlayer(){

}
function drawGhosts(){

}
function drawGems(){

}

//helper functions
function nodeToCoord(node){
    let x = Math.floor(node/NUM_ROWS);
    let y = node%NUM_ROWS;
    return [x,y];
}
function coordToNode(x,y){
    return ((x*NUM_ROWS)+(y));
}