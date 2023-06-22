exports.up = function (knex) {
  return knex.schema.createTable("pets", (table) => {
    table.increments("id").primary().notNullable();
    table.string("type").notNullable();
    table.string("name").notNullable();
    table
      .enum("status", ["Available", "Fostered", "Adopted"])
      .defaultTo("Available");
    table.string("img").notNullable();
    table.float("height").notNullable();
    table.float("weight").notNullable();
    table.string("color").notNullable();
    table.text("bio").defaultTo(null);
    table.boolean("hypoallergenic").defaultTo(false).notNullable();
    table.string("dietary").notNullable();
    table.string("breed").notNullable();
    table.integer("ownerId").unsigned().defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pets");
};
