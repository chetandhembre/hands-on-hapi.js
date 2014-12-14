//curl --header "authorization:demo" "http://127.0.0.1:3000/add?number1=12&number2=12"
var Hapi = require('hapi');

var addAuthentication = function (request, reply){
  if (!request.headers.authorization) {
    return reply('unautherized\n')
  }
  reply.continue({ credentials: { user: 'john' } }) 
}


var server = new Hapi.Server();
server.connection({ port: 3000 });

server.auth.scheme('custom', function (schema, options) {
  return {
    authenticate : addAuthentication
  }
});


server.auth.strategy('default', 'custom');

server.route({
    method: 'GET',
    path: '/add',
    config : {
      auth: 'default'
    },
    handler: function (request, reply) {
      
      var number1 = parseInt(request.query['number1'])
      var number2 = parseInt(request.query['number2'])
      reply(number1 + number2 + '\n')
    } 
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});

