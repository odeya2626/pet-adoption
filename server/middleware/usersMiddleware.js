const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/usersControllers");
require("dotenv").config();
const {
  getAllUsers,
  getUserByEmailModel,
  getUserByIdModel,
} = require("../models/usersModel");
const errorObj = require("../utils/errorObj");

const passwordsMatch = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    errorObj(400, "Passwords Do Not Match", next);
    return;
  }
  next();
};

const isNewUser = async (req, res, next) => {
  const found = await getUserByEmailModel(req.body.email);
  if (found) {
    errorObj(400, "User Already Exsits", next);
    return;
  }
  next();
};

const hashPwd = (req, res, next) => {
  try {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        errorObj(500, err.message, next);
        return;
      }
      req.body.password = hash;
      next();
    });
  } catch (err) {
    errorObj(400, err, next);
  }
};

const doesEmailExist = async (req, res, next) => {
  try {
    const user = await getUserByEmailModel(req.body.email);
    if (!user) {
      errorObj(400, "Email Not Found", next);
      return;
    }
    req.body.user = user;
    next();
  } catch (err) {
    errorObj(500, err, next);
  }
};

const passwordMatchEmail = async (req, res, next) => {
  try {
    const { user, password } = req.body;
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        errorObj(500, err, next);
      } else if (!result) {
        errorObj(400, "Incorrect Password", next);
      } else {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
          expiresIn: "12h",
        });
        res.cookie("token", token, {
          maxAge: 45000000,
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        next();
      }
    });
  } catch (err) {
    errorObj(500, err, next);
  }
};

const EmailChange = async (req, res, next) => {
  try {
    if (req.body.email) {
      const user = await getUserByIdModel(req.body.userId, next);
      if (user.email !== req.body.email) {
        const found = await getUserByEmailModel(req.body.email, next);
        if (found) {
          errorObj(400, "Email Already in Use", next);
          return;
        }
      }
    }
    next();
  } catch (err) {
    errorObj(500, err, next);
  }
};
const PasswordChange = async (req, res, next) => {
  try {
    if (req.body.password) {
      if (req.body.password !== req.body.confirmPassword) {
        errorObj(400, "Passwords Do Not Match", next);
        return;
      }
      const user = await getUserByIdModel(req.body.userId, next);
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          errorObj(500, err, next);
        } else if (result) {
          errorObj(400, "Password is the same", next);
        } else {
          hashPwd(req, res, next);
        }
      });
    } else {
      next();
    }
  } catch (err) {
    errorObj(500, err, next);
  }
};
const auth = (req, res, next) => {
  if (!req.cookies.token) {
    errorObj(401, "Token Required", next);
    return;
  }
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      errorObj(401, "Invalid Token", next);
      return;
    }
    if (decoded) {
      req.body.userId = decoded.id;
      next();
    }
  });
};
const isAdmin = async (req, res, next) => {
  try {
    const user = await getUserByIdModel(req.body.userId, next);
    if (user.isAdmin) {
      next();
    } else {
      errorObj(403, "Forbiden Resource", next);
    }
  } catch (err) {
    errorObj(500, err, next);
  }
};

module.exports = {
  passwordsMatch,
  isNewUser,
  hashPwd,
  doesEmailExist,
  passwordMatchEmail,
  EmailChange,
  auth,
  PasswordChange,
  isAdmin,
};
