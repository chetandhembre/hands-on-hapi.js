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


var add = function (num1, num2, next) {
  console.log('in add')
  next(null, num1 + num2 + '\n')
}

var addAuthentication = function (request, reply){
  if (!request.headers.authorization) {
    return reply('unautherized\n')
  }
  reply.continue({ credentials: { user: 'john' } }) 
}

server.auth.scheme('custom', function (schema, options) {
  return {
    authenticate : addAuthentication
  }
});


server.auth.strategy('default', 'custom');

server.method('add', add, {
  cache: {
    expiresIn: 10 * 1000   // 10 seconds 
  },
  generateKey: function(num1, num2) {
    return num1 +'+'+ num2;
  }
})


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
    config : {
      validate : {
        query : Joi.object({
          number1 : Joi.number().required(),
          number2 : Joi.number().required()
        })
      },
      auth: 'default'
    },
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