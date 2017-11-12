'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

import Tasklist from '../../../../src/plugins/tasklists/models/tasklist';

import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');
import SessionPlugin = require('../../../../src/plugins/sessions/index');
import TasklistPlugin = require('../../../../src/plugins/tasklists/index');

const apiUrl = '/tasklist';

const lab = exports.lab = Lab.script();
let server;

lab.before((done) => {
  console.log('before it all');
  const plugins = [EmitterPlugin, AuthPlugin, SessionPlugin, TasklistPlugin];
  server = new Hapi.Server();
  server.connection({ port: Config.get('/port/web') });
  server.register(plugins, (err) => {
    if (err) {
        return done(err);
    }

    server.initialize(done);
  });
});

lab.experiment('Tasklist Plugin - User logged In', () => {
  let token;
  let createdTasklistId;

  lab.before(done => {
    const request = {
      method: 'POST',
      url: '/auth/login',
      payload: {
        // Seed created test user
        email: 'tytan@gmail.com',
        password: 'password'
      }
    }

    server.inject(request, response => {
      token = response.result.token;
      done();
    })
  });

  lab.test('it should allow user to create tasklist', done => {
    const request = {
      method: 'POST',
      url: apiUrl,
      headers: {
        Authorization: token,
      },
      payload: {
        title: 'A list of tasks',
      },
    };

    server.inject(request, response => {
      const taskList = response.result;
      createdTasklistId = taskList.id;
      Chai.expect(taskList).to.be.instanceOf(Tasklist);
      Chai.expect(taskList.title).to.match(/A list of tasks/);
      done();
    });
  });

  lab.after(done => {
    Tasklist.query()
    .delete()
    .where('id', createdTasklistId)
    .then(result => {
      console.log('deleted test tasklist', result);
      done();
    });
  });
});

lab.experiment('Tasklist Plugin - User not logged in', () => {
  lab.test('it should not allow non user to create tasklist', done => {
    const request = {
      method: 'POST',
      url: apiUrl,
      payload: {
        title: 'A list of tasks not created',
      },
    };

    server.inject(request, response => {
      const taskList = response.result;
      Chai.expect(response.statusCode).to.equal(401);
      done();
    });
  })
});
  // lab.test('it should all', done => {
  //   const stubUser = {
  //     id: 1
  //   };

  //   server.events.emit('userLogin', stubUser);

  //   server.events.on('sessionCreated', () => {
  //     Session.query()
  //       .first()
  //       .where('userId', stubUser.id)
  //       .then(result => {
  //         Chai.expect(result).to.be.an.instanceof(Session);
  //         done();
  //       });
  //   })
  // });

  // lab.test('it should delete a session on user signout', done=> {
  //   const stubUser = {
  //     id: 1
  //   };

  //   server.events.emit('userLogout', stubUser);

  //   server.events.on('sessionDeleted', () => {
  //     Session.query()
  //       .first()
  //       .where('userId', stubUser.id)
  //       .then(result => {
  //         Chai.expect(result).to.not.be.an.instanceof(Session);
  //         done();
  //       });
  //   })

  // })