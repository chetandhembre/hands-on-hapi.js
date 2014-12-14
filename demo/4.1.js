var Hapi = require('hapi');
var Joi = require('Joi')

var add = function (request, reply) {
  var number1 = parseInt(request.query['number1'])
  var number2 = parseInt(request.query['number2'])
  reply(number1 + number2)
}

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/add',
    config : {
      validate : {
        query : Joi.object({
          number1 : Joi.number().required(),
          number2 : Joi.number().required()
        }).options({
          abortEarly : false,
          allowUnknown : false
        })
      }
    },
    handler: add
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});

