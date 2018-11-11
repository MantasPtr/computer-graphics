window.onload = init

const logs = (a) => {console.log(a); return a;}

const baseHeight = 2
const armHeight = 10
const connectionHeight = 2.5
const connectionWidth = 2.5
const verticalArmSafe = 0.5
const horizontalArmSafe = 0.5 
const armLenght = 10

const minConnectionPosY = baseHeight+verticalArmSafe+connectionHeight/2
const maxConnectionPosY = baseHeight+armHeight-horizontalArmSafe-connectionHeight/2

const minArmPosX = -armLenght/2+horizontalArmSafe+connectionWidth/2
const maxArmPosX = armLenght/2-horizontalArmSafe-connectionWidth/2


const rotationGroup1 = new THREE.Group();
const rotationGroup2 = new THREE.Group();
const armGroup = new THREE.Group();
const rotationController = new KeyboardController({ step: Math.PI/36, incButton: "1", decButton: "3"})
const upDownController = new KeyboardController({ min: minConnectionPosY, max: maxConnectionPosY, step: 0.2, incButton: "4", decButton: "6"})
const sidesController = new KeyboardController({ min: minArmPosX, max: maxArmPosX, step: 0.2, incButton: "7", decButton: "9"})

document.addEventListener('keypress', (event) => {
    const key = event.key
    rotationController.handlePress(key)
    upDownController.handlePress(key)
    sidesController.handlePress(key)
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
    const upDownMaterial = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    const connectionMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    const sidesMaterial = new THREE.MeshLambertMaterial( {color: 0x00ff00});// wireframe: true} );
    
    const baseGeometry = new THREE.CylinderGeometry(2,4,baseHeight,10)
    const base = new THREE.Mesh( baseGeometry, baseMaterial );
    base.position.y = baseHeight/2;
    base.castShadow = true; 
    scene.add(base);
    
    const verticalArmGeo = new THREE.CubeGeometry( 2, armHeight, 2);
    const verticalArm = new THREE.Mesh( verticalArmGeo, upDownMaterial);
    verticalArm.position.y = baseHeight+armHeight/2;
    verticalArm.castShadow = true;
    rotationGroup1.add(verticalArm);
    
    const middlePartGeo = new THREE.CubeGeometry( connectionWidth, connectionHeight, 4.5);
    const middlePart = new THREE.Mesh(middlePartGeo, connectionMaterial );
    middlePart.position.z = 1.1 
    middlePart.castShadow = true;
    rotationGroup2.add(middlePart)

    const horizontalArmGeo = new THREE.CubeGeometry( armLenght, 1, 1);
    const horizontalArm = new THREE.Mesh( horizontalArmGeo, sidesMaterial );
    horizontalArm.position.z = 2.2
    horizontalArm.castShadow = true;
    armGroup.add(horizontalArm);
    
    const gripB =  grip()
    gripB.position.z = 2.95
    gripB.position.y = 0.5
    gripB.position.x = armLenght/2+0.2 
    gripB.castShadow = true;
    armGroup.add(gripB);


    // const gripBaseGeo = new THREE.CubeGeometry( 1, 2, 4);
    // const gripBase = new THREE.Mesh( gripBaseGeo, sidesMaterial );
    // gripBase.position.z = 2.2
    // gripBase.position.x = armLenght/2+0.5 
    // gripBase.castShadow = true;
    // armGroup.add(gripBase);

    // const leftGripBase = new THREE.CubeGeometry( 3, 1.5, 0.5);
    // const leftGrip = new THREE.Mesh( leftGripBase, sidesMaterial );
    // leftGrip.position.z = 2.2-1.5
    // leftGrip.position.x = armLenght/2+2.5
    // leftGrip.castShadow = true;
    // armGroup.add(leftGrip);

    // const rightGripBase = new THREE.CubeGeometry( 3, 1.5, 0.5);
    // const rightGrip = new THREE.Mesh( rightGripBase, sidesMaterial );
    // rightGrip.position.z = 2.2+1.5
    // rightGrip.position.x = armLenght/2+2.5
    // rightGrip.castShadow = true;
    // armGroup.add(rightGrip);

    rotationGroup2.add(armGroup)
    rotationGroup1.add(rotationGroup2)
    scene.add(rotationGroup1)

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    document.querySelector("#WebGL-output").append(renderer.domElement);

    animate()

    function animate() {
        rotationGroup1.rotation.y = rotationController.value;
        rotationGroup2.position.y = upDownController.value;
        armGroup.position.x = sidesController.value;
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

function grip() {

    const width = 3;
    const length = 1.5;

    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length/8,   width)
    shape.lineTo( length/8,   width/4)
    shape.lineTo( length-length/8, width/4)
    shape.lineTo( length-length/8, width);
    shape.lineTo( length, width);
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );


    const extrudeSettings = {
    	steps: 2,
    	depth: 1,
    	bevelEnabled: true,
    	bevelThickness: 0.1,
    	bevelSize: 0.2,
    	bevelSegments: 2    
    };

    const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    const material = new THREE.MeshLambertMaterial( { color: 0x0fff00 } );
    const mesh = new THREE.Mesh( geometry, material ) ;
    mesh.rotation.x = Math.PI/2
    mesh.rotation.z = -Math.PI/2
    return mesh   
}