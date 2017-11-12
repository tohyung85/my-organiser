import * as Knex from "knex";
import * as moment from 'moment';

const tableName = 'tasks'

const rows = [
  {
    id: 1,
    tasklist_id: 1,
    description: 'done task',
    created_at: moment().format('X'),
    updated_at: moment().format('X'),
    done: true,
  },
  {
    id: 2,
    tasklist_id: 1,
    description: 'undone task',
    created_at: moment().format('X'),
    updated_at: moment().format('X'),
    done: false,
  },
  {
    id: 3,
    tasklist_id: 2,
    description: 'task of another tasklist',
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
