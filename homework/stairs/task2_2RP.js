

window.onload = init

const logs = (a) => {console.log(a); return a;}

function init() {
    const scene = new THREE.Scene();
    // create a camera, which defines where we're looking at.
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const stats = new Stats();

    initControls(camera, render)
    // create a render and set the size
    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    
    const plane = initPlane();
    scene.add(plane);
    
    const rotationGroup = new THREE.Group();
    
    const basicMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    const baseHeight = 2
    const armHeight = 10
    const connectionHeight = 2.5
    const horizontalArmSafe = 0.5 
    const armLenght = 10
    
    const baseGeometry = new THREE.CylinderGeometry(2,4,baseHeight,10)
    const base = new THREE.Mesh( baseGeometry, basicMaterial );
    base.position.y = baseHeight/2;
    base.castShadow = true; 
    scene.add(base);
    
    const verticalArmGeo = new THREE.CubeGeometry( 2, armHeight, 2);
    const verticalArm = new THREE.Mesh( verticalArmGeo, basicMaterial );
    verticalArm.position.y = baseHeight+armHeight/2;
    verticalArm.castShadow = true;
    scene.add(verticalArm);
    
    const middlePartGeo = new THREE.CubeGeometry( 2.5, connectionHeight, 4.5);
    const middlePart = new THREE.Mesh( middlePartGeo, basicMaterial );
    middlePart.position.y = baseHeight+horizontalArmSafe+connectionHeight/2
    middlePart.position.z = 1.1 
    middlePart.castShadow = true;
    scene.add(middlePart)

    const horizontalArmGeo = new THREE.CubeGeometry( 10, 2, 2);
    const horizontalArm = new THREE.Mesh( horizontalArmGeo, basicMaterial );
    horizontalArm.position.y = 10;
    horizontalArm.position.z = 2.2
    
    horizontalArm.castShadow = true;
    scene.add(horizontalArm);



    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add spotlight for the shadows
    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add( spotLight );

    // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);

    // call the render function
    animate()


    function animate() {
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
    controls = new THREE.TrackballControls( camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', listening_function );
   
}