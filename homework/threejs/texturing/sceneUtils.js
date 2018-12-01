


export function initControls(camera) {
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

export function addCamera(scene){
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -20;
    camera.position.y = 50;
    camera.position.z = 20;
    camera.lookAt(scene.position);
    return camera
}


export function initRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.querySelector("#WebGL-output").append(renderer.domElement);
    return renderer;
}

export function addLight(scene) {
    const ambientLight = new THREE.AmbientLight( 0xffffff,1 )
    scene.add(ambientLight)

    // const spotLight = new THREE.SpotLight(0xffffff,0.5);
    // spotLight.position.set(-50, -50, -50);
    // spotLight.castShadow = true;
    // scene.add(spotLight);

    // const spotLight2 = new THREE.SpotLight(0xffffff,1);
    // spotLight2.position.set(50, 0, -50);
    // spotLight2.castShadow = true;
    // scene.add(spotLight2);

    // const spotLight3 = new THREE.SpotLight(0xffffff,0.5);
    // spotLight3.position.set(50, 50, 50);
    // spotLight3.castShadow = false;
    // scene.add(spotLight3);

    // const spotLight4 = new THREE.SpotLight(0xffffff,0.5);
    // spotLight4.position.set(-50, 0, 50);
    // spotLight4.castShadow = false;
    // scene.add(spotLight4);
}