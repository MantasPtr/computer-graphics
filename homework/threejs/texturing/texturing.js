import SlicedConePointGenerator from "./pointGeneration.js"
import {initControls, addCamera, addLight, initRenderer} from "./sceneUtils.js"
window.onload = init

function init() {
    const scene = new THREE.Scene();
    const camera = addCamera(scene);
    const renderer = initRenderer();
    addLight(scene)
    const controls = initControls(camera)
    const figure = makeStone()
    scene.add(figure);

    animate()
    const axesHelper = new THREE.AxesHelper( 50 );
    scene.add( axesHelper );
    function animate(time) {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        controls.update();
    }
}

function makeStone() {
    const height = 40
    const diameter = 20
    const pointCount = 100000

    const generator = new SlicedConePointGenerator(height,diameter);
    const pointsCoordinates = generator.generateAllPointsCoordinates(pointCount);
    const geometryPoints = pointsCoordinates.map(([x,y,z]) => new THREE.Vector3(x,y,z))

    const geometry = new THREE.ConvexGeometry(geometryPoints);
    let material = new THREE.MeshPhongMaterial(); 
    material.map = getTexture("chess.png")

    geometry.faces.forEach((face, idx) => {
        const A = geometry.vertices[face.a]
        const B = geometry.vertices[face.b]
        const C = geometry.vertices[face.c]
    
        let [vA,uA] = countUV(A, height)
        let [vB,uB] = countUV(B, height)
        let [vC,uC] = countUV(C, height)
        if ( hasDifferentSigns(A.x,B.x,C.x) && (A.z<0 || B.z<0 || C.z<0 )) {
            if (A.x < 0) vA += 1
            if (B.x < 0) vB += 1
            if (C.x < 0) vC += 1
        }
        geometry.faceVertexUvs[0][idx] = [new THREE.Vector2(vA/2, uA), new THREE.Vector2(vB/2, uB), new THREE.Vector2(vC/2, uC)];
        });
    const mesh = new THREE.Mesh( geometry, material );
   
    return mesh

}

function countUV({x,y,z}, height) {
    const v = y/height + 0.5
    const u = Math.atan2(x, z)/(2*Math.PI)+0.5
    return [u,v]
}

function hasDifferentSigns(a,b,c) {
    return !((a > 0 && b > 0 && c >0) || (a < 0 && b < 0 && c < 0)) 
}

function getTexture(name) {    
    const loader = new THREE.TextureLoader();
    const texture = loader.load("../texturing/assets/" + name, undefined, undefined, console.log )
    texture.repeat.set(2,1);
    texture.wrapS = THREE.RepeatWrapping;
    return texture
}

const logs = (a) => { console.log(a); return a; }