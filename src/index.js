import * as THREE from 'three/build/three.module';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { skybox } from './three/models/skybox';
import { cube, floor } from './three/models';
import { boxes } from './three/models/boxes';
import { walls } from './three/models/walls';

var camera, scene, renderer, controls;
var stats, xPanel, yPanel, zPanel;

var player = {
  // movement config
  canMove: true,
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  canJump: false,
}

// Objects array for collision detection
var objects = [];

var raycaster, rcLeft, rcRight, rcForward, rcBackward;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.y = 10;
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x87ceeb );
  scene.fog = new THREE.Fog( 0x87ceeb, 0, 750 );
  
  var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
  light.position.set( 0.5, 1, 0.75 );
  scene.add( light );
  
  controls = new PointerLockControls( camera, document.body );
  
  var blocker = document.getElementById( 'blocker' );
  var instructions = document.getElementById( 'instructions' );

  stats = new Stats();
  xPanel = stats.addPanel( new Stats.Panel('x', '#ff8', '#221'));
  yPanel = stats.addPanel( new Stats.Panel('y', '#f8f', '#212'));
  zPanel = stats.addPanel( new Stats.Panel('z', '#8ff', '#122'));
  document.body.appendChild( stats.dom );
  
  instructions.addEventListener( 'click', function () {
    controls.lock();
  }, false );
  
  controls.addEventListener( 'lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
  } );
  
  controls.addEventListener( 'unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
  } );
  
  scene.add( controls.getObject() );
  
  var onKeyDown = function ( event ) {
    switch ( event.keyCode ) {
      case 38: // up
      case 87: // w
      player.moveForward = true;
      break;
      
      case 37: // left
      case 65: // a
      player.moveLeft = true;
      break;
      
      case 40: // down
      case 83: // s
      player.moveBackward = true;
      break;
      
      case 39: // right
      case 68: // d
      player.moveRight = true;
      break;
      
      case 32: // space
      if ( player.canJump === true ) velocity.y += 350;
      player.canJump = false;
      break;
    }
  };
  
  var onKeyUp = function ( event ) {
    switch ( event.keyCode ) {
      case 38: // up
      case 87: // w
      player.moveForward = false;
      break;
      
      case 37: // left
      case 65: // a
      player.moveLeft = false;
      break;
      
      case 40: // down
      case 83: // s
      player.moveBackward = false;
      break;
      
      case 39: // right
      case 68: // d
      player.moveRight = false;
      break;
    }    
  };
  
  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );
  
  raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
  rcLeft = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( -1, 0, 0 ), 0, 10 );
  rcRight = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 1, 0, 0 ), 0, 10 );
  rcForward = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, -1 ), 0, 10 );
  rcBackward = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, 1 ), 0, 10 );
  
  // floor
  var floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
  floorGeometry.rotateX( - Math.PI / 2 );
  
  // vertex displacement
  var position = floorGeometry.attributes.position;

  
  // floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
  position = floorGeometry.attributes.position;
  var floor = new THREE.Mesh( 
    floorGeometry,
    new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
  );

  // Add Geometry to scene
  // scene.add( skybox );
  scene.add( floor );

  walls.map(wall => {
    scene.add(wall);
    objects.push(wall);
  });

  //
  
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = true;
  document.body.appendChild( renderer.domElement );
  
  //
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  stats.begin();
  let playerObj = controls.getObject();

  // console.log(rcForward.ray, playerObj)

  if ( controls.isLocked === true ) {   
    //Set Raycaster Positions for collision detections
    raycaster.ray.origin.copy( playerObj.position );
    rcLeft.ray.origin.copy( playerObj.position );
    rcLeft.ray.direction = new THREE.Vector3( -1, 0, 0 ).applyEuler( playerObj.rotation );

    rcRight.ray.origin.copy( playerObj.position );
    rcRight.ray.direction = new THREE.Vector3( 1, 0, 0 ).applyEuler( playerObj.rotation );

    rcForward.ray.origin.copy( playerObj.position );
    rcForward.ray.direction = new THREE.Vector3( 0, 0, -1 ).applyEuler( playerObj.rotation );

    rcBackward.ray.origin.copy( playerObj.position );
    rcBackward.ray.direction = new THREE.Vector3( 0, 0, 1 ).applyEuler( playerObj.rotation );

    raycaster.ray.origin.y -= 10;
    
    var intersections = raycaster.intersectObjects( objects );   
    var onObject = intersections.length > 0;
    
    var canMoveLeft = !(rcLeft.intersectObjects( objects ).length > 0);
    var canMoveRight = !(rcRight.intersectObjects( objects ).length > 0);
    var canMoveForward = !(rcForward.intersectObjects( objects ).length > 0);
    var canMoveBackward = !(rcBackward.intersectObjects( objects ).length > 0);

    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;


    // Enforce bounds on how far the player can go in the world
    if(playerObj.position.x > 500) {
      playerObj.position.x = 499;
    } else if(playerObj.position.x < -500) {
      playerObj.position.x = -499;
    } else if(playerObj.position.z > 500) {
      playerObj.position.z = 499;
    } else if(playerObj.position.z < -500) {
      playerObj.position.z = -499;
    } else { // allow movement  
      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      
      direction.z = Number( player.moveForward ) - Number( player.moveBackward );
      direction.x = Number( player.moveRight ) - Number( player.moveLeft );

      //Perform collision checks
      if(!canMoveLeft) { velocity.x = 0; direction.x = Number( player.moveRight ); }
      if(!canMoveRight) { velocity.x = 0; direction.x = -Number( player.moveLeft ); }
      if(!canMoveForward) { velocity.z = 0; direction.z = -Number( player.moveBackward); }
      if(!canMoveBackward) { velocity.z = 0; direction.z = Number( player.moveForward ); }

      direction.normalize(); // this ensures consistent movements in all directions
      
      if ( player.moveForward || player.moveBackward ) velocity.z -= direction.z * 400.0 * delta;
      if ( player.moveLeft || player.moveRight ) velocity.x -= direction.x * 400.0 * delta;
      
      
      
      controls.moveRight( - velocity.x * delta );
      controls.moveForward( - velocity.z * delta );  
    }

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    if ( onObject === true ) {
      velocity.y = Math.max( 0, velocity.y );
      player.canJump = true;
    }

    playerObj.position.y += ( velocity.y * delta ); // new behavior
    
    if(playerObj.position.y < 10) {
      velocity.y = 0;
      playerObj.position.y = 10;
      
      player.canJump = true;
    }

    prevTime = time;
  }
  
  renderer.render( scene, camera );

  stats.end();
  xPanel.update( camera.position.x, 100 );
  yPanel.update( camera.position.y, 100 );
  zPanel.update( camera.position.z, 100 );

  requestAnimationFrame( animate );
}
