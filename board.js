const board = document.getElementById('board');

let rows = 22;
let cols = 60;
// let nodes = [];

for (let i = 0; i < rows; i++) {
  let row = document.createElement('tr');
  row.id = 'row ' + i;
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement('td');
    cell.id = i + '-' + j;
    if (i == 10 && j == 10) {
      cell.classList.add('start');
    } else if (i == 10 && j == 40) {
      cell.classList.add('finish');
    } else {
      cell.classList.add('unvisited');
    }
    row.appendChild(cell);
    // nodes.push(Node(cell.id, cell.className));
  }
  board.appendChild(row);
}

// Adding Walls
const cells = document.querySelectorAll('td');
let mouseDown = false;
let unvisitedClicked = false;
let startClicked = false;
let finishClicked = false;

cells.forEach((cell) => {
  cell.addEventListener('mousedown', () => {
    mouseDown = true;
    if (cell.classList.contains('start')) {
      startClicked = true;
      cell.classList.replace('start', 'unvisited');
    } else if (cell.classList.contains('finish')) {
      finishClicked = true;
      cell.classList.replace('finish', 'unvisited');
    } else {
      unvisitedClicked = true;
      cell.classList.replace('unvisited', 'wall');
    }
  });
  cell.addEventListener('mouseenter', () => {
    if (mouseDown && unvisitedClicked) {
      cell.classList.replace('unvisited', 'wall');
    } else if (mouseDown && startClicked) {
      if (cell.classList.contains('wall')) {
        cell.classList.replace('wall', 'start');
      } else if (cell.classList.contains('start')) {
        cell.classList.replace('start', 'unvisited');
      } else {
        cell.classList.replace('unvisited', 'start');
      }
      cell.classList.add('start');
    } else if (mouseDown && finishClicked) {
      if (cell.classList.contains('wall')) {
        cell.classList.replace('wall', 'finish');
      } else if (cell.classList.contains('finish')) {
        cell.classList.replace('finish', 'unvisited');
      } else {
        cell.classList.replace('unvisited', 'finish');
      }
      cell.classList.add('finish');
    }
  });
  cell.addEventListener('mouseleave', () => {
    if (mouseDown && startClicked) {
      cell.classList.remove('start');
    } else if (mouseDown && finishClicked) {
      cell.classList.remove('finish');
    }
  });
  cell.addEventListener('mouseup', () => {
    mouseDown = false;
    if (startClicked) {
      if (cell.classList.contains('wall')) {
        cell.classList.replace('wall', 'start');
      } else {
        cell.classList.replace('unvisited', 'start');
      }
      startClicked = false;
    }
    if (finishClicked) {
      if (cell.classList.contains('wall')) {
        cell.classList.replace('wall', 'finish');
      } else {
        cell.classList.replace('unvisited', 'finish');
      }
      finishClicked = false;
    } else {
      unvisitedClicked = false;
      cell.classList.replace('unvisited', 'wall');
    }
  });
});

function resetBoard() {
  document.querySelectorAll('td').forEach((cell) => {
    if (cell.id == '10-10') {
      cell.className = 'start';
    } else if (cell.id == '10-40') {
      cell.className = 'finish';
    } else {
      cell.className = 'unvisited';
    }
  });
}

const resetBoardBtn = document.getElementById('startButtonClearBoard');
resetBoardBtn.addEventListener('click', resetBoard);
