let config;
let db;

let mongoClient;

require('dotenv').config({
    path: '.env'
});

const MongoClient = require('mongodb').MongoClient;

module.exports = function Config() {
    const vm = this;

    vm.init = async function init() {
        mongoClient = new MongoClient(process.env.MAIN_DATABASE_URL);
        
        await mongoClient.connect();

        db = mongoClient.db(process.env.MAIN_DATABASE_NAME);
        
        console.log('Main database connected');
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