/*
// Require relevent stuff
var assert = require('assert');
var http = require('http');
var express = require('express');
<<<<<<< HEAD
var tesseract = require('node-tesseract');
var gm = require('gm');
=======
var WebSocketServer = require("ws").Server
//var tesseract = require('node-tesseract');
//var Canvas = require('canvas');
//var Image = Canvas.Image;
>>>>>>> f9020fcae28954320a670bd5e3fd66913614f731
var app = express();
var fs = require('fs');

var net = require('net');
var tcp_server = net.createServer(function(socket)
{
socket.write('Joydip\n');
socket.end('Kanjilal\n');
});
tcp_server.listen(8000);

//var port = process.env.PORT || 5000

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

<<<<<<< HEAD
var server = app.listen(app.get('port'), function() {
  var port = app.get('port')
  console.log('Node app is running at http://localhost:%s', port);
});

renderPaths("out.png", [[
  {x:0,y:0},
  {x:100,y:100}
]])
=======
var net = require('net');

var myserver = net.createServer(function(socket)
	{
		socket.write('Joydip\n');
        socket.write('fogoerigj\n');
		socket.end('Kanjilal\n');

//		socket.write('Echo server\r\n');
//		socket.pipe(socket);
	});

myserver.listen(8000, '127.0.0.1');

// var client = new net.Socket();
// client.connect(8000, '127.0.0.1', function() {
//     console.log("Connected.");
//     //client.write('Hello, bcbjkscb');
// });
//
// client.on('data', function(data) {
//     console.log("received: " + data);
// });
//
// client.on('close', function() {
//     console.log('Connection closed.');
// });

=======
// var server = http.createServer(app)
// server.listen(port)

// console.log("http server listening on %d", port)

// var wss = new WebSocketServer({server: server})
// console.log("websocket server created")

// wss.on("connection", function(ws) {
//   var id = setInterval(function() {
//     ws.send(JSON.stringify(new Date()), function() {  })
//   }, 1000)

//   console.log("websocket connection open")

//   ws.on("close", function() {
//     console.log("websocket connection close")
//     clearInterval(id)
//   })
// })

// var server = app.listen(app.get('port'), function() {
//   var port = app.get('port')
//   console.log('Node app is running at http://localhost:%s', port);
// });
>>>>>>> f9020fcae28954320a670bd5e3fd66913614f731

//

// renderPaths("out.png", [[
//   {x:0,y:0},
//   {x:100,y:100}
// ]])
//
// processText("out.png");
*/


//websocket gateway on 8070
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');
var mysocket = 0;
app.listen(8070 || process.env.PORT);
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
io.sockets.on('connection', function (socket) {
  console.log('index.html connected');
  mysocket = socket;
});

//udp server on 41181
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
  console.log("msg: " + msg);
  if (mysocket != 0) {
     mysocket.emit('field', "" + msg);
     mysocket.broadcast.emit('field', "" + msg);
  }
});
server.on("listening", function () {
  var address = server.address();
  console.log("udp server listening " + address.address + ":" + address.port);
});
server.bind(41181);
