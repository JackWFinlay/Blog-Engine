//server.js
'use strict';

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const path       = require('path');
const mongoose   = require('mongoose');
const config     = require('./src/config/config');
const blogs      = require('./src/routes/blogs');
const Blog       = require('./src/models/blog');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connect(config.connectionString);

// var router = express.Router(); // get an instance of the express Router

// serve static resources. i.e. public/css/site.css will be css/site.css
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../')));

// let newBlog = new Blog({
//         id: "1",
//         title: "First Blog",
//         body: "Hello, World!",
//         tags: [
//                 "first",
//                 "blog",
//                 "hello"
//         ],
//         author: "Jack"
// });

// newBlog.save((err) => {
//         if(err) throw err;
// });

// newBlog = new Blog({
//         id: "2",
//         title: "Second Blog",
//         body: "Testing",
//         tags: [
//                 "second",
//                 "blog",
//                 "testing"
//         ],
//         author: "Jack"
// });

// newBlog.save((err) => {
//         if(err) throw err;
// });

app.use('/blogs', blogs);

app.get('/', function(req, res) {
    res.sendFile("/public/index.html", {"root": __dirname});
});

// Start servers
var port = process.env.PORT || 8000;
app.listen(port);
console.log('Magic happens on port ' + port); 