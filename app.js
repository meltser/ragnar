var config = require('./config');
var http = require('http');
var path = require('path');
var util = require('util');

var htmlparser = require('htmlparser2');
var token;
var guid;

var parser = new htmlparser.Parser({
    ontext: function (text) {
        console.log("-->", text);
        token = text;

        http.get({
            host: config.utorrentHost,
            port: config.utorrentPort,
            path: util.format(config.utorrentList, token),
            headers: {
                'Authorization': 'Basic ' + new Buffer('admin:').toString('base64'),
                'Cookie': 'GUID=' + guid
            }
        },function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                var postReq = http.request({
                    host: config.flokiHost,
                    port: config.flokiPort,
                    path: config.flokiTorrentsReportAPI,
                    method: 'POST',
                    headers: {
                        'Cookie': 'token=kuku',
                        'Content-Type': 'application/json',
                        'Content-Length': str.length
                    }});

                // post the data
                postReq.write(str);
                postReq.end();

                var torrents = JSON.parse(str).torrents;
                for (var i = 0; i < torrents.length; i++) {
                    var torrent = torrents[i];
                    getTrackers(torrent[0]);
                }
            });

            response.on('error', function (e) {
                console.log("Got error: " + e.message);
            });
        }).on('error', function (e) {
                console.log(e.message);
            });
    }
});

function getTrackers(hash) {
    http.get({
        host: config.utorrentHost,
        port: config.utorrentPort,
        path: util.format(config.utorrentGetProps, token, hash),
        headers: {
            'Authorization': 'Basic ' + new Buffer('admin:').toString('base64'),
            'Cookie': 'GUID=' + guid
        }
    },function (response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var postReq = http.request({
                host: config.flokiHost,
                port: config.flokiPort,
                path: config.flokiTrackersReportAPI,
                method: 'POST',
                headers: {
                    'Cookie': 'token=kuku',
                    'Content-Type': 'application/json',
                    'Content-Length': str.length
                }});

            // post the data
            postReq.write(str);
            postReq.end();
        });

        response.on('error', function (e) {
            console.log("Got error: " + e.message);
        });
    }).on('error', function (e) {
            console.log(e.message);
        });
}

function getTorrents() {
    http.get({
        host: config.utorrentHost,
        port: config.utorrentPort,
        path: config.utorrentTokenHtml,
        headers: {
            'Authorization': 'Basic ' + new Buffer('admin:').toString('base64')
        }
    },function (response) {
        guid = response.headers['set-cookie'][0].match(/GUID=([^;]*);/)[1];
        console.log(guid);

        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
            parser.write(str);
            parser.end();
        });

        response.on('error', function (e) {
            console.log("Got error: " + e.message);
        });
    }).on('error', function (e) {
            console.log(e.message);
        });
}

getTorrents();

setInterval(getTorrents, 60 * 1000);


