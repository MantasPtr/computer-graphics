import { initPlane, initRenderer, initRobot, addLight, addKegs, addBoxes} from "./mesh.js"

window.onload = init

const logs = (a) => { console.log(a); return a; }

const baseHeight = 2
const armHeight = 10
const connectionHeight = 3
const connectionWidth = 3
const verticalArmSafe = 0.5
const horizontalArmSafe = 0.5
const armLenght = 15

let startTime;

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = initRenderer()

    const plane = initPlane();
    scene.add(plane);
    const { topKeg, bottomKeg } = addKegs(scene);
    const controls = initControls(camera)

    addLight(THREE, scene)
    const {leftBox, rightBox} = addBoxes(scene)

    const [rotationGroup, upDownGroup, armGroup, keg, box] = initRobot(scene)

    camera.position.x = -20;
    camera.position.y = 50;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    document.querySelector("#WebGL-output").append(renderer.domElement);

    animate()
    
    function animate(time) {
        //l ogs(keg.getWorldPosition());
        const positions = calcAnimations(time)
        rotationGroup.rotation.y = positions.rotation;
        upDownGroup.position.y = positions.connectionY;
        armGroup.position.x = positions.armX;
        topKeg.visible = positions.kegs[0]
        keg.visible = positions.kegs[1]
        bottomKeg.visible = positions.kegs[2]
        leftBox.visible = positions.boxes[0]
        box.visible = positions.boxes[1]
        rightBox.visible = positions.boxes[2]
        //logs(box.getWorldPosition())
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        controls.update();
    }
}

const upMin = baseHeight+verticalArmSafe+connectionHeight/2
const upMax = baseHeight+armHeight-horizontalArmSafe-connectionHeight/2

const sideMin = -armLenght/2+horizontalArmSafe+connectionWidth/2
const sideMax = armLenght/2-horizontalArmSafe-connectionWidth/2

const keyFrame = [
    {rotation:  1*Math.PI/4, connectionY: upMin, armX: sideMin, time: 2000, kegs: [  true, false, false], boxes: [true, false, false]},
    {rotation:  1*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, true, false], boxes: [true, false, false]},
    {rotation:  1*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, true, false], boxes: [true, false, false]},
    {rotation:  5*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, true, false], boxes: [true, false, false]},
    {rotation:  5*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, false, true], boxes: [true, false, false]},
    {rotation:  5*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  false, false, true], boxes: [true, false, false]},
    {rotation:  3*Math.PI/4, connectionY: upMin, armX: sideMin, time: 2000, kegs: [  false, false, true], boxes: [true, false, false]},
    {rotation:  3*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, false, true], boxes: [false, true, false]},
    {rotation:  3*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, false, true], boxes: [false, true, false]},
    {rotation:  7*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, false, true], boxes: [false, true, false]},
    {rotation:  7*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, false, true], boxes: [false, false, true]},
    {rotation:  7*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  false, false, true], boxes: [false, false, true]},
    {rotation:  5*Math.PI/4, connectionY: upMin, armX: sideMin, time: 2000, kegs: [  false, false, true], boxes: [false, false, true]},
    {rotation:  5*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  false, true, false], boxes: [false, false, true]},
    {rotation:  5*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, true, false], boxes: [false, false, true]},
    {rotation:  1*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  false, true, false], boxes: [false, false, true]},
    {rotation:  1*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  true, false, false], boxes: [false, false, true]},
    {rotation:  1*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  true, false, false], boxes: [false, false, true]},
    {rotation: -1*Math.PI/4, connectionY: upMin, armX: sideMin, time: 2000, kegs: [  true, false, false], boxes: [false, false, true]},
    {rotation: -1*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  true, false, false], boxes: [false, true, false]},
    {rotation: -1*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  true, false, false], boxes: [false, true, false]},
    {rotation:  3*Math.PI/4, connectionY: upMax, armX: sideMin, time: 2000, kegs: [  true, false, false], boxes: [false, true, false]},
    {rotation:  3*Math.PI/4, connectionY: upMin, armX: sideMax, time: 2000, kegs: [  true, false, false], boxes: [true, false, false]},
    {rotation:  3*Math.PI/4, connectionY: upMin, armX: sideMin, time: 1000, kegs: [  true, false, false], boxes: [true, false, false]},
]

let currentKeyFrameIndex=0;


function calcAnimations(time){
   
    if (!startTime){
        startTime = time
    }
    let animDelta = time - startTime || 0;

    if (!time) {
        currentKeyFrameIndex = 0;
        return keyFrame[0]
    }
   
    while (animDelta > keyFrame[currentKeyFrameIndex].time ) {
        startTime += keyFrame[currentKeyFrameIndex].time
        currentKeyFrameIndex = nextKeyPointIndex(currentKeyFrameIndex)
        animDelta = time - startTime || 0;
    }
    return animDiffOfKeyFrames(currentKeyFrameIndex, animDelta)
}

function nextKeyPointIndex(currentIndex){
    return (currentIndex+1) % keyFrame.length;
}

function animDiffOfKeyFrames(currentIndex, delta){
    
    const currentKeyFrame = keyFrame[currentIndex]
    const progress = delta / currentKeyFrame.time
    const nextKeyFrame = keyFrame[nextKeyPointIndex(currentIndex)]
    return animDiff (currentKeyFrame, nextKeyFrame, progress)
}

function animDiff(current, next, multi){
    const rotation =  current.rotation + multi * (next.rotation-current.rotation)
    const connectionY = current.connectionY + multi * (next.connectionY-current.connectionY)
    const armX = current.armX + multi * (next.armX-current.armX)
    return {rotation,connectionY, armX, kegs: current.kegs, boxes: current.boxes}
}

function initControls(camera) {
    const controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    return controls
}



