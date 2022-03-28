class PriorityQueue{
    constructor(){
        this.values = [];
    }
    enqueue(val, priority){
        this.values.push({val, priority});
        this.sort();
    }
    dequeue(){
        return this.values.shift();
    }
    sort(){
        this.values.sort((a,b)=>{return a.priority-b.priority});
    }
    length(){
        return this.values.length;
    }
}

function dijkstra(V,Adj,S,F)
{
    //code here
    let dist = new Array(V);
    let prev = new Array(V);
    let vis = new Array(V);
    for (let i=0; i<V; i++){
        vis[i] = false;
        dist[i] = Number.POSITIVE_INFINITY;
    }
    vis[S] = true;
    dist[S] = 0;
    prev[S] = 0;
    let pq = new PriorityQueue;
    pq.enqueue(S, 0);
    while (pq.length()>0){
        let deQ = pq.dequeue();
        let minI = deQ.val;
        vis[minI] = true;
        for (let edge of Adj[minI]){
            if (vis[edge[0]]){
                continue;
            }
            let newDist = dist[minI] + edge[1];
            if (newDist < dist[edge[0]]){
                dist[edge[0]] = newDist;
                prev[edge[0]] = minI;
                pq.enqueue(edge[0], newDist);
            }
        }
    }

    return [dist[F], prev[F]]
}

// let NUM_ROWS = 9; 
// let NUM_COLS = 20;

// for (let i=0; i<NUM_ROWS; i++){
//     for (let j=0; j< NUM_COLS; j++){
//         console.log("["+i+','+j+"]");
//     }
// }