// blogEntryList.js

var DocumentDBClient = require('documentdb').DocumentClient;

function BlogEntryList(blogEntryDao) {
    this.blogEntryDao = blogEntryDao;
}

BlogEntryList.prototype = {
    getEntry(itemId) {
        return this.blogEntryDao.bind(getItem(itemId));
    },

    getAllEntries() {
        return this.blogEntryDao.bind(getAllItems());
    }

};

module.exports = BlogEntryList;