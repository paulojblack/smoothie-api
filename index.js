require('dotenv').config()
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');


const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
        // Return validation failure to client
        routes: {
            validate: {
                failAction: async (request, h, err) => {
                    if (err.isJoi) {
                        console.log(err.message);
                    }

                    throw err;
                }
            }
        }
    });

    // Swagger setup
    const swaggerOptions = {
        info: {
            title: 'Smoothie API Documentation',
            version: require('./package.json').version,
        },
        documentationPath: '/docs'
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // Allows me to load routes in whatever dir structure I want
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