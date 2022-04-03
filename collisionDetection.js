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
    //check for ghost/kim collision
    let collision = false;
    ghosts.forEach((ghost)=>{
        if (ghost.node.value === node.value){
            collision = true;
        }
    });
    return collision;
}
