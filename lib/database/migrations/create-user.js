import { connection } from "../index.js";

/**
 * @param {typeof connection} knex
 */
export async function up (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').unique().notNullable();
    table.timestamp('name').notNullable();
    table.timestamp('notion_api_key').nullable();
    table.timestamp('notion_database_id').nullable();
    table.timestamp('telegram_number').nullable();
    table.timestamp('created_at').notNullable();
  });
}

/**
 *
 * @param {typeof connection} knex
 */
export async function down (knex) {
  return knex.schema.dropTable('users');
}