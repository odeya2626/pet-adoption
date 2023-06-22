const errorObj = (code, message, next) => {
  const err = new Error(message);
  err.status = code;
  next(err);
};
module.exports = errorObj;
