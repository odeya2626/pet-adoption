const petSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    status: {
      type: "string",
      oneOf: [
        { enum: ["Available"] },
        { enum: ["Fostered"] },
        { enum: ["Adopted"] },
      ],
    },
    height: { type: "number" },
    weight: { type: "number" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergenic: { type: "boolean" },
    dietary: { type: "string" },
    breed: { type: "string" },
    img: { type: "string" },
    ownerId: { oneOf: [{ type: "number" }, { type: "null" }] },
  },
  required: [
    "type",
    "name",
    "img",
    "height",
    "weight",
    "color",
    "hypoallergenic",
    "dietary",
    "breed",
  ],
  additionalProperties: false,
};
module.exports = { petSchema };
