/*jslint node: true */
'use strict';

const onHeaders = require('on-headers');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');

const config = require('./configurations/config')();

const logHeaders = (req, res, next) => {
    if (!req.headers.ip) {
        if (req.headers['cf-connecting-ip'])
            req.headers.ip = req.headers['cf-connecting-ip'];

        else if (req.headers['x-forwarded-for'])
            req.headers.ip = req.headers['x-forwarded-for'];

        else if (req.connection.remoteAddress)
            req.headers.ip = req.connection.remoteAddress;
    }

    onHeaders(res, () => {
        if (res.statusCode === 200 || res.statusCode === 304)
            console.log(`${req.method} : ${req.originalUrl} => ${res.statusCode} => ${req.headers.ip}`);

        else
            console.error(`${req.method} : ${req.originalUrl} => ${res.statusCode} => ${req.headers.ip}`);
    });

    next();
};

const corsMiddleware = (req, res, next) => {
    res.header('access-control-expose-headers', 'token' + ',Content-Length');

    if ('OPTIONS' === req.method)
        res.sendStatus(200);
    else
        next();
};

const onSingalInterruptedHandler = (server) => {
    server.close(function (err) {
        if (err) {
            console.error('Server closed error');
            console.error(err);
            process.exit(1);
        }
    });
};

config.init((err) => {
    if (err)
        console.error(err);

    else {
        const app = express();

        const server = http.Server(app);

        app.use(cors());
        app.use(cookieParser());

        const routes = require('./routes');

        app.use(bodyParser.json({
            extended: 'true',
            limit: '14mb'
        }));

        app.use(bodyParser.urlencoded({
            extended: 'true',
            limit: '14mb'
        }));

        app.use(methodOverride());
        app.use(helmet());

        app.use(corsMiddleware);
        app.use(logHeaders);

        // needed for rate limiter
        app.set('trust proxy', 1);

        app.use(express.static('public'));

        app.use(process.env.SERVER_URL_PREFIX, routes);

        const PORT = 1234;

        server.listen(PORT, () => {
            console.log(`listening on *:${PORT}`);
        });

        process.on('SIGINT', () => {
            console.log('SIGINT signal received.');

            onSingalInterruptedHandler(server);
        });
    }
});