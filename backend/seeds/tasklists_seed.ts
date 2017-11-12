import * as Knex from "knex";
import * as moment from 'moment';

const tableName = 'tasklists'

const rows = [
  {
    id: 1,
    user_id: 1,
    title: 'First List',
    created_at: moment().format('X'),
    updated_at: moment().format('X'),
    done: false,
  },
  {
    id: 2,
    user_id: 1,
    title: 'Second List',
    created_at: moment().format('X'),
    updated_at: moment().format('X'),
    done: false,
  },
];

exports.seed = function (knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            // Inserts seed entries
            return knex(tableName).insert(rows);
        });
};
