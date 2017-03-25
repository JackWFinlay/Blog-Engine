// blogEntryDao.js
'use strict';
var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docdbUtils');

function BlogEntryDao(documentDBClient, databaseId, collectionId) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;

    this.database = null;
    this.collection = null;
}

BlogEntryDao.prototype = {
    init() {
        let self = this;
        return new Promise( (resolve, reject) => {
            
            self.createDb()
                .catch((err) => reject(err))
                .then(() => this.createCollection.bind(self))
                .catch((err) => reject(err));
                
            resolve();
        });
    },

    createDb() {
        let self = this;
        return new Promise((resolve, reject) => {
            let db = docdbUtils.getOrCreateDatabase(self.client, self.databaseId, self.collectionId)
                                .catch((err) => reject(err))
                                .then((db) => self.database = db);
            
            resolve();
        });
    },

    createCollection() {
        let self = this;
        return new Promise(function (resolve, reject) {
            docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId);
        });
    },

    find: function (querySpec, callback) {

        self.client.queryDocuments(this.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },

    addItem: function (item, callback) {
        var self = this;

        item.date = Date.now();
        item.completed = false;

        self.client.createDocument(self.collection._self, item, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                callback(null, doc);
            }
        });
    },

    updateItem: function (itemId, callback) {
        var self = this;

        self.getItem(itemId, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                doc.completed = true;

                self.client.replaceDocument(doc._self, doc, function (err, replaced) {
                    if (err) {
                        callback(err);

                    } else {
                        callback(null, replaced);
                    }
                });
            }
        });
    },

    getEntry(itemId) {
        let self = this;
        return new Promise(function (resolve, reject) {

            let querySpec = {
                query: 'SELECT * FROM root r WHERE r.id = @id',
                parameters: [{
                    name: '@id',
                    value: itemId
                }]
            };

            self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
                if (err) {
                    reject(err);

                } else {
                    resolve(null, results[0]);
                }
            });
        });
    },

    getAllEntries() {
        return new Promise(function (resolve, reject) {
            let querySpec = {
                query: 'SELECT * FROM root r',
            };

            this.client.queryDocuments(this.collection._self, querySpec).toArray(function (err, results) {
                if (err) {
                    reject(err);

                } else {
                    resolve(null, results);
                }
            });
        });
    }
};

module.exports = BlogEntryDao;