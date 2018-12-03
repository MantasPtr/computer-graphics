
const baseHeight = 2
const armHeight = 10
const connectionHeight = 3
const connectionWidth = 3
const horizontalArmSafe = 0.5
const armLenght = 15

export function initPlane() {

    const planeShape = new THREE.Shape();
    planeShape.moveTo(15, 20);
    planeShape.bezierCurveTo(15, 20, 0, 15, -15, 20);
    planeShape.bezierCurveTo(-15, 20, -20, 20, -20, 15);
    planeShape.bezierCurveTo(-20, 15, -15, 0, -20, -15);
    planeShape.bezierCurveTo(-20, -15, -20, -20, -15, -20);
    planeShape.bezierCurveTo(-15, -20, 0, -15, 15, -20);
    planeShape.bezierCurveTo(15, -20, 20, -20, 20, -15);
    planeShape.bezierCurveTo(20, -15, 15, 0, 20, 15);
    planeShape.bezierCurveTo(20, 15, 20, 20, 15, 20);

    const planeGeometry = new THREE.ShapeGeometry(planeShape);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    //const planeGeometry = new THREE.PlaneGeometry(60,40,0);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    return plane
}

export function initRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    return renderer;
}

export function initRobot(scene) {

    const rotationGroup = new THREE.Group();
    const upDownGroup = new THREE.Group();
    const armGroup = new THREE.Group();

    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const upDownMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const connectionMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const sidesMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });// wireframe: true} );

    const baseGeometry = new THREE.CylinderGeometry(2, 4, baseHeight, 10)
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = baseHeight / 2;
    base.castShadow = true;
    scene.add(base);

    const verticalArmGeo = new THREE.CubeGeometry(2, armHeight, 2);
    const verticalArm = new THREE.Mesh(verticalArmGeo, upDownMaterial);
    verticalArm.position.y = baseHeight + armHeight / 2;
    verticalArm.castShadow = true;
    rotationGroup.add(verticalArm);

    const middlePartGeo = new THREE.CubeGeometry(connectionWidth, connectionHeight, 4.5);
    const middlePart = new THREE.Mesh(middlePartGeo, connectionMaterial);
    middlePart.position.z = 1.1
    middlePart.castShadow = true;
    upDownGroup.add(middlePart)

    const horizontalArmGeo = new THREE.CubeGeometry(armLenght, 1.5, 2);
    const horizontalArm = new THREE.Mesh(horizontalArmGeo, sidesMaterial);
    horizontalArm.position.z = 2.2
    horizontalArm.castShadow = true;
    armGroup.add(horizontalArm);

    const [gripB, gripLength, gripWidth] = grip()
    gripB.position.z = 2.2 + gripWidth / 2
    gripB.position.y = 0.75
    gripB.position.x = armLenght / 2 + 0.2
    gripB.castShadow = true;
    armGroup.add(gripB);

    const keg = newKeg();
    keg.position.z = 2.2
    keg.position.y = -0.3
    keg.position.x = armLenght / 2+4
    armGroup.add(keg);

    const box = newBox();
    box.position.z = 2.2
    box.position.y = 1
    box.position.x = armLenght / 2+3.5
    box.rotation.y = 0
    armGroup.add(box);



    upDownGroup.add(armGroup)
    upDownGroup.position.y = baseHeight + horizontalArmSafe + connectionWidth / 2
    rotationGroup.add(upDownGroup)
    scene.add(rotationGroup)
    return [rotationGroup, upDownGroup, armGroup, keg, box]
}


function grip() {

    const length = 5;
    const width = 5;

    const shape = new THREE.Shape();
    shape.moveTo(width/4, 0);
    shape.moveTo(0, length/8);
    shape.lineTo(0, length);
    shape.lineTo(width / 8, length)
    shape.lineTo(width / 8, length / 4)
    shape.lineTo(width - width / 8, length / 4)
    shape.lineTo(width - width / 8, length);
    shape.lineTo(width, length);
    shape.lineTo(width, length/8);
    shape.lineTo(width-width/4, 0);
    shape.lineTo(width/4, 0);


    const extrudeSettings = {
        steps: 2,
        depth: 1.5,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.2,
        bevelSegments: 2
    };

    const geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    const material = new THREE.MeshLambertMaterial({ color: 0x0fff00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2
    mesh.rotation.z = -Math.PI / 2
    return [mesh, length, width]
}

export function addLight(THREE, scene) {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 50, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0x777777);
    spotLight2.position.set(40, 50, 10);
    spotLight2.castShadow = false;
    scene.add(spotLight2);
}

export function addKegs(scene) {
    const kegHeight = 3.7;
    const topKeg = newKeg();
    topKeg.position.x = 13.576;
    topKeg.position.y = kegHeight;
    topKeg.position.z = -10.465;
    scene.add(topKeg);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0xff2222 });
    const kegBaseGeometry = new THREE.CylinderGeometry(1.6, 2, kegHeight, 10);
    const topBase = new THREE.Mesh(kegBaseGeometry, baseMaterial);
    topBase.position.y = kegHeight / 2;
    topBase.castShadow = true;
    topBase.position.x = 13.576;
    topBase.position.z = -10.465;
    scene.add(topBase);
    const bottomBase = new THREE.Mesh(kegBaseGeometry, baseMaterial);
    bottomBase.position.y = kegHeight / 2;
    bottomBase.castShadow = true;
    bottomBase.position.x = -13.576;
    bottomBase.position.z = 10.465;
    scene.add(bottomBase);
    const bottomKeg = newKeg();
    bottomKeg.position.x = -13.576;
    bottomKeg.position.y = kegHeight;
    bottomKeg.position.z = 10.465;
    scene.add(bottomKeg);
    return { topKeg, bottomKeg };
}

function newKeg() {
    const points = [];
    const pointsC = 12;
    points.push( new THREE.Vector2(0,0))
    for ( var i = 0; i <= pointsC; i ++ ) {
    	points.push( new THREE.Vector2(2-0.5*Math.abs(i-pointsC/2)*(2/pointsC), i /3) );
    }
    points.push( new THREE.Vector2(0,pointsC/3))
    const geometry = new THREE.LatheGeometry( points );
    const material = new THREE.MeshLambertMaterial( { color: 0xc45f25 } );
    const vaseMesh = new THREE.Mesh( geometry, material );
    vaseMesh.castShadow = true
    return vaseMesh
}

export function addBoxes(scene){
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0xff2222 });
    const leftBox = newBox()
    const boxBaseGeometry = new THREE.CubeGeometry(7, 3.5, 4); 
    const leftBase = new THREE.Mesh(boxBaseGeometry, baseMaterial);
    leftBase.rotation.y = Math.PI /4
    leftBase.position.y = 3.5 / 2;
    leftBase.castShadow = true;
    leftBase.position.x = -10.112;
    leftBase.position.z = -13.223;
    scene.add(leftBase)

    leftBox.position.x = -10.112;
    leftBox.position.z = -13.223;
    leftBox.position.y = 5
    scene.add(leftBox)
    
    const rightBase = new THREE.Mesh(boxBaseGeometry, baseMaterial);
    rightBase.rotation.y = Math.PI /4
    rightBase.position.y = 3.5 / 2;
    rightBase.castShadow = true;
    rightBase.position.x = 10.112;
    rightBase.position.z = 13.223;
    scene.add(rightBase)

    
    const rightBox = newBox()
    rightBox.position.z = 13.223;
    rightBox.position.x = 10.112;
    rightBox.position.y = 5
    scene.add(rightBox)
    
    return {leftBox, rightBox};
}

function newBox() {
    const material = new THREE.MeshLambertMaterial( { color: 0xc45f25 } );
    const cubeGeo = new THREE.CubeGeometry(3.3, 4 , 3.3);
    const cube = new THREE.Mesh(cubeGeo, material);
    cube.rotation.y = Math.PI/4
    cube.castShadow = true;
    return cube;
}

