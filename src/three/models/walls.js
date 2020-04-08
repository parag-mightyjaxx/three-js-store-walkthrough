import * as THREE from 'three/build/three.module';

export var walls = [];

var boxGeometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices

var floor = new THREE.Mesh( 
  new THREE.BoxBufferGeometry(98,1,110), 
  new THREE.MeshBasicMaterial({ color: 0x555555 }) 
);
floor.receiveShadow = true;
walls.push( floor );

var exteriorWallLeft = new THREE.Mesh( 
  new THREE.BoxBufferGeometry(1,50,110), 
  new THREE.MeshBasicMaterial({ color: 0x333333 }) 
);
exteriorWallLeft.castShadow = true;
exteriorWallLeft.position.set(-49,25,0);
walls.push( exteriorWallLeft );

var wall2 = new THREE.Mesh( 
  new THREE.BoxBufferGeometry(100,50,1), 
  new THREE.MeshBasicMaterial({ color: 0x333333 }) 
);
wall2.castShadow = true;
wall2.position.set(0,25,50);
walls.push( wall2 );

var wall3 = new THREE.Mesh( 
  new THREE.BoxBufferGeometry(1,50,100), 
  new THREE.MeshBasicMaterial({ color: 0x333333 }) 
);
wall3.castShadow = true;
wall3.position.set(-50,25,0);
walls.push( wall3 );

var wall4 = new THREE.Mesh( 
  new THREE.BoxBufferGeometry(1,50,100), 
  new THREE.MeshBasicMaterial({ color: 0x333333 }) 
);
wall4.castShadow = true;
wall4.position.set(50,25,0);
walls.push( wall4 );
