// thanks to:
// http://threejs.org/
// http://mrdoob.github.io/three.js/examples/webgl_interactive_cubes.html
// checkout http://threejs.org/examples/webgl_modifier_subdivision.html

var camera, controls, scene, renderer, raycaster;
//var hexagons;
var hexagon;

var scrollNow = 0;
var scrollLastThresh = 0;
var scrollAmp = 50;

var hexScaleMin = 0.5;
var hexScaleMax = 1.0;
var hexScaleDirectionTarget = 0;
var hexScaleForce = 0;
var hexScaleSpeed = 0;
var scaleStopPrecition = 0.001;

//var mouse = null, INTERSECTED;
//var distDivPow = 27;


raycaster = new THREE.Raycaster();


scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 72, window.innerWidth / window.innerHeight, 1, 27 );


renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


////// tex
var dt;

//// noise tex
var res = 256;
var noiseMap = new Uint8Array( 4 * res * res );
var size = res * res;
for ( var i = 0; i < size * 4; i += 4 ) {
	var ramp = i / (size * 4);
	var r = Math.random() * 2 | 0
    noiseMap[ i ] = (r * ramp) * 128;
    noiseMap[ i+1 ] = 0;
    noiseMap[ i+2 ] = 0;
    noiseMap[ i+3 ] = 255;
}
var dt = new THREE.DataTexture( noiseMap, res, res );
dt.wrapS = THREE.RepeatWrapping;
dt.wrapT = THREE.RepeatWrapping;
dt.needsUpdate = true;





makeHexMesh(dt);


//noiseTex.texture = noiseMap;

////imgUrl = "http://netdna.webdesignerdepot.com/uploads/2012/11/code.jpg";
//imgUrl = 'heemoon.jpg'

// // instantiate a loader
// var loader = new THREE.TextureLoader();


// // load a resource
// loader.load(imgUrl,
// 	function ( texture ) { 
// 		dt = texture;
// 		makeHexMesh(dt);
//     	render();
// 	},
// 	function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); },
// 	function ( xhr ) { console.log( 'img load error' ); }
//);


// imgTex = THREE.ImageUtils.loadTexture( imgUrl, undefined, function() {

//     // the rest of your code here...

//     var imgTexClone = imgTex.clone();
//     imgTexClone.needsUpdate = true;

//     makeHexMesh(imgTexClone);

// });

function makeHexMesh(tex){
	// geo
	var radius = 1;
	var segments = 6;
	var hexagonGeometry = new THREE.CircleGeometry( radius, segments );		
	// mat
	var material = new THREE.MeshBasicMaterial( { map: tex, color: 0xffffff } );
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
}


//cam
camera.position.z = 2.7;

//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// function onDocumentMouseMove( e ) {
// 	e.preventDefault();
// 	if (mouse == null) {
// 		mouse = new THREE.Vector2()
// 	}
// 	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
// }

window.addEventListener('mousewheel', onScroll);
function onScroll(e) {  
	scrollNow += e.deltaY * scrollAmp;
}

// $(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event, delta) {
//     console.log('mousewheel');
// });

function posMod(n, m) {
    return ((n % m) + m) % m;
}

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

	

	//dt.offset.y = scroll / 1000 * -1;
	

	var scrollDiff = scrollNow - scrollLastThresh;
	var scrollPart = Math.floor(scrollDiff);
	scrollLastThresh += scrollPart;
	
	

	//var slope = Math.round(scroll / 4) * -1;
	//var noiseMapNew = new Uint8Array( 4 * noiseSize * noiseSize );
	

	var map = new Uint8Array( 4 * res * res );
	for ( var i = 0; i < size * 4; i += 4 ) {
		y = ((i * 4) % size) / 4 / 4
		if (i < 10) console.log(y)
		var pixDist = res * 4 * Math.floor(-scrollPart * y / 1000000);
		map[ i ] = dt.image.data[ posMod(i + pixDist, size * 4) /*+noiseSize*4 * 20 */];
	    // noiseMapNew[ i+1 ] = dt.image.data[ i+1 +noiseSize*4 ] + 0;
	    // noiseMapNew[ i+2 ] = dt.image.data[ i+2 +noiseSize*4 ] + 0;
	    // noiseMapNew[ i+3 ] = dt.image.data[ i+3 +noiseSize*4 ] + 0;
	}
	dt.image.data = map

	// hexagon.position.x = orgin.x / 500 * -1;
	// hexagon.position.y = orgin.y / 500;
	dt.needsUpdate = true;

	scrollDiff = 

	renderer.render(scene, camera);
};



render();




// function onWindowResize() {

// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( window.innerWidth, window.innerHeight );

// 	controls.handleResize();

// 	render();

// }
