
exports.shutdown = function (server, serverName) {
    const shutdown = () => {
        console.log(`Received kill signal, shutting down ${serverName} gracefully...`);
        server.close(() => {
            console.log(`${serverName} closed out remaining connections`);
            process.exit(0);
        });

        // Force shutdown after 10 seconds
        setTimeout(() => {
            console.error(`${serverName} could not close connections in time, forcefully shutting down`);
            process.exit(1);
        }, 5000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}