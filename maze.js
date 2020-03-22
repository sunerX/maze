const SIZE = 6;
const OUTER_SIZE = 2 * SIZE + 1;

function generateMaze() {
  let maze = new Array(OUTER_SIZE).fill().map(() => new Array(OUTER_SIZE).fill().map(() => new Array(OUTER_SIZE).fill().map(() => true)));

  for (let x = 1; x < OUTER_SIZE; x += 2) {
    for (let y = 1; y < OUTER_SIZE; y += 2) {
      for (let z = 1; z < OUTER_SIZE; z += 2) {
        maze[x][y][z] = false;
      }
    }
  }

  let isVisited = new Array(SIZE).fill().map(() => new Array(SIZE).fill().map(() => new Array(SIZE).fill(false)));
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
      ([x, y, z]) => x >= 0 && y >= 0 && z >= 0 && x < SIZE && y < SIZE && z < SIZE && !isVisited[x][y][z]
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
  maze[OUTER_SIZE - 1][OUTER_SIZE - 1][OUTER_SIZE - 2] = false;

  return maze;
}
