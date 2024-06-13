const cluster = require('cluster');
const { cpus } = require('os');
const { app, port, securePort } = require('./app');
const { shutdown } = require('./utils/shutdown');

const numCPUs = cpus().length;
const secureServer = require('https').createServer(app);

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });

    // Start the secure server in the primary process
    secureServer.listen(securePort, () => {
        console.log(`Secure server is up and running on port number ${securePort}`);
    });

    shutdown(secureServer, 'SecureServer');
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    secureServer.listen(port, () => {
        console.log(`Worker ${process.pid} started and server is up and running on port number ${port}`);
    });

    shutdown(secureServer, 'secureServer');
}


