import * as THREE from 'three/build/three.module';

import yonder_ft from '../textures/yonder_ft.jpg';
import yonder_bk from '../textures/yonder_bk.jpg';
import yonder_up from '../textures/yonder_up.jpg';
import yonder_dn from '../textures/yonder_dn.jpg';
import yonder_rt from '../textures/yonder_rt.jpg';
import yonder_lf from '../textures/yonder_lf.jpg';

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load(yonder_ft);
let texture_bk = new THREE.TextureLoader().load(yonder_bk);
let texture_up = new THREE.TextureLoader().load(yonder_up);
let texture_dn = new THREE.TextureLoader().load(yonder_dn);
let texture_rt = new THREE.TextureLoader().load(yonder_rt);
let texture_lf = new THREE.TextureLoader().load(yonder_lf);
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 1200, 1200, 1200);
export let skybox = new THREE.Mesh( skyboxGeo, materialArray );
