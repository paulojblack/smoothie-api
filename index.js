const Hapi = require('@hapi/hapi');

const init = async () => {
    console.log(process.env)
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost'
    });

    await server.register({
        plugin: require('hapi-routes'),
        options: {
            dir: `${__dirname}/src/routes/**/*.js`
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();