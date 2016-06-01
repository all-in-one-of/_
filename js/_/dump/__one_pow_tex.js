// canvas
// var canvas = document.getElementById("myCanvas");
// canvas.width = 1000;
// canvas.height = 750;
// canvas.style.width = "500px";
// canvas.style.height = "375px";


//context
//var context = canvas.getContext('2d');


// screen
var screen = {};
screen.width = window.innerWidth;
screen.height = window.innerHeight;
screen.diagonal = Math.sqrt((2 << screen.width) + (2 << screen.height));
screen.aspectRatio = screen.width / screen.height;
// this value changes weirdly when screen size chagnes
// var devicePixelRatio = window.devicePixelRatio;
// var backingStoreRatio = context.backingStorePixelRatio;
// console.log('devicePixelRatio', devicePixelRatio)
// console.log('backingStoreRatio', backingStoreRatio)
//ratio = devicePixelRatio / backingStoreRatio;

// renderer
var renderer = new THREE.WebGLRenderer({ /*antialias: true*/ });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//console.log(document.getElementById('canvas'))

// scene
var scene = new THREE.Scene();

// cam (53fov == 1h == 1z)
var camera = new THREE.PerspectiveCamera( 60, screen.aspectRatio, 0.1, 10 );
camera.position.z = Math.sqrt(0.75);


// scrolling
var scrollNow = 0;
var scrollLastThresh = 0;
var scrollAmp = -0.5;
window.addEventListener('mousewheel', onScroll);
function onScroll(e) {  
	scrollNow += e.deltaY * scrollAmp;

}

// [TOOLS]
function powerRes(orgRes) {
	var powerRes = 0;
	var power = 0;
	while (powerRes < orgRes) {
		powerRes = 2 << power;
		power++;
	}
	return powerRes;
}



//// map painters
function paint_pow(map){
	for ( var x = 0; x < map.res.pow; x ++ ) {
		for ( var y = 0; y < map.res.pow; y ++ ) {
			var pix = (y * map.res.pow + x) * 4;

			var rand = Math.random();
			var offset = 0.05 * 255;
			var color = Math.pow(rand, 27) * (255 - offset) + offset;

			map.arr[ pix     ] = color;
			map.arr[ pix + 1 ] = color;
			map.arr[ pix + 2 ] = color;
			map.arr[ pix + 3 ] = 255;
			
			//for ( var c = 0; c < 4; c ++ ) {

				// ramp noise
				//var ramp = y / map.res.pow;
				//map.arr[ pixChan ] = Math.random() * ramp * 255 //(random * ramp) * 255;
				
			if ((x < 10 || x > map.res.pow - 10) || (y < 10 || y > map.res.pow - 10)) {
				map.arr[ pix     ] = 255;
				map.arr[ pix + 1 ] = 0;
				map.arr[ pix + 2 ] = 0;
				map.arr[ pix + 3 ] = 255;
			}
			// if ((x < 4 || x > bars.map.res.width - 4) || (y < 4 || y > bars.map.res.height - 4)) {
			// 	bars.map.arr[ pix     ] += 100;
			// 	// bars.map.arr[ pix + 1 ] = 0;
			// 	// bars.map.arr[ pix + 2 ] = 0;
			// 	// bars.map.arr[ pix + 3 ] = 255;
			// }

			//}
		}
	}
	return map
}
function paint_a_border(map){
	for ( var x = 0; x < map.res.width; x ++ ) {
		for ( var y = 0; y < map.res.height; y ++ ) {
			var pix = (y * map.res.pow + x) * 4;

			// var rand = Math.random();
			// var offset = 0.05 * 255;
			// var color = Math.pow(rand, 27) * (255 - offset) + offset;

			// map.arr[ pix     ] = color;
			// map.arr[ pix + 1 ] = color;
			// map.arr[ pix + 2 ] = color;
			// map.arr[ pix + 3 ] = 255;
			
			// //for ( var c = 0; c < 4; c ++ ) {

			// 	// ramp noise
			// 	//var ramp = y / map.res.pow;
			// 	//map.arr[ pixChan ] = Math.random() * ramp * 255 //(random * ramp) * 255;
				
			// if ((x < 4 || x > map.res.pow - 4) || (y < 4 || y > map.res.pow - 4)) {
			// 	map.arr[ pix     ] = 255;
			// 	map.arr[ pix + 1 ] = 0;
			// 	map.arr[ pix + 2 ] = 0;
			// 	map.arr[ pix + 3 ] = 255;
			// }
			if ((x < 10 || x > map.res.width - 10) || (y < 10 || y > map.res.height - 10)) {
				map.arr[ pix + 1] += 200;
				// map.arr[ pix + 1 ] = 0;
				// map.arr[ pix + 2 ] = 0;
				// map.arr[ pix + 3 ] = 255;
			}

			//}
		}
	}
	return map
}

//// mesh: bars
var bars = {}
// thickness
bars.thickness = Math.pow(2 / 3, 3)
// map
bars.map = {}
bars.map.res = {}
bars.map.res.width = Math.round(screen.width * bars.thickness)
bars.map.res.height = screen.height
bars.map.res.pow = powerRes(Math.max(bars.map.res.width, bars.map.res.height))
bars.map.arr = new Uint8Array(bars.map.res.pow * bars.map.res.pow * 4)
paint_a_border(bars.map)
bars.map.tex = new THREE.DataTexture(bars.map.arr, bars.map.res.pow, bars.map.res.pow)
bars.map.tex.wrapS = THREE.ClampToEdgeWrapping
bars.map.tex.wrapT = THREE.ClampToEdgeWrapping
bars.map.tex.needsUpdate = true
bars.map.tex.mapping = 300
// a
bars.a = {}
bars.a.geo = new THREE.PlaneGeometry( /*thickness * (screen.diagonal / screen.width)*/ /*screen.width / screen.height * */ 0.5, 1 ) // << dup //screen.diagonal / screen.width
bars.a.mat = new THREE.MeshBasicMaterial({ 
		map: bars.map.tex,
		color: 0xffffff,
		//wireframe: true,
})
bars.a.mesh = new THREE.Mesh(bars.a.geo, bars.a.mat)

//// scene
scene.add( bars.a.mesh );

//var mouse = null, INTERSECTED;



//var raycaster = new THREE.Raycaster();





//var hexagon;
// //// hex
// var hexScaleMin = 0.5;
// var hexScaleMax = 1.0;
// var hexScaleDirectionTarget = 0;
// var hexScaleForce = 0;
// var hexScaleSpeed = 0;
// var scaleStopPrecition = 0.001;

//makeHexMesh(dt);


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

// function makeHexMesh(tex){
// 	// geo
// 	var radius = 1;
// 	var segments = 6;
// 	var hexagonGeometry = new THREE.CircleGeometry( radius, segments );		
// 	// mat
// 	var material = new THREE.MeshBasicMaterial( { map: tex, color: 0xffffff } );
// 	// mesh
// 	hexagon = new THREE.Mesh( hexagonGeometry, material );
// 	// scale
// 	hexagon.scale.x = hexScaleMax;
// 	hexagon.scale.y = hexScaleMax;
// 	// rotation
// 	//var endQuaternion = new THREE.Quaternion().set( 0, 0, 1, 1 ).normalize();
// 	//hexagon.quaternion.slerp( endQuaternion, 1 );
// 	//THREE.Quaternion.slerp( startQuaternion, endQuaternion, hexagon, t );
// 	// add
// 	scene.add( hexagon );
// }



//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// function onDocumentMouseMove( e ) {
// 	e.preventDefault();
// 	if (mouse == null) {
// 		mouse = new THREE.Vector2()
// 	}
// 	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
// }


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

	


	// var scrollDiff = scrollNow - scrollLastThresh;
	// var scrollPart = Math.floor(scrollDiff);
	// scrollLastThresh += scrollPart;
	
	

	// //var slope = Math.round(scroll / 4) * -1;
	// //var noiseMapNew = new Uint8Array( 4 * noiseSize * noiseSize );
	

	// var map = new Uint8Array( 4 * res * res );
	// for ( var i = 0; i < size * 4; i += 4 ) {
	// 	var pixDist = res * 4 * scrollPart;
	// 	map[ i ] = bars.map.tex.image.data[ posMod(i + pixDist, size * 4) +noiseSize*4 * 20 ];
	//     // noiseMapNew[ i+1 ] = bars.map.tex.image.data[ i+1 +noiseSize*4 ] + 0;
	//     // noiseMapNew[ i+2 ] = bars.map.tex.image.data[ i+2 +noiseSize*4 ] + 0;
	//     // noiseMapNew[ i+3 ] = bars.map.tex.image.data[ i+3 +noiseSize*4 ] + 0;
	// }
	// bars.map.tex.image.data = map

	// // hexagon.position.x = orgin.x / 500 * -1;
	// // hexagon.position.y = orgin.y / 500;
	// bars.map.tex.needsUpdate = true;

	// //scrollDiff = 

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




// by _

// thanks to:
// http://threejs.org/
// http://mrdoob.github.io/three.js/examples/webgl_interactive_cubes.html
// checkout http://threejs.org/examples/webgl_modifier_subdivision.html
