const { getUserPetsModel } = require("../models/petsModel");
const {
  getAllUsersModel,
  signUpModel,
  editUserModel,
  getUserByIdModel,
  makeUserAdminModel,
} = require("../models/usersModel");
const errorObj = require("../utils/errorObj");

const signUp = async (req, res, next) => {
  try {
    const { password, firstName, lastName, phoneNumber, email } = req.body;
    const newUser = { password, firstName, lastName, phoneNumber, email };
    const userId = await signUpModel(newUser, next);
    res.send({ id: userId, ...newUser });
  } catch (err) {
    errorObj(500, err, next);
  }
};
const login = (req, res, next) => {
  try {
    const { user } = req.body;
    const currentUser = {
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      bio: user.bio,
    };
    res.send({ user: currentUser });
  } catch (err) {
    errorObj(500, err, next);
  }
};
const signOut = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.send("User Signed Out");
  } catch (err) {
    errorObj(500, err, next);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const { offset } = req.query;
    const users = await getAllUsersModel(offset);
    res.send(users);
  } catch (err) {
    errorObj(500, err, next);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdModel(id, next);
    res.send(user);
  } catch (err) {
    errorObj(400, "User Is Not Found", next);
  }
};
const getUserByIdFull = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdModel(id, next);
    const { password, ...rest } = user;
    const pets = await getUserPetsModel(id, next);
    res.send({ ...rest, pets });
  } catch (err) {
    errorObj(500, err, next);
  }
};

const editUser = async (req, res, next) => {
  try {
    const editedUser = await editUserModel(req.body, next);
    res.send(editedUser);
  } catch (err) {
    errorObj(400, err, next);
  }
};
const makeUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;
    const user = await makeUserAdminModel(id, isAdmin, next);
    res.send({ isAdmin: user });
  } catch (err) {
    errorObj(400, err, next);
  }
};
module.exports = {
  signUp,
  login,
  signOut,
  getAllUsers,
  getUserById,
  getUserByIdFull,
  editUser,
  makeUserAdmin,
};
