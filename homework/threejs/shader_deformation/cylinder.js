import * as dat from '../libs/dat.gui.module.js';

let scene, camera, controls, renderer, material, control;
const fov = 30;


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
     
    material = new THREE.ShaderMaterial( {
        uniforms: { 
			uDirX: {type: 'f', value:  0.0}, 
			uDirY: {type: 'f', value:  0.0}, 
            uShininess: {type: 'f', value:  30.0},
            uAngleRad: {type: 'f', value: toRad(30)},
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
        this.angleX = 30.0;
    }
	const gui = new dat.GUI();
    gui.add(control, 'dirX', -1.0, 1.0);    
    gui.add(control, 'dirY', -1.0, 1.0);    
    gui.add(control, 'shin', 1.0, 60.0);
    gui.add(control, 'angleX', -90.0, 90.0);    
    render();
    
}

function render() {
    material.uniforms.uDirX.value = control.dirX; 
    material.uniforms.uDirY.value = control.dirY; 
    material.uniforms.uShininess.value = control.shin;
    material.uniforms.uAngleRad.value = toRad(control.angleX);
    // render
    renderer.render( scene, camera );
    requestAnimationFrame( render );
    controls.update(); 
   }


function toRad(v){
    return v/180*(Math.PI)
}

function loadShaders() {
    const vertexShaderFile = "./vertex_shader.c";
    const fragmentShaderFile = "./fragment_shader.c";
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