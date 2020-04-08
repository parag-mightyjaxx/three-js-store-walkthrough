import * as THREE from 'three/build/three.module';
 
let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
let material = new THREE.MeshNormalMaterial();
let cube = new THREE.Mesh( geometry, material );

let floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10),
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
);

floor.rotation.x += Math.PI / 2;

export {
  cube,
  floor,
};