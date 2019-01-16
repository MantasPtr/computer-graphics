import * as dat from '../libs/dat.gui.module.js';

const start = Date.now(),
fov = 30;

window.addEventListener( 'load', function() {

const container = document.getElementById( "container" );
 
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 
    fov, 
    window.innerWidth / window.innerHeight, 
    1, 
    10000 );
camera.position.z = 100;
camera.target = new THREE.Vector3( 0, 0, 0 );

scene.add( camera );
const material = new THREE.ShaderMaterial( {
    uniforms: { 
        uScale: {type: 'f', value: 8.0},
        uEdge: {type: 'f', value:  0.0} 
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent  
} );
 
const geo = new THREE.PlaneGeometry(30, 30, 32, 32, 32);    
const mesh = new THREE.Mesh(geo, material); 
scene.add( mesh );

// MENU    
const control = new function() {
    this.scale = 1.0;
    this.edge = 0.0;
}
const gui = new dat.GUI();
gui.add(control, 'scale', 1.0, 10.0);    
gui.add(control, 'edge', 0.0, 10.0);    

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
 
container.appendChild( renderer.domElement );
const controls = new THREE.TrackballControls( camera, renderer.domElement );     
render();

function render() {
    // Update uniform
    material.uniforms.uScale.value = control.scale; 
    material.uniforms.uEdge.value = control.edge; 
    // render
    renderer.render( scene, camera );
    requestAnimationFrame( render );
    controls.update(); 
}

} );