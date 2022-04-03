function clearNode(node){
    node.updateBG("black", false);
}
function findMP(source, end){
    let result = dijkstra(NUM_ROWS*NUM_COLS,adj,source,end);
    let minPath = [];
    while (result[1] !== source){
        minPath.unshift(result[1]);
        result = dijkstra(NUM_ROWS*NUM_COLS,adj,source,result[1]);
    }
    minPath.unshift(result[1]);
    return minPath;  
}
function includedInWM(i, j){
    let included = false;
    wallModule.forEach((element)=>{
        if (element[0] === i && element[1] === j){
            included = true;
        }
    })
    return included;
}
function isWall(x,y){
    let included = false;
    wallMap.forEach((wall)=>{
        if (wall[0] === x && wall[1] === y){
            included = true;
        }
    });
    return included;
}
function kanyeLocationTaken(x,y){
    let taken = false;
    ghosts.forEach((kanye)=>{
        if (kanye.x === x && kanye.y === y){
            taken = true;
        }
    });
    return taken;
}
function checkForWin(){
    if (gems.length <1){
        win = true;
        gameOver();
    }
}
function nodeToCoord(node){
    let x = Math.floor(node/NUM_COLS);
    let y = node%NUM_COLS;
    return [x,y];
}
function coordToNode(x,y){
    return ((x*NUM_COLS)+(y));
}