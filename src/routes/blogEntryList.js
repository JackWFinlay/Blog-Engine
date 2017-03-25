// blogEntryList.js

var DocumentDBClient = require('documentdb').DocumentClient;

function BlogEntryList(blogEntryDao) {
    this.blogEntryDao = blogEntryDao;
}

BlogEntryList.prototype = {
    getEntry(itemId) {
        return this.blogEntryDao.bind(getEntry(itemId));
    },

    getAllEntries() {
        return this.blogEntryDao.bind(getEntries());
    }

};

module.exports = BlogEntryList;