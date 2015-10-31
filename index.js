
// Require relevent stuff
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var http = require('http');
var express = require('express');
var app = express();

var mongoUrl = 'mongodb://localhost:27017/myproject';
var dataBase;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Helper functions
var makeSession = function(name, description) {

    dataBase.collection("sessions").insertOne( {
        "name": name,
        "description": "A new session.",
        "listeners": []
    });
    console.log("Inserted a document into the sessions collection.");
    return true;
}

MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    dataBase = db;
});

const PORT = 8080;
function handleRequest(request, response) {
    response.end("It works." + request.url);
}

