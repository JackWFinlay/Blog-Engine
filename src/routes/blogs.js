// blogs.js
'use strict';

var express = require('express');
var app     = express();
var router 	= express.Router();

router.get('/all', function (req, res) {
    let blogEntries = res.locals.blogEntryDao.getAllEntries()
        .catch((err) => console.log(err))
        .then((blogEntries) => res.json(blogEntries));
});

router.get('/:blog_id', function (req, res) {
    console.log('get :' + req.params.blog_id);
    res.locals.blogEntryDao.getEntry(req.params.blog_id)
        .then((blogEntry) => res.json(blogEntry));
});

module.exports = router;