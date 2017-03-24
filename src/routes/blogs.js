// blogs.js

var express = require('express');
var app     = express();
var router 	= express.Router();

function Blogs(blogEntryList){
    this.blogEntryList = blogEntryList;
}

router.get('/all', (req, res) => {
    let blogEntries = this.blogEntryList.getAllEntries()
        .then(() => res.json(blogEntries));
});

router.get('/:blog_id', (req, res) => {
    let blogEntry = this.blogEntryList.getEntry(res.params.blog_id)
        .then(() => res.json(blogEntry));
});

module.exports = router;