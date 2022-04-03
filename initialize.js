function clearOverlays(){
    overlayStartEl.style.display = "none";
    overlayWinEl.style.display = "none";
    overlayLoseEl.style.display = "none";
    overlayFinalEl.style.display = "none";
}
function setUpBoard(){
    //create DOM elements
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
    // //initialize ghosts
    for (let i=1; i<=NUM_KANYES; i++){
        let randX = Math.floor(Math.random()*NUM_ROWS);
        let randY = Math.floor(Math.random()*NUM_COLS);
        //need to make sure the coords arent a wall, kim or another kanye
        while ((randX===0 && randY === 0)||(isWall(randX, randY) || kanyeLocationTaken(randX, randY))){
            randX = Math.floor(Math.random()*NUM_ROWS);
            randY = Math.floor(Math.random()*NUM_COLS);
        }
        let newKanye = new Ghost(nodes[randX][randY], "kanye");
        ghosts.push(newKanye);
        newKanye.drawGhost();
    }
    kim = new Player(nodes[0][0]);
    kim.drawPlayer();
    boardSetup = true;
}