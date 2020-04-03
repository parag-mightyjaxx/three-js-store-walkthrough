import * as THREE from 'three/build/three.module';
import { cube } from '../models';
 
var camera, scene, renderer;


init();
animate();
 
function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;
 
    scene = new THREE.Scene();
 
    scene.add( cube );
 
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}
 
function animate() {
    requestAnimationFrame( animate );
 
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
 
    renderer.render( scene, camera );
}