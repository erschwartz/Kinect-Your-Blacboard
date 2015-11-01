
// Require relevent stuff
var assert = require('assert');
var http = require('http');
var express = require('express');
var tesseract = require('node-tesseract');
var gm = require('gm');
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
  var BORDER = 10;
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
  var g = gm(xSize, ySize, "#FFFFFF");
  g.stroke("#000", BORDER);
  for (i = 0; i < paths.length; i++) {
    var path = paths[i];
    for (j = 0; j < path.length - 1; j++) {
      var p1 = path[j];
      var p2 = path[j+1];
      g.drawLine(p1.x - minX + BORDER, p1.y - minY + BORDER, p2.x - minX + BORDER, p2.y - minY + BORDER);
    }
  }
  g.write(outFile, function(err) {});
}

// This variable represents the database part of the application - the parts that should be a database
var data = [];
app.set('sessionData', data);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/website'));

app.set('views', __dirname + '/website');
app.set('view engine', 'ejs');

app.get('/account', function(request, response) {
  response.render('account');
});

app.get('/profile', function(request, response) {
  response.render('profile');
})

app.get('/registerpage', function(request, response) {
  response.render('registerpage');
});

app.get('/', function(request, response) {
  response.render('index')
});

app.post('/', function(request, response) {
  console.log(request);
});

var server = app.listen(app.get('port'), function() {
  var port = app.get('port')
  console.log('Node app is running at http://localhost:%s', port);
});
//
renderPaths("out.png", [[
  {x:0,y:0},
  {x:100,y:100}
]])

processText("out.png");
