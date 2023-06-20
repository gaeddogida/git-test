'use strict'

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
//    logger = require('@amuzlab/logger'),

    routes = require('./routes')

module.exports = exports = express()

exports
    .use(require('cors')())
//    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json({
        limit: '10mb'
    }))
    .use(bodyParser.urlencoded({
        limit: '10mb',
        extended: false
    }))
    .use(require('cookie-parser')())
    .use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: null,
            httpOnly: true
        },
        store: new (require('session-memory-store')(session))()
    }))
    .use(
        '/',
        routes//,
        // express.static(
        //     path.join(__dirname, 'public', 'views'),
        //     {
        //         index: 'index.html'
        //     })
    )
    .use((err, req, res, next) => {
        logger.error('server error (err : %s)', err.stack)

        if (res.statusCode !== 404) {
            res
                .status(err.statusCode ? err.statusCode : 500)
                .send(err instanceof Error ? err.message : err)
        }
    })