function updateMan({ key }) {
  let { x, y } = man;
  switch (key) {
    case "s":
      y--;
      break;
    case "a":
      x--;
      break;
    case "w":
      y++;
      break;
    case "d":
      x++;
      break;
    default:
  }
  if (x >= 0 && y >= 0 && x < 25 && y < 25 && maze[x][y] === 1) {
    man = { x, y };
    if (x === 24 && y === 23) {
      isFinished = true;
    }
  }
}
