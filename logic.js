let maze = generateMaze();
addMaze();
let player = { x: 0, y: 0, z: 1 };
animate();

addEventListener("keypress", function ({ key }) {
  let { x, y, z } = player;
  switch (key) {
    case "s":
      y--;
      break;
    case "a":
      x--;
      break;
    case "q":
      z--;
      break;
    case "w":
      y++;
      break;
    case "d":
      x++;
      break;
    case "e":
      z++;
      break;
    default:
  }

  if (x >= 0 && y >= 0 && z >= 0 && x < 25 && y < 25 && z < 25 && maze[x][y][z] === false) {
    player = { x, y, z };
    camera.position.x = x + 0.5;
    camera.position.y = y + 0.5;
    camera.position.z = z + 0.5;
    if (x === 24 && y === 24 && z === 23) {
      alert("Поздравляем, вы - победитель!");
      location.reload();
    }
  }
});
