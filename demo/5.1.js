var Hapi = require('hapi');

var add = function (num1, num2, next) {
  console.log('in add')
  next(null, (num1 + num2) + '\n')
}

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.method('add', add, {
  cache: {
    expiresIn: 10 * 1000,   // 10 seconds 
    staleIn : 2 * 1000,
    staleTimeout : 100
  },
  generateKey: function(num1, num2) {
    return num1 +'+'+ num2;
  }
})

server.route([{
    method: 'GET',
    path: '/add',
    handler: function (request, reply) {
      var number1 = parseInt(request.query['number1'])
      var number2 = parseInt(request.query['number2'])
      server.methods.add(number1, number2, function(error, result) {
        reply(error || result);
      });
    }
}]);


server.start(function () {
    console.log('Server running at:', server.info.uri);
});

