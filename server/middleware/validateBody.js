const Ajv = require("ajv");
const ajv = new Ajv();
const format = require("ajv-formats");
const errorObj = require("../utils/errorObj");
format(ajv);

const validateBody = (schema) => {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      errorObj(400, ajv.errors[0].message, next);
      return;
    }
    next();
  };
};
module.exports = { validateBody };
