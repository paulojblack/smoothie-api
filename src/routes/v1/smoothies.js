const db = require('../../db')
const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'get smoothies',
            tags: ['api'],
        },
        handler: async function (request, h) {
            try {
                let x = await db.query('SELECT 1+1')
            } catch (e) {
                throw new Error(e)
            }

            console.log(request.state.test)
            // h.state('test', 'looknospaces');

            return 'Hello World!';
        }
    },
    {
        method: 'POST',
        path: '/smoothie',
        options: {
            description: 'Add new smoothie recipe',
            tags: ['api'],
        },
        handler: async function (request, h) {
            

            return 'Hello World!';
        }
    },
]

exports.routes = (server) => server.route(routes);