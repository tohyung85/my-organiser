const packageJson = require('./package.json');
import Tasklist from './models/tasklist';
import * as moment from 'moment';
import * as Boom from 'boom';
import * as Events from './events';
import * as TasklistController from './controllers/tasklist-controller';

const after = function(server, next) {
  Events.registerEvents(server.events);

  server.expose('TasklistModel', done => {
    return Tasklist;
  })

  server.route({
    method: 'POST',
    path: '/tasklist',
    config: {
      auth: 'jwt',
      tags: ['api'],
      handler: TasklistController.addTasklist,
      validate: {
        payload: Tasklist.schema
      }
    }
  });

  next();
}

export function register(server, options, next) {
  server.dependency('auth-section', after);

  next();
}

exports.register.attributes = {
  pkg: packageJson
};
