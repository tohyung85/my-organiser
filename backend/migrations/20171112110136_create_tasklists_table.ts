import * as Knex from "knex";

const tableName = 'tasklists'

exports.up = function (knex: Knex): Promise<any> {
  return knex
  .schema
  .createTable(tableName, (table) => {
    // Primary key
    table.increments().primary().notNullable().unique();

    // Belongs to user
    table.integer('user_id', 50).notNullable();

    table.string('title', 128).notNullable();
    table.boolean('done').notNullable().defaultTo(false);

    table.integer('created_at', 11).notNullable();
    table.integer('updated_at', 11).notNullable();
  }); 
    
};

exports.down = function (knex: Knex): Promise<any> {
  return knex
    .schema
      .dropTableIfExists(tableName);
};
