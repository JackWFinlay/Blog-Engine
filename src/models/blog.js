// blog.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const blogSchema = new Schema({
    id: Number,
    author: String,
    title: String,
    body: String,
    tags: [String],
    created_at: Date,
    updated_at: Date,
    sticky: Boolean
});

// the schema is useless so far
// we need to create a model using it
const Blog = mongoose.model('Blog', blogSchema);

blogSchema.pre('save', (next) => {

    let currentDate = new Date();
    this.updated_at = currentDate

    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

// make this available to our users in our Node applications
module.exports = Blog;