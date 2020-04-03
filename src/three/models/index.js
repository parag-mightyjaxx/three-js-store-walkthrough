import * as THREE from 'three/build/three.module';
 
let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
let material = new THREE.MeshNormalMaterial();
let cube = new THREE.Mesh( geometry, material );

export {
  cube
};