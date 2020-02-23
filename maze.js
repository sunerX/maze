function generateMaze() {
  let maze = new Array(25).fill().map(() => new Array(25).fill().map(() => new Array(25).fill().map(() => true)));

  for (let x = 1; x < 25; x += 2) {
    for (let y = 1; y < 25; y += 2) {
      for (let z = 1; z < 25; z += 2) {
        maze[x][y][z] = false;
      }
    }
  }

  let isVisited = new Array(12).fill().map(() => new Array(12).fill().map(() => new Array(12).fill(false)));
  isVisited[0][0][0] = true;
  let stack = [[0, 0, 0]];
  while (stack.length > 0) {
    let [x, y, z] = stack.pop();
    let variants = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1]
    ].filter(
      ([x, y, z]) => x >= 0 && y >= 0 && z >= 0 && x < 12 && y < 12 && z < 12 && !isVisited[x][y][z]
    );
    if (variants.length > 0) {
      let n = Math.floor(Math.random() * variants.length);
      let [x2, y2, z2] = variants[n];
      isVisited[x2][y2][z2] = true;

      let mazeX = 2 * x + 1 + x2 - x, mazeY = 2 * y + 1 + y2 - y, mazeZ = 2 * z + 1 + z2 - z;
      maze[mazeX][mazeY][mazeZ] = false;
      stack.push([x, y, z], [x2, y2, z2]);
    }
  }
  maze[0][0][1] = false;
  maze[24][24][23] = false;

  return maze;
}
