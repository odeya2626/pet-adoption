exports.up = function (knex) {
  return knex.schema.createTable("savedPets", (table) => {
    table.increments("id").primary().notNullable();
    table.integer("userId").unsigned().notNullable();
    table.integer("petId").unsigned().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
