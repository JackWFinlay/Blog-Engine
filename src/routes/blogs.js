// blogs.js
'use strict';

let express = require('express');
let app     = express();
let router 	= express.Router();
let Blog    = require('../models/blog');

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

let getAllEntries = function() {
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