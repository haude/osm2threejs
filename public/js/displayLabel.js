// # Coordinate origin (0,0,0): lat 27.648149999999987, lon 85.33330000000001, ele 

function displayAllLabels(location) {
    var filename = "/" + location + "_data.json";
    var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function(e) {
        var data = JSON.parse(e.target.responseText);

        //get scale
        getScale(data[0].lon, data[0].lat); // 85.33330000000001, 27.648149999999987);
        window.data = data;
        for (var i=1;i<data.length;i++) {
            x=posX(data[i].lon);
            y=posY(data[i].lat);
            displayLabel(data[i].name,x,-y);
        }
      }, true);
      xhr.open('GET', filename, true);
      xhr.send(null);
}

function displayLabel(text, lat, long) {
    
  var spritey = makeTextSprite( text, 
                                { fontsize: 24, borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );
  spritey.position.set(lat,5,long);
  scene.add( spritey );
}
  
function makeTextSprite( message, parameters )
{
        if ( parameters === undefined ) parameters = {};
        
        var fontface = parameters.hasOwnProperty("fontface") ? 
                parameters["fontface"] : "Arial";
        
        var fontsize = parameters.hasOwnProperty("fontsize") ? 
                parameters["fontsize"] : 18;
        
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
                parameters["borderThickness"] : 4;
        
        var borderColor = parameters.hasOwnProperty("borderColor") ?
                parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
                parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

        //var spriteAlignment = THREE.SpriteAlignment.topLeft;
                
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
    
        // get size data (height depends only on font size)
        var metrics = context.measureText( message );
        var textWidth = metrics.width;
        
        // background color
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                                                  + backgroundColor.b + "," + backgroundColor.a + ")";
        // border color
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                                                  + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        // 1.4 is extra height factor for text below baseline: g,j,p,q.
        
        // text color
        context.fillStyle = "rgba(0, 0, 0, 1.0)";

        context.fillText( message, borderThickness, fontsize + borderThickness);
        
        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial( 
                //{ map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
                { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(100,50,1.0);
        return sprite;  
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
        ctx.stroke();   
}
