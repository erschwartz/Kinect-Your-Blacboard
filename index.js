// This one node.js instance manages both the mongodb and the requests from the client.

// Require relevent stuff
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var http = require('http');

var mongoUrl = 'mongodb://localhost:27017/myproject';
var dataBase;

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

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});
