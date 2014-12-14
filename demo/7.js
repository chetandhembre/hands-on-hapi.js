//ab -n 1000 -c 100 -v 2 http://127.0.0.1:3000/add?number1=1&number2=1

var Hapi = require('hapi');

var server = new Hapi.Server({
  load : {
     sampleInterval: 4
  }
});

server.connection({ 
  port: 3000 , 
  load: {
    maxEventLoopDelay: 10
  }
});

server.route([{
    method: 'GET',
    path: '/add',
    handler: function (request, reply) {
      var number1 = parseInt(request.query['number1'])
      var number2 = parseInt(request.query['number2'])
      setTimeout(function () {
        reply(number1 + number2)
      }, 3000)
      
    }
}]);
server.start(function () {
    console.log('Server running at:', server.info.uri);
});