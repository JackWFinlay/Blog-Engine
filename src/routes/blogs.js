// blogs.js
'use strict';

let express = require('express');
let app     = express();
let router 	= express.Router();
let Blog    = require('../models/blog');

router.get('/all', function (req, res) {
    console.log("get all");
    let blogEntries = getAllEntries()
        .catch((err) => console.log(err))
        .then((blogEntries) => res.json(blogEntries));
});

router.get('/:blog_id', function (req, res) {
    console.log('get :' + req.params.blog_id);

    let getAllEntryByID = new Promise((resolve, reject) => {
        Blog.findById(req.params.blog_id, (err, blog) => {
            if (err) { 
                reject(err);
            } else {
                resolve(blog);
            }
        });
    }).catch( err => console.log(err))
    .then((blog) => res.json(blog));
});

let getAllEntries = new Promise((resolve, reject) => {
    Blog.find({}, (err, blogs) => {
        if (err) { 
            reject(err);
        } else {
            resolve(blogs);
        }

    });
});



module.exports = router;