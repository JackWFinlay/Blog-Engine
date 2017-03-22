// blogEntryList.js

var DocumentDBClient = require('documentdb').DocumentClient;

function BlogEntryList(blogEntryDao) {
    this.blogEntryDao = blogEntryDao;
}

BlogEntryList.prototype = {
    getEntry(itemId) {
        return this.blogEntryDao.getItem(itemId);
    },

    getAllEntries() {
        return this.blogEntryDao.getAllItems();
    }


};

module.exports = BlogEntryList;