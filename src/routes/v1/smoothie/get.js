const db = require('../../../db')
const routes = [{
    method: 'GET',
    path: '/',
    handler: async function (request, h) {
        let x = await db.query('SELECT 1+1')

        return x
        return 'Hello World!';
    }
}]

exports.routes = (server) => server.route(routes);