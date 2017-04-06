// blogs.js
'use strict';

const express = require('express');
const app     = express();
const router 	= express.Router();
const Blog    = require('../models/blog');

router.get('/all', function (req, res) {
    let blogEntries = getAllEntries()
        .catch((err) => console.log(err))
        .then((blogEntries) => res.json(blogEntries));
});

router.get('/:blog_id', function (req, res) {
    let getEntryByID = new Promise((resolve, reject) => {
        Blog.find({ id:req.params.blog_id }, (err, blog) => {
            if (err) { 
                reject(err);
            } else {
                resolve(blog);
            }
        });
    })
    .catch( err => console.log(err))
    .then((blog) => res.json(blog));
});

const getAllEntries = function() {
    return new Promise((resolve, reject) => {
        Blog.find({}, (err, blogs) => {
            if (err) { 
                reject(err);
            } else {
                resolve(blogs);
            }

        });
    });
};

module.exports = router;