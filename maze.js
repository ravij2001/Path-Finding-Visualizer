function randomMaze() {
  let array = [];
  for (let i = 0; i < rows; i++) {
    array[i] = new Array(cols).fill(0);
  }

  for (let i = 0; i < (rows * cols) / 3; i++) {
    let x = Math.floor(Math.random() * 22);
    let y = Math.floor(Math.random() * 60);
    // console.log(x);
    // console.log(y);
    if (
      !document.getElementById(x + '-' + y).classList.contains('start') &&
      !document.getElementById(x + '-' + y).classList.contains('finish')
    ) {
      array[x][y] = 1;
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (array[i][j] == 1) {
        document.getElementById(i + '-' + j).className = 'wall';
      }
    }
  }
  // console.log(array);
}
// randomMaze();
