const errorObj = require("../utils/errorObj");

const convertTypesBack = (req, res, next) => {
  const { ownerId, height, weight, hypoallergenic, ...rest } = req.body;
  req.body = {
    ownerId: Number(ownerId) ? Number(ownerId) : null,
    height: Number(height),
    weight: Number(weight),
    hypoallergenic: hypoallergenic === "true" ? true : false,
    ...rest,
  };
  next();
};

const statusNotAvailable = async (req, res, next) => {
  if (req.body.status && req.body.status !== "Available") {
    if (!req.body.ownerId) {
      errorObj(400, "Pet must have an owner to be adopted or fostered", next);
      return;
    }
  }
  next();
};

module.exports = { convertTypesBack, statusNotAvailable };
