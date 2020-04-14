const Hapi = require('hapi');
var Path = require('path');
const inert = require('inert');
const PostgreSqlService = require('./db_client/postgress_client');
const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT | 3000,
        //host: '0.0.0.0',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public/')
            }
        }
    });
    await server.register(inert);
    await server.register(require('./src/routers')(new PostgreSqlService()));
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();