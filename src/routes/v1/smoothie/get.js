const routes = [{
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        return 'Hello World!';
    }
}]

exports.routes = (server) => server.route(routes);