var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route([{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: __dirname + '/public'
        }
    }
},{
    method: 'GET',
    path: '/add',
    handler: function (request, reply) {
      var number1 = parseInt(request.query['number1'])
      var number2 = parseInt(request.query['number2'])
      reply(number1 + number2)
    }
}]);
server.start(function () {
    console.log('Server running at:', server.info.uri);
});