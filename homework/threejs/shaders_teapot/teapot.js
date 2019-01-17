import * as dat from '../libs/dat.gui.module.js';

let scene, camera, controls, renderer, material, control;
const fov = 30;

function onLoad() {
    const container = document.getElementById( "container" );
  
    scene = new THREE.Scene();
   
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 200;
    camera.target = new THREE.Vector3( 0, 0, 0 );
   
    scene.add( camera );
     
    material = new THREE.ShaderMaterial( {
        uniforms: { 
            uScale: {type: 'f', value: 3.},
            uEdge: {type: 'f', value:  0.0},
        },
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent  
    } );
     
    const teapotSize = 15; 
    const segments = 10;
    const geo = new THREE.TeapotGeometry(teapotSize, segments, true, true, true, true, true);
    //size, segments, bottom, lid, body, fitLid, blinn
    const mesh = new THREE.Mesh(geo, material); 
    scene.add( mesh );
   
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
     
    container.appendChild( renderer.domElement );
    controls = new THREE.TrackballControls( camera, renderer.domElement );     
    
    control = new function() {
        this.scale = 3.;
        this.edge = 0.0;
    }
    const gui = new dat.GUI();
    gui.add(control, 'scale', 1.0, 10.0);    
    gui.add(control, 'edge', 0.0, 10.0);
    render();
    
}

function render() {
    material.uniforms.uScale.value = control.scale; 
    material.uniforms.uEdge.value = control.edge; 
    // render
    renderer.render( scene, camera );
    requestAnimationFrame( render );
    controls.update(); 
   }

window.addEventListener( 'load', onLoad);


