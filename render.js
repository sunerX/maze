// Создание сцены

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

window.addEventListener(
  "resize",
  function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

// Создание контролов

let controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 40;
controls.update();

// Запуск анимации
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function addMaze() {
  for (let x = 0; x < 25; x++) {
    for (let y = 0; y < 25; y++) {
      if (maze[x][y] === 0) {
        let material = new THREE.MeshNormalMaterial({});
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = x;
        cube.position.y = y;
        scene.add(cube);
      }
    }
  }
}

function addPlayer({ x, y }) {
  let material = new THREE.MeshBasicMaterial({ color: 0 });
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  scene.add(cube);
  return cube;
}
