import * as dat from '../libs/dat.gui.module.js';

let scene, camera, controls, renderer, material, control;
const fov = 30;
const planeHolder = new THREE.Group();

// window.addEventListener( 'load', () => onLoad(
//     document.getElementById( 'vertexShader' ).textContent,
//     document.getElementById( 'fragmentShader' ).textContent
//     ));



window.addEventListener( 'load', () => loadShaders());



function onLoad(vertexShader, fragmentShader) {
    const container = document.getElementById( "container" );
  
    scene = new THREE.Scene();
   
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 200;
    camera.target = new THREE.Vector3( 0, 0, 0 );
   
    scene.add( camera );
    
    
    const planeGeometry = new THREE.PlaneGeometry( 5, 20, 32 );
    const planeMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotation.y = Math.PI/2
    planeHolder.position.x = 20;
    planeHolder.add(plane);
    planeHolder.add(new THREE.AxesHelper( 20 ))
    scene.add(planeHolder);

    material = new THREE.ShaderMaterial( {
        uniforms: { 
			uDirX: {type: 'f', value:  0.0}, 
			uDirY: {type: 'f', value:  0.0}, 
            uShininess: {type: 'f', value:  30.0},
            uAngleRad: {type: 'f', value: toRad(30)},
            uPointX: {type: 'f', value: 20.0},
            uPointY: {type: 'f', value: 0.0},
            uPointZ: {type: 'f', value: 0.0},

        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,  
    } );

    const geo = new THREE.CylinderBufferGeometry(5,10,20,32);
    const mesh = new THREE.Mesh(geo, material); 
    scene.add( mesh );

   
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    container.appendChild( renderer.domElement );
    controls = new THREE.TrackballControls( camera, renderer.domElement ); 

    control = new function() {
        this.dirX = 0.5;
        this.dirY = 0.0;
        this.shin = 30.0;
        this.angleX = 70.0;
        this.x = 20.0;
        this.y = 0.0;
        this.z = 0.0;
    }
	const gui = new dat.GUI();
    gui.add(control, 'dirX', -1.0, 1.0);    
    gui.add(control, 'dirY', -1.0, 1.0);    
    gui.add(control, 'shin', 1.0, 60.0);
    gui.add(control, 'angleX', -180.0, 180.0);
    const f1 = gui.addFolder('Point');
    f1.add(control, 'x', -100.0, 100.0);    
    f1.add(control, 'y', -100.0, 100.0);
    f1.add(control, 'z', -100.0, 100.0);

    render()
}

function render() {
    material.uniforms.uDirX.value = control.dirX; 
    material.uniforms.uDirY.value = control.dirY; 
    material.uniforms.uShininess.value = control.shin;
    material.uniforms.uAngleRad.value = toRad(control.angleX);
    material.uniforms.uPointX.value = control.x 
    material.uniforms.uPointY.value = control.y 
    material.uniforms.uPointZ.value = control.z 
    planeHolder.position.x = control.x
    planeHolder.position.y = control.y
    planeHolder.position.z = control.z
    planeHolder.rotation.z = toRad(control.angleX)

    renderer.render( scene, camera );
    requestAnimationFrame( render );
    controls.update(); 
   }


//UTILS


function toRad(v){
    return v/180*(Math.PI)
}

function loadShaders() {
    const vertexShaderFile = "./vertex_shader.glsl";
    const fragmentShaderFile = "./fragment_shader.glsl";
    const errorCallback = console.error

    const loadFragmentShader = (vertexShader) => loadFile(fragmentShaderFile,
        (fragmentShader) => onLoad(vertexShader, fragmentShader) ,
        errorCallback) 

    loadFile(vertexShaderFile, loadFragmentShader, errorCallback);
}


function loadFile(url, callback, errorCallback) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(request.responseText)
            } else {
                errorCallback(url);
            }
        }
    };

    request.send(null);    
}