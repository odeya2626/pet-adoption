exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary().notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("phoneNumber").notNullable();
    table.text("bio").defaultTo(null);
    table.boolean("isAdmin").defaultTo(false).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
