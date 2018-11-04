window.onload = init

const logs = (a) => {console.log(a); return a;}

const baseHeight = 5
const armHeight = 5
const connectionHeight = 2.5
const connectionWidth = 2.5
const verticalArmSafe = 0.5
const horizontalArmSafe = 0.5 
const armLenght = 10

const minArmPosX = -armLenght/2+horizontalArmSafe+connectionWidth/2
const maxArmPosX = armLenght/2-horizontalArmSafe-connectionWidth/2-1.2


const rotation1Group = new THREE.Group();
const rotation2Group = new THREE.Group();
const armGroup = new THREE.Group();
const rotation1Controller = new KeyboardController({ step: Math.PI/36, incButton: "1", decButton: "3"})
const rotation2Controller = new KeyboardController({ min: -Math.PI/2, max: Math.PI/2, step: Math.PI/36, incButton: "4", decButton: "6"})
const armController = new KeyboardController({ min: minArmPosX, max: maxArmPosX, step: 0.2, incButton: "7", decButton: "9"})

document.addEventListener('keypress', (event) => {
    const key = event.key
    rotation1Controller.handlePress(key)
    rotation2Controller.handlePress(key)
    armController.handlePress(key)
  });

function init() {
    const scene = new THREE.Scene();
    // create a camera, which defines where we're looking at.
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const stats = new Stats();

    const plane = initPlane();
    scene.add(plane);

    const light = new THREE.PointLight( 0xffffff, 1, 200 );
    light.position.set( 50, 50, 50 );
    scene.add(light);

    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 40, -10 );
    spotLight.castShadow = true;
    scene.add( spotLight );

    initControls(camera, render)
    // create a render and set the size
    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
  
    const baseMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    const material1 = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    const material2 = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    const material3 = new THREE.MeshLambertMaterial( {color: 0x00ffff});// wireframe: true} );
    
    const baseGeometry = new THREE.CylinderGeometry(2,4,baseHeight,10)
    const base = new THREE.Mesh( baseGeometry, baseMaterial );
    base.position.y = baseHeight/2;
    base.castShadow = true; 
    scene.add(base);
    
    const vertical1ArmGeo = new THREE.CubeGeometry( 2, armHeight, 2);
    const vertical1Arm = new THREE.Mesh( vertical1ArmGeo, material1);
    vertical1Arm.position.y = baseHeight+armHeight/2;
    vertical1Arm.castShadow = true;
    rotation1Group.add(vertical1Arm);
    
    const middlePart1Geo = new THREE.CylinderGeometry(1.2,1.2,2.4,16);
    const middlePart1 = new THREE.Mesh(middlePart1Geo, material1 );
    middlePart1.position.y = baseHeight+armHeight
    middlePart1.rotation.x = Math.PI/2
    middlePart1.castShadow = true;
    rotation1Group.add(middlePart1)

    const middlePart2Geo = new THREE.CylinderGeometry(1.2,1.2,2.4,16);
    const middlePart2 = new THREE.Mesh(middlePart2Geo, material2 );66
    middlePart2.rotation.x = Math.PI/2
    middlePart2.castShadow = true;
    rotation2Group.add(middlePart2)

    const vertical2ArmGeo = new THREE.CubeGeometry( 2, armHeight, 2);
    const vertical2Arm = new THREE.Mesh( vertical2ArmGeo, material2);
    vertical2Arm.position.y = armHeight/2;
    vertical2Arm.castShadow = true;
    rotation2Group.add(vertical2Arm);

    const topPart1Geo = new THREE.CylinderGeometry(1.2,1.2,2.4,16);
    const topPart1 = new THREE.Mesh(topPart1Geo, material2 );
    topPart1.position.y = armHeight;
    topPart1.rotation.x = Math.PI/2
    topPart1.castShadow = true;
    rotation2Group.add(topPart1)

    const topPart2Geo = new THREE.CubeGeometry(2.4,2.4,2.4);
    const topPart2 = new THREE.Mesh(topPart2Geo, material2 );
    topPart2.position.y = armHeight;
    topPart2.position.z = 2.4
    topPart2.castShadow = true;
    rotation2Group.add(topPart2)

    const horizontalArmGeo = new THREE.CubeGeometry( armLenght, 1.5, 1.5);
    const horizontalArm = new THREE.Mesh( horizontalArmGeo, material3 );
    horizontalArm.castShadow = true;
    armGroup.add(horizontalArm);

    const needleGeo = new THREE.CylinderGeometry( 0.25, 0.2,3,16);
    const needle = new THREE.Mesh( needleGeo, material3 );
    needle.position.x = armLenght/2+1.5
    needle.rotation.z = Math.PI/2
    needle.castShadow = true;
    armGroup.add(needle);

    rotation2Group.add(armGroup)
    rotation2Group.position.y=baseHeight+armHeight
    rotation2Group.position.z=-2.4
    armGroup.position.z = 2.4
    armGroup.position.y = armHeight
    rotation1Group.add(rotation2Group)
    scene.add(rotation1Group)

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    document.querySelector("#WebGL-output").append(renderer.domElement);

    animate()

    function animate() {
        rotation1Group.rotation.y = rotation1Controller.value;
        rotation2Group.rotation.z = rotation2Controller.value;
        armGroup.position.x = armController.value;
        stats.update();
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
        controls.update();
    }
    function render() {
        stats.update();
    }
};

function initPlane(){
    const planeGeometry = new THREE.PlaneGeometry(60,20,0);
    const planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
    const plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow  = true;

    // rotate and position the plane
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x=15
    plane.position.y=0
    plane.position.z=0
    return plane
}

function initControls(camera,listening_function){
    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.addEventListener( 'change', listening_function );
}