function generateMaze() {
  let maze = new Array(25).fill().map(() => new Array(25).fill(true));

  for (let x = 1; x < 25; x += 2) {
    for (let y = 1; y < 25; y += 2) {
      maze[x][y] = false;
    }
  }

  let isVisited = new Array(12).fill(0).map(() => new Array(12).fill(false));
  isVisited[0][0] = true;
  let stack = [[0, 0]];
  while (stack.length > 0) {
    let [x, y] = stack.pop();
    let variants = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ].filter(
      ([x, y]) => x >= 0 && y >= 0 && x < 12 && y < 12 && !isVisited[x][y]
    );
    if (variants.length > 0) {
      let n = Math.floor(Math.random() * variants.length);
      let [x2, y2] = variants[n];
      isVisited[x2][y2] = true;
      maze[2 * x + 1 + x2 - x][2 * y + 1 + y2 - y] = false;
      stack.push([x, y], [x2, y2]);
    }
  }
  maze[0][1] = false;
  maze[24][23] = false;

  return maze;
}
