import * as Knex from "knex";

const tableName = 'tasks'

exports.up = function (knex: Knex): Promise<any> {
  return knex
  .schema
  .createTable(tableName, (table) => {
    // Primary key
    table.increments().primary().notNullable().unique();

    // Belongs to tasklist 
    table.integer('tasklist_id', 50).notNullable();

    table.string('description', 128).notNullable();
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
