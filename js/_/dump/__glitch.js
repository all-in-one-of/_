// thanks to:
// http://threejs.org/
// http://mrdoob.github.io/three.js/examples/webgl_interactive_cubes.html
// checkout http://threejs.org/examples/webgl_modifier_subdivision.html

var camera, controls, scene, renderer, raycaster;
//var hexagons;
var hexagon;

var orgin = new THREE.Vector2();

var hexScaleMin = 0.5;
var hexScaleMax = 1.0;
var hexScaleDirectionTarget = 0;
var hexScaleForce = 0;
var hexScaleSpeed = 0;
var scaleStopPrecition = 0.001;
var mouse = null, INTERSECTED;
var distDivPow = 27;


document.addEventListener( 'mousemove', onDocumentMouseMove, false );

raycaster = new THREE.Raycaster();


scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 72, window.innerWidth / window.innerHeight, 1, 27 );


renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//// noise texture
var noiseSize = 32;
var size = noiseSize * noiseSize;
var data = new Uint8Array( 4 * size );
for ( var i = 0; i < size * 4; i += 4 ) {
	r = Math.random() * 255 | 0
    data[ i ] = r;
    data[ i+1 ] = r;
    data[ i+2 ] = r;
    data[ i+3 ] = 1;
}
var dt = new THREE.DataTexture( data, noiseSize, noiseSize, THREE.RGBAFormat );
dt.wrapS = THREE.RepeatWrapping;
dt.wrapT = THREE.RepeatWrapping;
dt.needsUpdate = true;


//// hex mesh
// geo
var radius = 1;
var segments = 6;
var hexagonGeometry = new THREE.CircleGeometry( radius, segments );		
// mat
var material = new THREE.MeshBasicMaterial( { map: dt, color: 0xffffff } );
// mesh
hexagon = new THREE.Mesh( hexagonGeometry, material );
// scale
hexagon.scale.x = hexScaleMax;
hexagon.scale.y = hexScaleMax;
// rotation
//var endQuaternion = new THREE.Quaternion().set( 0, 0, 1, 1 ).normalize();
//hexagon.quaternion.slerp( endQuaternion, 1 );
//THREE.Quaternion.slerp( startQuaternion, endQuaternion, hexagon, t );
// add
scene.add( hexagon );

//cam
camera.position.z = 2.7;


function onDocumentMouseMove( e ) {

	e.preventDefault();
	if (mouse == null) {
		mouse = new THREE.Vector2()
	}
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener('mousewheel', onScroll);
function onScroll(e) {  
	orgin.x += e.deltaX;
	orgin.y += e.deltaY;
}

// $(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event, delta) {
//     console.log('mousewheel');
// });


var render = function () {
 	requestAnimationFrame( render );
	
	

	// if (mouse) {
	// 	raycaster.setFromCamera( mouse, camera );
	// 	var intersects = raycaster.intersectObjects( scene.children );
	// 	if ( intersects.length > 0 ) {
	// 		if ( INTERSECTED != intersects[ 0 ].object ) {
	// 			INTERSECTED = intersects[ 0 ].object;
	// 			if (INTERSECTED == hexagon) {
	// 				// hex hover start
	// 				hexScaleDirectionTarget = 1;
	// 				hexScaleForce = 1;
	// 				hexScaleSpeed = 0;
	// 			}
	// 		}
	// 	} else {
	// 		if (INTERSECTED) {
	// 			if (INTERSECTED == hexagon) {
	// 				// hex hover end
	// 				// //hexScaleMin = 1;
	// 				// hexScaleDirectionTarget = -1;
	// 				// hexScaleForce = -1;
	// 				// hexScaleSpeed = 0;
	// 			}
	// 			INTERSECTED = null;
	// 		}
	// 	}	
	// }

	// if (hexScaleDirectionTarget != 0) {
	// 	// calc dist
	// 	hexScaleSpeed += 0.1;
	// 	var prev = hexagon.scale.x;
	// 	var target = (hexScaleDirectionTarget == 1 ? hexScaleMax : hexScaleMin);
	// 	var dist = target - prev;
	// 	hexagon.scale.x += dist * Math.pow(hexScaleSpeed, 2) / distDivPow;
	// 	hexagon.scale.y += dist * Math.pow(hexScaleSpeed, 2) / distDivPow;

	// 	// calc stop
	// 	if (hexScaleDirectionTarget == 1 && hexagon.scale.x > hexScaleMax - scaleStopPrecition) {
	// 		hexagon.scale.x = hexScaleMax;
	// 		hexagon.scale.y = hexScaleMax;
	// 		hexScaleDirectionTarget = 0;
	// 		hexScaleSpeed = 0;
	// 	}
	// 	if (hexScaleDirectionTarget == -1 && hexagon.scale.x < hexScaleMin + scaleStopPrecition) {
	// 		hexagon.scale.x = hexScaleMin;
	// 		hexagon.scale.y = hexScaleMin;
	// 		hexScaleDirectionTarget = 0;
	// 		hexScaleSpeed = 0;
	// 	}
	// }

	var xx = orgin.x / 1100;
	var yy = orgin.y / 1100 * -1;
	var diff_xx = xx - dt.offset.x;
	var diff_yy = yy - dt.offset.y;
	dt.offset.x = diff_xx;
	dt.offset.y = diff_yy;
	
	hexagon.position.x = 0//orgin.x / 500 * -1;
	hexagon.position.y = 0//orgin.y / 500;
	

	renderer.render(scene, camera);
};

render();



function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();

	render();

}
