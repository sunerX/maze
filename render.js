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
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

// Создание контролов

let controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.x = 0.5;
camera.position.y = 0.5;
camera.position.z = 1.5;
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
      for (let z = 0; z < 25; z++) {
        if (maze[x][y][z] === true) {
          let material = new THREE.MeshNormalMaterial({});
          let geometry = new THREE.BoxGeometry(1, 1, 1);
          let cube = new THREE.Mesh(geometry, material);
          cube.position.x = x;
          cube.position.y = y;
          cube.position.z = z;
          scene.add(cube);
        }
      }
    }
  }
}

