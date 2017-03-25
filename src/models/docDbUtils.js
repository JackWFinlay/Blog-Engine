// docdbutils.js
'use strict';

var DocumentDBClient = require('documentdb').DocumentClient;
var config           = require('../config/documentdbConfig');

var HttpStatusCodes  = { NOTFOUND: 404 };

var databaseUrl   = `dbs/${config.databaseId}`;
var collectionUrl = `${databaseUrl}/colls/${config.collectionId}`;

function DocDBUtils(){}

DocDBUtils.prototype = {
    getOrCreateDatabase(client) {
        return new Promise((resolve, reject) => {
            client.readDatabase(databaseUrl, (err, result) => {
                if (err) {
                    if (err.code == HttpStatusCodes.NOTFOUND) {
                        client.createDatabase({ id: config.databaseId}, (err, created) => {
                            if (err) reject(err)
                            else resolve(created);
                        });
                    } else {
                        console.log(err);
                        reject(err);
                    }
                } else {
                    resolve(result);
                }
            });
        });
    },

    getOrCreateCollection(client, databaseLink) {
        return new Promise((resolve, reject) => {
            client.readCollection(collectionUrl, (err, result) => {
                if (err) {
                    if (err.code == HttpStatusCodes.NOTFOUND) {
                        client.createCollection(databaseUrl,{ id: config.collectionId}, { offerThroughput: 400 }, (err, created) => {
                            if (err) {
                                reject(err)
                            }
                            else {
                                resolve(created)
                            };
                        });
                    } else {
                        console.log(err);
                        reject(err);
                    }
                } else {
                    resolve(result);
                }
            });
        });
    }
};

module.exports = DocDBUtils;