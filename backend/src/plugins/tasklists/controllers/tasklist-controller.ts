import Tasklist from '../models/tasklist';
import * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';
import * as moment from 'moment';

// export function getLocations(req, reply) {
//   let query = Location.query();

//   if(req.query.q) {
//     query = query.where('name', 'like', `%${req.query.q}%`);
//   } 

//   query.then(result => {
//     reply(result);
//   })
//   .catch(err => {
//     reply(Boom.wrap(err));
//   })
// }

export function addTasklist(req, reply) {
  const { title } = req.payload;
  const user_id = req.auth.credentials.id;
  Tasklist.query()
  .insert({
    title,
    user_id,
  })
  .then(result => {
    if(!result) throw Boom.serverUnavailable('Failed to add Tasklist')

    reply(result);
  })
  .catch(err => {
    console.log('error',err);
    reply(Boom.wrap(err));
  });
}

// export function updateLocation(req, reply) {
//   const { id } = req.params;
//   const {name} = req.payload;
//   Location.query()
//   .patch({
//     name
//   })
//   .where('id', id)
//   .then(result => {
//     if(result < 1) throw Boom.notFound('Location not found');

//     reply({
//       success: true
//     })
//   })
//   .catch(err => {
//     reply(Boom.wrap(err));
//   })
// }

// export function deleteLocation(req, reply) {
//   const { id } = req.params;

//   Location.query()
//   .delete()
//   .where('id', id)
//   .then(result => {
//     if(result < 1) throw Boom.notFound('Location not found');

//     reply({
//       success: true
//     })
//   })
//   .catch(err => {
//     reply(Boom.wrap(err));
//   });
// }