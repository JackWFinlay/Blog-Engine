// docdbutils.js
'use strict';

var DocumentDBClient = require('documentdb').DocumentClient;
var HttpStatusCodes  = { NOTFOUND: 404 };

function DocDBUtils(databaseId, urlConnection, collectionId){
    var databaseUrl   = `dbs/${databaseId}`;
    var collectionUrl = `${urlConnection}/colls/${collectionId}`;
}

DocDBUtils.prototype = {
    getOrCreateDatabase: function (client, databaseId, collectionId, callback) {
        return new Promise((resolve, reject) => {
            client.readDatabase(databaseUrl, (err, result) => {
                if (err) {
                    if (err.code == HttpStatusCodes.NOTFOUND) {
                        client.createDatabase({ id: databaseId}, (err, created) => {
                            if (err) reject(err)
                            else resolve(created);
                        });
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(result);
                }
            });
        });
        // var querySpec = {
        //     query: 'SELECT * FROM root r WHERE r.id= @id',
        //     parameters: [{
        //         name: '@id',
        //         value: databaseId
        //     }]
        // };

        // client.queryDatabases(querySpec).toArray(function (err, results) {
        //     if (err) {
        //         callback(err);
        //     } else {
        //         if (results.length === 0) {
        //             var databaseSpec = {
        //                 id: databaseId
        //             };

        //             client.createDatabase(databaseSpec, function (err, created) {
        //                 callback(null, created);
        //             });

        //         } else {
        //             callback(null, results[0]);
        //         }
        //     }
        // });
    },

    getOrCreateCollection: function (client, databaseLink, collectionId) {
        return new Promise((resolve, reject) => {
        client.readCollection(collectionUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createCollection(databaseUrl, config.collection, { offerThroughput: 400 }, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
        // var querySpec = {
        //     query: 'SELECT * FROM root r WHERE r.id=@id',
        //     parameters: [{
        //         name: '@id',
        //         value: collectionId
        //     }]
        // };

        // client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
        //     if (err) {
        //         callback(err);

        //     } else {
        //         if (results.length === 0) {
        //             var collectionSpec = {
        //                 id: collectionId
        //             };

        //             client.createCollection(databaseLink, collectionSpec, function (err, created) {
        //                 callback(null, created);
        //             });

        //         } else {
        //             callback(null, results[0]);
        //         }
        //     }
        // });
    }
};

module.exports = DocDBUtils;