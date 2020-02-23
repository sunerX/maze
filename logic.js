let maze = generateMaze();
addMaze();
let player = addPlayer({ x: 0, y: 1 });
animate();

addEventListener("keypress", function({ key }) {
  let [x, y] = [player.position.x, player.position.y];
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

  if (x >= 0 && y >= 0 && x < 25 && y < 25 && maze[x][y] === false) {
    [player.position.x, player.position.y] = [x, y];
    if (x === 24 && y === 23) {
      alert("Поздравляем, вы - победитель!");
      location.reload();
    }
  }
});
