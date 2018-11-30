window.onload = init

const logs = (a) => { console.log(a); return a; }

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -20;
    camera.position.y = 50;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    const renderer = initRenderer();
    scene.add(makeStone());

    addLight(THREE, scene)
    const controls = initControls(camera)
    animate()

    document.querySelector("#WebGL-output").append(renderer.domElement);
    
    function animate(time) {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        controls.update();
    }
}

function initRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    return renderer;
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

function addLight(THREE, scene) {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-50, 50, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0x888888);
    spotLight2.position.set(50, -50, 10);
    spotLight2.castShadow = false;
    scene.add(spotLight2);
}

function makeStone() {
    
    const height = 40
    const diameter = 20
    const radius = diameter /2


    const points =[]
    for (let i = 0 ;i<1000;i++) {
        points.push(generatePoint())
    }
    const geometry = new THREE.ConvexGeometry( points );
    const material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    const mesh = new THREE.Mesh( geometry, material );

    function isInside(x,y,z) {
        return Math.pow(x,2) + Math.pow(z,2) <= Math.pow(radius,2)/(2*Math.pow(height,2)) * Math.pow(y-height,2)
    }

    function generatePointCoordinates() {
        const x = Math.random() * diameter - radius
        const y = Math.random() * height - height/2
        const z = Math.random() * diameter - radius
        return [x,y,z]
    }

    function generatePoint(){
        const [x,y,z] = generatePointCoordinates()
        if (isInside(x,y,z)) {
            // console.log(x,y,z)
            return new THREE.Vector3(x,y,z)
        }
        else return generatePoint()
    }

    return mesh
}

