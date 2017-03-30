// blog.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var blogSchema = new Blog({
    author: String,
    title: String,
    body: String,
    tags: [{tag: String}],
    created_at: Date,
    updated_at: Date,
    sticky: Boolean
});

// the schema is useless so far
// we need to create a model using it
var Blog = mongoose.model('Blog', blogSchema);

// make this available to our users in our Node applications
module.exports = Blog;