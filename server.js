//server.js
'use strict';

var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');
var path       	     = require('path');
var DocumentDBClient = require('documentdb').DocumentClient;
var config           = require('./src/config/documentdbConfig');
var BlogEntryDao     = require('./src/models/blogEntryDao');
var Blogs            = require('./src/routes/blogs');

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

var blogEntryDao = new BlogEntryDao(docDbClient, config.databaseId, config.collectionId);
blogEntryDao.init().catch((err) => console.log("1: " + err))
            .then(() => {
                app.use((req, res, next) => {
                    res.locals.blogEntryDao = blogEntryDao;
                    next();
                })
                // map all /Blog/ routes to blogs.js
                app.use('/blogs', Blogs);
            })
            .catch((err) => console.log(err));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// var router = express.Router(); // get an instance of the express Router

// serve static resources. i.e. public/css/site.css will be css/site.css
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../')));

app.get('/', function(req, res) {
        res.sendFile("/public/index.html", {"root": __dirname});
});

// Start servers
var port = process.env.PORT || 8000;
app.listen(port);
console.log('Magic happens on port ' + port); 