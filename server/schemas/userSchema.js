const signUpSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    confirmPassword: { type: "string" },
    phoneNumber: { type: "string", minLength: 10, maxLength: 10 },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmPassword",
    "phoneNumber",
  ],
  additionalProperties: false,
};

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const editUserSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    confirmPassword: { type: "string" },
    phoneNumber: { type: "string", minLength: 10 },
    bio: { type: "string" },
  },
  additionalProperties: false,
};

module.exports = { signUpSchema, loginSchema, editUserSchema };
