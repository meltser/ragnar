var Service = require('node-linux').Service;

// Create a new service object
var svc = new Service({
    name: 'ragnar-server',
    description: 'Ragnar server',
    script: __dirname + '/app.js',
    env: process.env
});

svc.uninstall();