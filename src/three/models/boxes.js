import * as THREE from 'three/build/three.module';

export var boxes = [];

var boxGeometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices

var position = boxGeometry.attributes.position;
// colors = [];

// for ( var i = 0, l = position.count; i < l; i ++ ) {
  
//   color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
//   colors.push( color.r, color.g, color.b );
  
// }

// boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

for ( var i = 0; i < 500; i ++ ) {
  
  var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
  boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
  
  var box = new THREE.Mesh( 
    boxGeometry, 
    new THREE.MeshBasicMaterial({ color: 0x466230 }) 
  );
  box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
  box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
  box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
  
  // scene.add( box );
  boxes.push( box );
  
}
