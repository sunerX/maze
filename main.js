let maze = new Array(25).fill(0).map(() => new Array(25).fill(0));

let pointX = 0, pointY = 1;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

let controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
controls.update();

function addCube(x, y) {
    let material = new THREE.MeshNormalMaterial({});
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    cube.position.y = y;
    scene.add(cube);
}

let material = new THREE.MeshBasicMaterial({ color: 0 });
let geometry = new THREE.BoxGeometry(1, 1, 1);
let man = new THREE.Mesh(geometry, material);
man.position.x = pointX;
man.position.y = pointY;
scene.add(man);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    man.position.x = pointX;
    man.position.y = pointY;
    renderer.render(scene, camera);
}
animate();

function generateMaze() {
    for (let x = 1; x < 25; x += 2) {
        for (let y = 1; y < 25; y += 2) {
            maze[x][y] = 1;
        }
    }

    let isVisited = new Array(12).fill(0).map(() => new Array(12).fill(false));
    isVisited[0][0] = true;
    let stack = [[0, 0]];
    while (stack.length > 0) {
        let [x, y] = stack.pop();
        let variants = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(
            ([x, y]) => x >= 0 && y >= 0 && x < 12 && y < 12 && !isVisited[x][y]
        );
        if (variants.length > 0) {
            let n = Math.floor(Math.random() * variants.length);
            let [x2, y2] = variants[n];
            isVisited[x2][y2] = true
            maze[2 * x + 1 + x2 - x][2 * y + 1 + y2 - y] = 1;
            stack.push([x, y], [x2, y2]);
        }

    }
    maze[0][1] = 1
    maze[24][23] = 1
}

generateMaze();

function renderBasicPartOfMaze() {
    for (let x = 0; x < 25; x++) {
        for (let y = 0; y < 25; y++) {
            if (maze[x][y] === 0) {
                addCube(x, y);
            }
        }
    }
}

renderBasicPartOfMaze();

addEventListener("keypress", ({ key }) => {
    let newPointX = pointX, newPointY = pointY
    switch (key) {
        case "s":
            newPointY--;
            break;
        case "a":
            newPointX--;
            break;
        case "w":
            newPointY++;
            break;
        case "d":
            newPointX++;
            break;
        default:

    }
    if (newPointX >= 0 && newPointY >= 0 && newPointX < 25 && newPointY < 25 && maze[newPointX][newPointY] === 1) {
        pointX = newPointX;
        pointY = newPointY;
        if (pointX === 24 && pointY === 23) {
            alert("ПОЗДРАВЛЯЕМ, ВЫ - ПОБЕДИТЕЛЬ")
            location.reload();
        }
    }


})
