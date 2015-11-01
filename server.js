
// Require relevent stuff
var assert = require('assert');
var http = require('http');
var express = require('express');
var tesseract = require('node-tesseract');
var Canvas = require('canvas');
var Image = Canvas.Image;
var app = express();
var fs = require('fs');

// OCR Functionality
var processText = function(imagePath) {
  tesseract.process(__dirname + "/" + imagePath, {
    psm: 6
  },
  function(err, text) {
    if(err) {
        console.error(err);
    } else {
        console.log(text);
    }
  });
}

// Takes an array of arrays of points (objects with x and y fields), draws
// an image, and outputs the image to a file.
var renderPaths = function(outFile, paths) {
  var BORDER = 5;
  var minX = Number.MAX_VALUE
  var maxX = Number.MIN_VALUE
  var minY = Number.MAX_VALUE
  var maxY = Number.MIN_VALUE;
  for (i = 0; i < paths.length; i++) {
    var path = paths[i];
    for (j = 0; j < path.length; j++) {
      var point = path[j];
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }
  }
  var xSize = maxX - minX + 2 * BORDER;
  var ySize = maxY - minY + 2 * BORDER;
  var canvas = new Canvas(xSize , ySize);
  var ctx = canvas.getContext('2d');
  var drawCircle = function(x, y) {
    ctx.beginPath();
    ctx.arc(x + BORDER, y - minY + BORDER, 5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle="#FFFFFF";
  ctx.fillRect(0, 0, xSize, ySize);
  ctx.lineWidth = 10;
  ctx.lineJoin = "round";
  ctx.fillStyle="#000000";
  for (i = 0; i < paths.length; i++) {
    var path = paths[i];
    ctx.beginPath();
    for (j = 0; j < path.length; j++) {
      var point = path[j];
      ctx.lineTo(point.x - minX + BORDER, point.y - minY + BORDER);
    }
    ctx.stroke();
    drawCircle(path[0].x, path[0].y);
    drawCircle(path[path.length - 1].x, path[path.length - 1].y);
  }
  fs.writeFile(outFile, canvas.toBuffer(), 'ascii', function(err) {});
}

// This variable represents the database part of the application - the parts that should be a database
var data = [];
app.set('sessionData', data);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Basic homepage, should have useful links
app.get('/', function(request, response) {
  response.render('pages/index');
});

// A list of the active sessions
app.get('/sessions', function(request, response) {
  response.render('pages/sessions')
});

// Connect to a specific session
app.get('/session', function(request, response) {
  response.render('pages/session')
});

app.post('/', function(request, response) {
});

// accept
app.post('/host-session', function(request, response) {

});

var server = app.listen(app.get('port'), function() {
  var port = app.get('port')
  console.log('Node app is running at http://localhost:%s', port);
});

renderPaths("out.png", [[
  {x:0,y:0}
]])

processText("out.png");
