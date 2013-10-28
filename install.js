var Service = require('node-linux').Service;

// Create a new service object
var svc = new Service({
    name: 'ragnar-server',
    description: 'Ragnar server',
    script: __dirname + '/app.js',
    env: process.env
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    svc.start();
}).on('alreadyinstalled', function() {
        svc.start();
    });

svc.install();