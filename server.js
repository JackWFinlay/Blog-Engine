//server.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./src/config/documentdbConfig');
var BlogEntryList = require('./src/routes/blogEntrylist');
var BlogEntryDao = require('./src/models/blogEntryDao');

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
var blogEntryDao = new BlogEntryDao(docDbClient, config.databaseId, config.collectionId);
var blogEntryList = new BlogEntryList(blogEntryDao);
blogEntryDao.init();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var router = express.Router();// get an instance of the express Router

app.get('/blogs/', (req, res) => {
    let blogEntries = blogEntryList.getAllEntries();
    res.json(blogEntries);
});

// Start server
var port = process.env.PORT || 80;
app.listen(port);
console.log('Magic happens on port ' + port); 