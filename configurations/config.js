let config;
let db;

let mongoClient;

require('dotenv').config({
    path: '.env'
});

const MongoClient = require('mongodb').MongoClient;
const _async = require('async');

module.exports = function Config() {
    const vm = this;

    vm.init = function init(done) {
        _async.waterfall([
            (waterfallCallback) => {
                if (!process.env.MAIN_DATABASE_URL)
                    console.error('MAIN_DATABASE_URL is missing');

                MongoClient.connect(process.env.MAIN_DATABASE_URL, {
                    useNewUrlParser: true
                }, (err, _db) => {
                    if (err)
                        waterfallCallback(err);

                    else {
                        mongoClient = _db;
                        db = _db.db();

                        console.log('Main database connected');

                        waterfallCallback(null);
                    }
                });
            }
        ], (err) => {
            if (err) {
                console.error('Error getting configurations');
                console.error(err);
                done(err);
            }

            else
                done();
        });
    };

    vm.getConfig = function () {
        return config;
    };

    vm.get = function (key) {
        if (key in config)
            return JSON.parse(JSON.stringify(config[key]));

        else
            console.error(key, 'Not found in config');
    };

    vm.getDB = function () {
        return db;
    };

    vm.getNewMongoSession = function () {
        return mongoClient.startSession();
    };

    return vm;
};