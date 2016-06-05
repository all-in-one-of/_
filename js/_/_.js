var area = {}
area.window_width = window.innerWidth
area.window_height = window.innerHeight
area.retina_amp = window.devicePixelRatio
area.width = area.window_width * area.retina_amp
area.height = area.window_height * area.retina_amp
// area.diagonal = Math.sqrt((2 << area.width) + (2 << area.height))
area.aspect_ratio = area.width / area.height

// renderer
var renderer = new THREE.WebGLRenderer({ /*antialias: true*/ });
renderer.setSize(area.window_width, area.window_height);
renderer.setViewport( 0, 0, area.width, area.height );
canvas = renderer.domElement
canvas.width = area.width;
canvas.height = area.height;

document.body.appendChild( canvas );


// scene
var scene = new THREE.Scene();

// cam (53fov == 1h == 1z)
var camera = new THREE.PerspectiveCamera( 60, area.aspect_ratio, 0.1, 10 );
camera.position.z = Math.sqrt(0.75);


// scrolling
var scrollNow = 0;
var scrollLastThresh = 0;
var scrollAmp = -1;
window.addEventListener('mousewheel', onScroll);
function onScroll(e) {  
    scrollNow += e.deltaY * scrollAmp;
}


//// mesh: bars
var bars = {}
// thickness
bars.thickness = Math.pow(2 / 3, 3)
// map
bars.map = {}
bars.map.res = {}
bars.map.res.width = Math.round(canvas.width * bars.thickness)
bars.map.res.height = canvas.height
bars.map.arr = new Uint8Array(bars.map.res.width * bars.map.res.height * 4)
bars.map.tex = new THREE.DataTexture(bars.map.arr, bars.map.res.width, bars.map.res.height)
// bars.map.tex.wrapS = THREE.RepeatWrapping
// bars.map.tex.wrapT = THREE.RepeatWrapping
bars.map.tex.wrapS = THREE.ClampToEdgeWrapping
bars.map.tex.wrapT = THREE.ClampToEdgeWrapping
bars.map.tex.needsUpdate = true
bars.map.tex.mapping = 300
// a
bars.a = {}
// bars.a.geo = new THREE.PlaneGeometry( area.aspect_ratio * bars.thickness, 1 )
bars.a.geo = new THREE.PlaneGeometry( (area.width / area.height) * bars.thickness, 1 ) // << dup //screen.diagonal / screen.width
bars.a.mat = new THREE.MeshBasicMaterial({ 
        map: bars.map.tex,
        color: 0xffffff,
        //wireframe: true,
})
bars.a.mesh = new THREE.Mesh(bars.a.geo, bars.a.mat)
// bars.a.mesh.translateY(0.1)

//// scene
scene.add( bars.a.mesh );

//var mouse = null, INTERSECTED;



//var raycaster = new THREE.Raycaster();


// mouse pos
var mouse_x;
var mouse_y;
var mouse_norm_x;
var mouse_norm_y;
document.onmousemove = function(e){
    mouse_x = e.pageX;
    mouse_y = e.pageY;
    mouse_norm_x = mouse_x - (area.width - bars.map.res.width) / 2
    mouse_norm_y = mouse_y * -1 + bars.map.res.height
}



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
//  function ( texture ) { 
//      dt = texture;
//      makeHexMesh(dt);
//      render();
//  },
//  function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); },
//  function ( xhr ) { console.log( 'img load error' ); }
//);


// imgTex = THREE.ImageUtils.loadTexture( imgUrl, undefined, function() {

//     // the rest of your code here...

//     var imgTexClone = imgTex.clone();
//     imgTexClone.needsUpdate = true;

//     makeHexMesh(imgTexClone);

// });

// function makeHexMesh(tex){
//  // geo
//  var radius = 1;
//  var segments = 6;
//  var hexagonGeometry = new THREE.CircleGeometry( radius, segments );     
//  // mat
//  var material = new THREE.MeshBasicMaterial( { map: tex, color: 0xffffff } );
//  // mesh
//  hexagon = new THREE.Mesh( hexagonGeometry, material );
//  // scale
//  hexagon.scale.x = hexScaleMax;
//  hexagon.scale.y = hexScaleMax;
//  // rotation
//  //var endQuaternion = new THREE.Quaternion().set( 0, 0, 1, 1 ).normalize();
//  //hexagon.quaternion.slerp( endQuaternion, 1 );
//  //THREE.Quaternion.slerp( startQuaternion, endQuaternion, hexagon, t );
//  // add
//  scene.add( hexagon );
// }



//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// function onDocumentMouseMove( e ) {
//  e.preventDefault();
//  if (mouse == null) {
//      mouse = new THREE.Vector2()
//  }
//  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
//  mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
// }


// $(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event, delta) {
//     console.log('mousewheel');
// });


chan_paint_noise(bars.map)


function posMod(n, m) {
    return ((n % m) + m) % m;
}
var i = 0
var render = function () {
    requestAnimationFrame( render );
    
    // bars.map = mapper(bars.map, i)

    var scrollDiff = scrollNow - scrollLastThresh;
    var scrollPart = Math.floor(scrollDiff);
    scrollLastThresh += scrollPart;
    //console.log(scrollPart)
    
    

    //var slope = Math.round(scroll / 4) * -1;
    //var noiseMapNew = new Uint8Array( 4 * noiseSize * noiseSize );
   

    chan_paint_over_mouse(bars.map)


    if (scrollPart != 0) {
        pix_effect_scroll(bars.map, scrollPart)
    }


    // if (mouse) {
    //  raycaster.setFromCamera( mouse, camera );
    //  var intersects = raycaster.intersectObjects( scene.children );
    //  if ( intersects.length > 0 ) {
    //      if ( INTERSECTED != intersects[ 0 ].object ) {
    //          INTERSECTED = intersects[ 0 ].object;
    //          if (INTERSECTED == hexagon) {
    //              // hex hover start
    //              hexScaleDirectionTarget = 1;
    //              hexScaleForce = 1;
    //              hexScaleSpeed = 0;
    //          }
    //      }
    //  } else {
    //      if (INTERSECTED) {
    //          if (INTERSECTED == hexagon) {
    //              // hex hover end
    //              // //hexScaleMin = 1;
    //              // hexScaleDirectionTarget = -1;
    //              // hexScaleForce = -1;
    //              // hexScaleSpeed = 0;
    //          }
    //          INTERSECTED = null;
    //      }
    //  }   
    // }

    // if (hexScaleDirectionTarget != 0) {
    //  // calc dist
    //  hexScaleSpeed += 0.1;
    //  var prev = hexagon.scale.x;
    //  var target = (hexScaleDirectionTarget == 1 ? hexScaleMax : hexScaleMin);
    //  var dist = target - prev;
    //  hexagon.scale.x += dist * Math.pow(hexScaleSpeed, 2) / distDivPow;
    //  hexagon.scale.y += dist * Math.pow(hexScaleSpeed, 2) / distDivPow;

    //  // calc stop
    //  if (hexScaleDirectionTarget == 1 && hexagon.scale.x > hexScaleMax - scaleStopPrecition) {
    //      hexagon.scale.x = hexScaleMax;
    //      hexagon.scale.y = hexScaleMax;
    //      hexScaleDirectionTarget = 0;
    //      hexScaleSpeed = 0;
    //  }
    //  if (hexScaleDirectionTarget == -1 && hexagon.scale.x < hexScaleMin + scaleStopPrecition) {
    //      hexagon.scale.x = hexScaleMin;
    //      hexagon.scale.y = hexScaleMin;
    //      hexScaleDirectionTarget = 0;
    //      hexScaleSpeed = 0;
    //  }
    // }

    


    
    //bars.map.tex.image.data = map

    // // hexagon.position.x = orgin.x / 500 * -1;
    // // hexagon.position.y = orgin.y / 500;
    // bars.map.tex.needsUpdate = true;

    // //scrollDiff = 
    i++
    renderer.render(scene, camera);
};






render();




// function onWindowResize() {

//  camera.aspect = window.innerWidth / window.innerHeight;
//  camera.updateProjectionMatrix();

//  renderer.setSize( window.innerWidth, window.innerHeight );

//  controls.handleResize();

//  render();

// }


function modulo(pos, whole){
    mod = pos % whole
    if (pos < 0) {
        mod += whole
        if (mod == whole) mod = 0
    }
    return mod
}

function pix_by_mouse(x, y, radius){
    if ((x < mouse_norm_x + radius && x > mouse_norm_x - radius - 1) &&
        (y < mouse_norm_y + radius && y > mouse_norm_y - radius - 1)) {
        return true
    } else {
        return false
    }
}
function pix_to_mouse(x, y){
    dist_x = x - mouse_norm_x
    dist_y = y - mouse_norm_y
    dist = Math.sqrt((2 << dist_x) + (2 << dist_y))
    return dist
}

//// map functions
// map 
// function mapper(map, i){
//  map.arr = chan_paint_noise(map, i)
//  map.tex.image.data = chan_paint_noise(map, i)
//  map.tex.needsUpdate = true;
//  return map
// }
// map painters
function chan_paint_noise(map){
    for ( var x = 0; x < map.res.width; x++ ) {
        for ( var y = 0; y < map.res.height; y++ ) {
            var pix = (y * map.res.width + x) * 4;

            var rand = Math.random();
            var bg = 255 * 0.075;
            var r = Math.pow(rand, 400) * (255 - bg) + bg;
            var g = Math.pow(rand, 200) * (255 - bg) + bg;
            var b = Math.pow(rand, 100) * (255 - bg) + bg;

            map.arr[ pix     ] = r;
            map.arr[ pix + 1 ] = g;
            map.arr[ pix + 2 ] = b;
            map.arr[ pix + 3 ] = 255;

        }
    }
    map.tex.image.data = map.arr
    map.tex.needsUpdate = true;
}
function chan_paint_border(map){
    for ( var x = 0; x < map.res.width; x++ ) {
        for ( var y = 0; y < map.res.height; y++ ) {
            var pix = (y * map.res.width + x) * 4;

            border_size = 10
            if ((x < border_size || x > map.res.width - border_size - 1) || (y < border_size || y > map.res.height - border_size - 1)) {
                map.arr[ pix     ] = 255 * 1.0;
                map.arr[ pix + 1 ] = 255 * 0.25;
                map.arr[ pix + 2 ] = 255 * 0.0;
                map.arr[ pix + 3 ] = 255 * 1.0;
            }

        }
    }
    map.tex.image.data = map.arr
    map.tex.needsUpdate = true;
}
function chan_paint_over_mouse(map){
    arr = map.tex.image.data
    for ( var x = 0; x < map.res.width; x++ ) {
        for ( var y = 0; y < map.res.height; y++ ) {
            var pix = (y * map.res.width + x) * 4;

            radius = 1
            if (pix_by_mouse(x, y, radius)) {
                arr[ pix     ] = 255 * 1.0;
                arr[ pix + 1 ] = 255 * 1.0;
                arr[ pix + 2 ] = 255 * 1.0;
                arr[ pix + 3 ] = 255 * 1.0;
            }

        }
    }
    map.tex.image.data = arr
    map.tex.needsUpdate = true;
}
// map effectors
function pix_effect_scroll(map, scroll_dist) {
    arr = new Uint8Array(map.res.width * map.res.height * 4)
    for ( var x = 0; x < map.res.width; x++ ) {
        for ( var y = 0; y < map.res.height; y++ ) {
            for ( var c = 0; c < 4; c++ ) {
                var chan = (y * map.res.width + x) * 4 + c;
                //scroll = Math.round((scroll_dist * pix_to_mouse(x, y)) / 10000)
                scroll = scroll_dist
                var from_y = modulo((y + scroll), map.res.height)
                var from_chan = (from_y * map.res.width + x) * 4 + c;

                // map[ i ] = map.tex.image.data[ posMod(i + pixDist, size * 4) +noiseSize*4 * 20 ];
                // noiseMapNew[ i+1 ] = bars.map.tex.image.data[ i+1 +noiseSize*4 ] + 0;

                arr[ chan ] = map.tex.image.data[ from_chan ];
            }            
        }
    }
    map.tex.image.data = arr
    map.tex.needsUpdate = true;
        
    // return map.arr
}


// by _

// thanks to:
// http://threejs.org/
// http://mrdoob.github.io/three.js/examples/webgl_interactive_cubes.html
// checkout http://threejs.org/examples/webgl_modifier_subdivision.html
