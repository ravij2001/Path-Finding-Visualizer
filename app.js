const algoMenuBtn = document.getElementById('selectAlgo');
const algoMenu = document.getElementById('algoMenu');
const mazeMenuBtn = document.getElementById('selectMaze');
const mazeMenu = document.getElementById('mazeMenu');

algoMenuBtn.addEventListener('click', () => {
  mazeMenuBtn.classList.remove('opened');
  mazeMenu.classList.remove('show');
  algoMenuBtn.classList.toggle('opened');
  algoMenu.classList.toggle('show');
});

mazeMenuBtn.addEventListener('click', () => {
  algoMenuBtn.classList.remove('opened');
  algoMenu.classList.remove('show');
  mazeMenuBtn.classList.toggle('opened');
  mazeMenu.classList.toggle('show');
});

const visualizeBtn = document.getElementById('visualizeButton');
let selectedAlgorithm = 0;
const algos = document.querySelectorAll('#algoMenu li');
algos.forEach((algo) => {
  algo.addEventListener('click', (e) => {
    selectedAlgorithm = algo.value;
    // console.log(selectedAlgorithm);
    switch (selectedAlgorithm) {
      // case 0:
      //   visualizeBtn.innerText = 'Visualize Dijkstra !';
      //   break;
      case 1:
        visualizeBtn.innerText = 'Visualize Dijkstra !';
        break;
      case 2:
        visualizeBtn.innerText = 'Visualize A* !';
        break;
      case 3:
        visualizeBtn.innerText = 'Visualize BFS !';
        break;
      case 4:
        visualizeBtn.innerText = 'Visualize DFS !';
        break;
    }
  });
});
// const visualizeBtn = document.getElementById('visualizeButton');
let selectedMaze = 0;
const mazes = document.querySelectorAll('#mazeMenu li');
mazes.forEach((maze) => {
  maze.addEventListener('click', (e) => {
    selectedMaze = maze.value;
    // console.log(selectedAlgorithm);
    switch (selectedMaze) {
      case 1:
        console.log('Maze');
        randomMaze();
        // visualizeBtn.innerText = 'Visualize Dijkstra !';
        break;
    }
  });
});

function minDistance(dist, visited) {
  let min = Number.MAX_VALUE;
  let min_index = -1;

  for (let v = 0; v < rows * cols; v++) {
    // for (let u = 0; u < cols; u++) {
    if (visited[v] == false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
    // }
  }
  return min_index;
}

function animateDijkstra(nodesToAnimate, pathNodes) {
  for (let i = 0; i < nodesToAnimate.length; i++) {
    setTimeout(() => {
      node = nodesToAnimate[i];
      if (
        !document
          .getElementById(node[0] + '-' + node[1])
          .classList.contains('start') &&
        !document
          .getElementById(node[0] + '-' + node[1])
          .classList.contains('finish')
      ) {
        document.getElementById(node[0] + '-' + node[1]).className = 'visited';
      }
    }, 20 * i);
  }
  setTimeout(() => {
    animateShortestPath(pathNodes);
  }, 20 * nodesToAnimate.length);
}

function animateShortestPath(pathNodes) {
  for (let i = 0; i < pathNodes.length; i++) {
    setTimeout(() => {
      node = pathNodes[i];
      if (
        !document
          .getElementById(node[0] + '-' + node[1])
          .classList.contains('start') &&
        !document
          .getElementById(node[0] + '-' + node[1])
          .classList.contains('finish')
      ) {
        document.getElementById(node[0] + '-' + node[1]).classList.add('path');
      }
    }, 40 * i);
  }
}

function dijkstraAlgorithm() {
  var maze = [];
  let coOr = [];
  let itt = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      coOr[itt] = [i, j];
      itt++;
    }
  }
  for (let i = 0; i < rows; i++) {
    maze[i] = new Array(cols).fill(0);
  }

  // var rowCount = 0;
  // var colCount = 0;
  var nodeValue = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (document.getElementById(i + '-' + j).classList.contains('wall')) {
        maze[i][j] = -1;
      } else {
        maze[i][j] = nodeValue;
      }
      nodeValue++;
    }
  }
  // console.log(maze);

  var adjList = {};
  var possibleMoves = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (maze[i][j] == -1) {
        continue;
      }

      var currNode = maze[i][j];
      var neighbours = [];

      for (var count = 0; count < possibleMoves.length; count++) {
        var nRow = possibleMoves[count][0] + i;
        var nCol = possibleMoves[count][1] + j;

        if (nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols) {
          if (maze[nRow][nCol] != -1) {
            neighbours.push([nRow, nCol]);
          }
        }
      }

      adjList[currNode] = neighbours;
    }
  }
  // console.log(maze);
  // console.log(adjList);

  let dist = new Array(rows * cols).fill(Number.MAX_VALUE);
  let parent = new Array(rows * cols).fill(Number.MAX_VALUE);
  let visited = new Array(rows * cols).fill(false);

  // for (let i = 0; i < rows; i++) {
  //   dist[i] = new Array(cols).fill(Number.MAX_VALUE);
  //   visited[i] = new Array(cols).fill(false);
  // }

  let index = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (document.getElementById(i + '-' + j).classList.contains('start')) {
        dist[index] = 0;
        parent[index] = -1;
      }
      index++;
    }
  }
  // console.log(dist);

  let found = false;
  let target;
  let nodesToAnimate = [];
  for (let count = 0; count < rows * cols; count++) {
    var u = minDistance(dist, visited);
    // console.log(u);

    visited[u] = true;

    // for (let i = 0; i < rows * cols; i++) {

    // }
    // console.log(adjList[u[0] * 60 + u[1] - (u[0] + 1)]);
    // adjList[u[0] * 60 + u[1] - (u[0] + 1)].forEach((n) => {
    //   if (!visited[n[0]][n[1]] && dist[u[0]][u[1]] + 1 < dist[n[0]][n[1]]) {
    //     dist[n[0]][n[1]] = dist[u[0]][u[1]] + 1;
    //   }
    // });
    let adj = adjList[u];
    // console.log(adjList[610]);
    // console.log(typeof adj);
    if (adj) {
      for (let i = 0; i < adj.length; i++) {
        var n = adj[i];

        if (
          !visited[n[0] * 60 + n[1]] &&
          dist[u] + 1 < dist[n[0] * 60 + n[1]]
        ) {
          dist[n[0] * 60 + n[1]] = dist[u] + 1;
          parent[n[0] * 60 + n[1]] = u;

          nodesToAnimate.push([n[0], n[1]]);
          // document.getElementById(n[0] + '-' + n[1]).classList.add('visited');
          // setTimeout(() => {
          // }, 1000);
          // console.log('done');
          if (
            document
              .getElementById(n[0] + '-' + n[1])
              .classList.contains('finish')
          ) {
            target = n[0] * 60 + n[1];
            found = true;
          }
        }
      }
    }
    if (found) {
      break;
    }
  }
  console.log(dist);
  console.log(parent);

  let par = parent[target];
  let pathNodes = [];
  while (par) {
    let n = coOr[par];
    console.log(n);
    pathNodes.push(n);
    // document.getElementById(n[0] + '-' + n[1]).className = 'shortest-path-node';
    par = parent[par];
  }
  animateDijkstra(nodesToAnimate, pathNodes.reverse());
  // animateShortestPath(pathNodes.reverse());
}

function BFS() {
  var maze = [];
  let coOr = [];
  let itt = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      coOr[itt] = [i, j];
      itt++;
    }
  }
  for (let i = 0; i < rows; i++) {
    maze[i] = new Array(cols).fill(0);
  }

  // var rowCount = 0;
  var startCoor = [];
  // var colCount = 0;
  var nodeValue = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (document.getElementById(i + '-' + j).classList.contains('wall')) {
        maze[i][j] = -1;
      } else {
        maze[i][j] = nodeValue;
      }
      if (document.getElementById(i + '-' + j).classList.contains('start')) {
        startCoor.push(i);
        startCoor.push(j);
      }
      nodeValue++;
    }
  }
  // console.log(maze);

  var adjList = {};
  var possibleMoves = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (maze[i][j] == -1) {
        continue;
      }

      var currNode = maze[i][j];
      var neighbours = [];

      for (var count = 0; count < possibleMoves.length; count++) {
        var nRow = possibleMoves[count][0] + i;
        var nCol = possibleMoves[count][1] + j;

        if (nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols) {
          if (maze[nRow][nCol] != -1) {
            neighbours.push([nRow, nCol]);
          }
        }
      }

      adjList[currNode] = neighbours;
    }
  }
  // console.log(maze);
  // console.log(adjList);

  // let dist = new Array(rows * cols).fill(Number.MAX_VALUE);
  let visited = new Array(rows * cols).fill(false);
  let parent = new Array(rows * cols).fill(Number.MAX_VALUE);

  // for (let i = 0; i < rows; i++) {
  //   dist[i] = new Array(cols).fill(Number.MAX_VALUE);
  //   visited[i] = new Array(cols).fill(false);
  // }

  var queue = [];
  // console.log(queue);
  // console.log(maze);

  var solved = false;

  var nodesToAnimate = [];
  queue.push(startCoor);
  parent[startCoor[0] * 60 + startCoor[1]] = -1;
  visited[startCoor[0] * 60 + startCoor[1]] = true;
  // console.log(startCoor);
  while (queue.length) {
    // console.log('In');
    var nodeCoor = queue[0];
    queue.shift();
    var node = maze[nodeCoor[0]][nodeCoor[1]];

    if (
      document
        .getElementById(nodeCoor[0] + '-' + nodeCoor[1])
        .classList.contains('finish')
    ) {
      target = nodeCoor[0] * 60 + nodeCoor[1];
      solved = true;
      break;
    }

    var adj = adjList[node];
    for (let i = 0; i < adj.length; i++) {
      let n = adj[i];

      if (!visited[n[0] * 60 + n[1]]) {
        visited[n[0] * 60 + n[1]] = true;
        nodesToAnimate.push([n[0], n[1]]);
        parent[n[0] * 60 + n[1]] = node;
        queue.push(n);
      }
    }
    // console.log(queue.shift());
    // console.log('helo');
  }
  console.log(parent);
  console.log(target);
  let par = parent[target];
  let pathNodes = [];
  while (par != -1) {
    let n = coOr[par];
    // console.log(n);
    pathNodes.push(n);
    // document.getElementById(n[0] + '-' + n[1]).className = 'shortest-path-node';
    par = parent[par];
  }
  console.log(nodesToAnimate);
  animateDijkstra(nodesToAnimate, pathNodes.reverse());
}
function DFS() {
  var maze = [];
  let coOr = [];
  let itt = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      coOr[itt] = [i, j];
      itt++;
    }
  }
  for (let i = 0; i < rows; i++) {
    maze[i] = new Array(cols).fill(0);
  }

  // var rowCount = 0;
  var startCoor = [];
  // var colCount = 0;
  var nodeValue = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (document.getElementById(i + '-' + j).classList.contains('wall')) {
        maze[i][j] = -1;
      } else {
        maze[i][j] = nodeValue;
      }
      if (document.getElementById(i + '-' + j).classList.contains('start')) {
        startCoor.push(i);
        startCoor.push(j);
      }
      nodeValue++;
    }
  }
  // console.log(maze);

  var adjList = {};
  var possibleMoves = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (maze[i][j] == -1) {
        continue;
      }

      var currNode = maze[i][j];
      var neighbours = [];

      for (var count = 0; count < possibleMoves.length; count++) {
        var nRow = possibleMoves[count][0] + i;
        var nCol = possibleMoves[count][1] + j;

        if (nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols) {
          if (maze[nRow][nCol] != -1) {
            neighbours.push([nRow, nCol]);
          }
        }
      }

      adjList[currNode] = neighbours;
    }
  }
  // console.log(maze);
  // console.log(adjList);

  // let dist = new Array(rows * cols).fill(Number.MAX_VALUE);
  let visited = new Array(rows * cols).fill(false);
  let parent = new Array(rows * cols).fill(Number.MAX_VALUE);

  // for (let i = 0; i < rows; i++) {
  //   dist[i] = new Array(cols).fill(Number.MAX_VALUE);
  //   visited[i] = new Array(cols).fill(false);
  // }

  var stack = [];
  // console.log(queue);
  // console.log(maze);

  var solved = false;
  var target;

  var nodesToAnimate = [];
  stack.push(startCoor);
  parent[startCoor[0] * 60 + startCoor[1]] = -1;
  visited[startCoor[0] * 60 + startCoor[1]] = true;
  // console.log(startCoor);
  while (stack.length) {
    // console.log('In');
    var nodeCoor = stack[stack.length - 1];
    // visited[nodeCoor[0] * 60 + nodeCoor[1]] = true;
    // queue.shift();
    var node = maze[nodeCoor[0]][nodeCoor[1]];

    if (
      document
        .getElementById(nodeCoor[0] + '-' + nodeCoor[1])
        .classList.contains('finish')
    ) {
      target = nodeCoor[0] * 60 + nodeCoor[1];
      solved = true;
      break;
    }

    var adj = adjList[node];
    let unvisitedNodes = [];
    for (let i = 0; i < adj.length; i++) {
      let n = adj[i];

      // unvisitedNodes = [];
      if (!visited[n[0] * 60 + n[1]]) {
        unvisitedNodes.push(n);
        // visited[n[0] * 60 + n[1]] = true;
        // nodesToAnimate.push([n[0], n[1]]);
        // parent[n[0] * 60 + n[1]] = node;
        // queue.push(n);
      }
    }
    if (unvisitedNodes.length) {
      let selectedAdj =
        unvisitedNodes[Math.floor(Math.random() * unvisitedNodes.length)];
      console.log(selectedAdj);
      stack.push(selectedAdj);
      // console.log(stack);
      visited[selectedAdj[0] * 60 + selectedAdj[1]] = true;
      nodesToAnimate.push(selectedAdj);
      parent[selectedAdj[0] * 60 + selectedAdj[1]] = node;
    } else {
      stack.pop();
    }
    // console.log(queue.shift());
    // console.log('helo');
  }
  // console.log(parent);
  // console.log(target);
  let par = parent[target];
  let pathNodes = [];
  while (par != -1) {
    let n = coOr[par];
    // console.log(n);
    pathNodes.push(n);
    // document.getElementById(n[0] + '-' + n[1]).className = 'shortest-path-node';
    par = parent[par];
  }
  console.log(nodesToAnimate);
  animateDijkstra(nodesToAnimate, pathNodes.reverse());
}

visualizeBtn.addEventListener('click', () => {
  console.log(selectedAlgorithm);
  switch (selectedAlgorithm) {
    case 0:
      visualizeBtn.innerText = 'Select Algorithm!!';
      break;
    case 1:
      dijkstraAlgorithm();
      break;
    case 3:
      BFS();
      break;
    case 4:
      DFS();
      break;
  }
});
