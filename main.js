let scene = new THREE.Scene();
let maze = generateMaze();
let man = { x: 0, y: 1, isPlayer: true };
let isFinished = false;

addMaze();
addMan(man);
animate();
addEventListener("keypress", event => {
  updateMan(event);
  if (isFinished) {
    alert("ПОЗДРАВЛЯЕМ, ВЫ - ПОБЕДИТЕЛЬ");
    location.reload();
  }
});
