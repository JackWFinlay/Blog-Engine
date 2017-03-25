// blogs.js
'use strict';
var express = require('express');
var app     = express();
var router 	= express.Router();

router.get('/all', function (req, res) {
    let blogEntries = res.locals.blogEntryDao.getEntries().bind(this)
        .catch((err) => console.log(err))
        .then(() => res.json(blogEntries));
});

router.get('/:blog_id', function (req, res) {
    let blogEntry = res.locals.blogEntryDao.getEntry(req.params.blog_id).bind(this)
        .then(() => res.json(blogEntry));
});

module.exports = router;