const db = require('../../../db')
const routes = [{
    method: 'GET',
    path: '/',
    options: {
        description: 'get smoothies',
        tags: ['api'],
    },
    handler: async function (request, h) {
        try {
            let x = await db.query('SELECT 1+1')

            return x
        } catch (e) {
            throw new Error(e)
        }

        return 'Hello World!';
    }
}]

exports.routes = (server) => server.route(routes);