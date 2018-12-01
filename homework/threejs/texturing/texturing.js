import SlicedConePointGenerator from "./pointGeneration.js"
import {initControls, addCamera, addLight, initRenderer} from "./sceneUtils.js"
window.onload = init

function init() {
    const scene = new THREE.Scene();
    const camera = addCamera(scene);
    const renderer = initRenderer();
    addLight(scene)
    const controls = initControls(camera)
    scene.add(makeStone());

    animate()

    function animate(time) {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        controls.update();
    }
}

function makeStone() {
    const height = 40
    const diameter = 20
    const pointCount = 10

    const generator = new SlicedConePointGenerator(height,diameter);
    const pointsCoordinates = generator.generateAllPointsCoordinates(pointCount);
    const geometryPoints = pointsCoordinates.map(([x,y,z]) => new THREE.Vector3(x,y,z))

    const geometry = new THREE.ConvexGeometry(geometryPoints);
    let material = new THREE.MeshPhongMaterial(); 
    material.map = getTexture("chess.png")
    logs(geometry.vertices)
    logs(geometry.faces)
    geometry.faceVertexUvs[0][0] = [new THREE.Vector2(0, .666), new THREE.Vector2(.5, .666), new THREE.Vector2(.5, 1), new THREE.Vector2(0, 1)];
    const mesh = new THREE.Mesh( geometry, material );
    return mesh

}

function countUV(x,y,z, height) {
    const v = y/height + 0.5
    const u = Math.atan2(x, y)/(2*Math.PI)
    return [u,v]
}

function getTexture(name) {    
    const loader = new THREE.TextureLoader();
    return loader.load("../texturing/assets/" + name, undefined, undefined, console.log )
}

const logs = (a) => { console.log(a); return a; }