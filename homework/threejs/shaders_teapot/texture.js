import * as dat from '../libs/dat.gui.module.js';

const start = Date.now();
const fov = 30;
const w_width = window.innerWidth*0.8
const w_height = window.innerHeight*0.8

window.addEventListener( 'load', function() {

const container = document.getElementById( "container" );
 
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 
    fov, 
    w_width /w_height, 
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
// let  texture = new THREE.TextureLoader().load( "tiling.jpg" );
// const geo2 = new THREE.PlaneGeometry(30, 30, 32, 32, 32);  
// const mesh2 = new THREE.Mesh(geo, material); 
// mesh2.position.x = 40 
// scene.add( mesh2 );


// MENU    
const control = new function() {
    this.scale = 1.0;
    this.edge = 0.0;
}
const gui = new dat.GUI();
gui.add(control, 'scale', 1.0, 10.0);    
gui.add(control, 'edge', 0.0, 10.0);    

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w_width, w_height );
 
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