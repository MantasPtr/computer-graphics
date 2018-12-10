import { initPlane, initRenderer, initRobot, addLight, addKegs, addBoxes, newCameraMesh} from "./mesh.js";
import * as dat from '../libs/dat.gui.module.js';
import {calcAnimations} from "./animation.js";

window.onload = init

const logs = (a) => { console.log(a); return a; }



function resolveCamera(cameraString){
    switch(cameraString) {
        case "camera 1" :
            return camera1
        case "camera 2" :
            return camera2
        case "camera 3" :
            return camera3
    }
}

class Controls {
    constructor() {
        this.camera = "camera 1"
        this.fov = 45;
        this.dollyZoomDistance = 30
        this.displaySecondCamera = true
        this.displayThirdCamera = true
     }
}

const camera1 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
const camera2 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 110);
const camera3 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);

const doolyZoomHeight = 20
function init() {
    
    const controls = new Controls()
    const scene = new THREE.Scene();
    addGuiControls(controls)
    const renderer = initRenderer() 
    const plane = initPlane();
    scene.add(plane);
    const { topKeg, bottomKeg } = addKegs(scene);
    addLight(THREE, scene)
    const {leftBox, rightBox} = addBoxes(scene)
    const [rotationGroup, upDownGroup, armGroup, keg, box] = initRobot(scene)
    const cameraMesh = newCameraMesh()
    cameraMesh.position.x = -2.687;
    cameraMesh.position.y = 20;
    cameraMesh.position.z = -5.798
    scene.add( new THREE.AxesHelper( 50 ))
    
    scene.add(cameraMesh)
    
    camera1.position.x = -40;
    camera1.position.y = 100;
    camera1.position.z = -80;
    camera1.lookAt(scene.position);
    
    const sinA = 10/30
    const cosA = Math.sqrt(800)/30
    camera2.position.x = (cosA*30)/Math.sqrt(2);
    camera2.position.y = 10 + 30*sinA;
    camera2.position.z = (cosA*30)/Math.sqrt(2);
    camera2.lookAt(0,10,0)
    
    
    camera3.position.x = -2.687;
    camera3.position.y = 20;
    camera3.position.z = -5.798;
   
    const cameraHelper = new THREE.CameraHelper(camera3);
  
    scene.add(cameraHelper)
    camera3.lookAt(new THREE.Vector3(-10,10,-10))
  

    document.querySelector("#WebGL-output").append(renderer.domElement);
    animate()
    
    function animate(time) {
        const positions = calcAnimations(time)
        update1stCamera()
        update2ndCamera()
        update3rdCamera()
       
        
        rotationGroup.rotation.y = positions.rotation;
        upDownGroup.position.y = positions.connectionY;
        armGroup.position.x = positions.armX;
        topKeg.visible = positions.kegs[0]
        keg.visible = positions.kegs[1]
        bottomKeg.visible = positions.kegs[2]
        leftBox.visible = positions.boxes[0]
        box.visible = positions.boxes[1]
        rightBox.visible = positions.boxes[2]
        renderer.render(scene, resolveCamera(controls.camera));
        requestAnimationFrame(animate);
    }

    function update1stCamera (){
        camera1.fov = controls.fov
        camera1.updateProjectionMatrix() // update fov  
        cameraMesh.lookAt(keg.getWorldPosition())
    }
    function update2ndCamera (){
        const distance = controls.dollyZoomDistance
        camera2.position.x = (cosA*distance)/Math.sqrt(2);
        camera2.position.y = 10 + distance*sinA;
        camera2.position.z = (cosA*distance)/Math.sqrt(2);
        camera2.fov = Math.atan(doolyZoomHeight/distance)/Math.PI*180*2
        camera2.updateProjectionMatrix() // update fov  
        camera2.updateMatrixWorld() //force update helper
        cameraHelper.visible = controls.displaySecondCamera
        cameraHelper.update()
    }
    function update3rdCamera (){
        // camera3.up = new THREE.Vector3(-1,0,0)
        // cameraMesh.up = new THREE.Vector3(-1,0,0)
        camera3.lookAt(keg.getWorldPosition())
        const xDiff = Math.abs(keg.getWorldPosition().x - camera3.position.x)
        const zDiff = Math.abs(keg.getWorldPosition().z - camera3.position.z)
        const diff = Math.sqrt(Math.pow(xDiff,2) + Math.pow(zDiff,2))
        const threshold = 5
        if (diff < threshold) {
           
            const angle = (diff/threshold)
            // logs([-Math.cos(angle),Math.sin(angle)])
            cameraMesh.up = new THREE.Vector3(0,angle,angle-1)
            camera3.up = new THREE.Vector3(0,angle,angle-1)
        } else {
            cameraMesh.up = new THREE.Vector3(0,1,0)
            camera3.up = new THREE.Vector3(0,1,0)
        }
        // camera3.updateProjectionMatrix()
        cameraMesh.visible = controls.displayThirdCamera
    }
}

function addGuiControls(controls) {
    const gui = new dat.GUI();
    gui.add(controls, "camera", ["camera 1","camera 2","camera 3"]);
    gui.add(controls, "fov").min(1).max(180);
    gui.add(controls, "dollyZoomDistance").min(1).max(100);
    gui.add(controls, "displaySecondCamera")
    gui.add(controls, "displayThirdCamera")
}