// blogs.js
'use strict';
var express = require('express');
var app     = express();
var router 	= express.Router();

function Blogs(blogEntryList){
    console.log("blog2")
    this.blogEntryList = blogEntryList;
    console.log("blog3")
}

router.get('/All', function (req, res) {
    // let blogEntries = this.blogEntryList.getAllEntries()
    //     .catch((err) => console.log(err))
    //     .then(() => res.json(blogEntries));
    console.log("blog4")
    res.send("It works!");
});

// router.get('/:blog_id', function (req, res) {
//     let blogEntry = this.blogEntryList.getEntry(res.params.blog_id)
//         .then(() => res.json(blogEntry));
// });

module.exports = router;