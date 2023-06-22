const dbConnection = require("../libs/knex");
const errorObj = require("../utils/errorObj");
const getAllUsersModel = async (offset, next) => {
  try {
    const users =
      offset === ""
        ? await dbConnection
            .from("users")
            .select(
              "id",
              "firstName",
              "lastName",
              "email",
              "phoneNumber",
              "isAdmin"
            )
        : await dbConnection
            .from("users")
            .select(
              "id",
              "firstName",
              "lastName",
              "email",
              "phoneNumber",
              "isAdmin"
            )
            .offset(offset)
            .limit(10)
            .orderBy("id", "asc");
    const total_count = await dbConnection.from("users").count();
    const data = {
      list: users,
      total_count: total_count[0]["count(*)"],
      offset: Number(offset),
    };
    return data;
  } catch (err) {
    errorObj(500, err, next);
  }
};
const getUserByIdModel = async (id, next) => {
  try {
    const [user] = await dbConnection.from("users").where({ id: id });
    return user;
  } catch (err) {
    errorObj(500, err, next);
  }
};
const getUserByEmailModel = async (email, next) => {
  try {
    const [user] = await dbConnection.from("users").where({ email: email });
    return user;
  } catch (err) {
    errorObj(500, err, next);
  }
};
const signUpModel = async (newUser, next) => {
  try {
    const [id] = await dbConnection.from("users").insert(newUser);
    return id;
  } catch (err) {
    errorObj(500, err, next);
  }
};
const editUserModel = async (dataToChange, next) => {
  try {
    const { userId, confirmPassword, ...rest } = dataToChange;
    const id = await dbConnection
      .from("users")
      .where({ id: dataToChange.userId })
      .update(rest);
    const editedUser = await getUserByIdModel(userId);
    const { password, ...restUser } = editedUser;
    return restUser;
  } catch (err) {
    errorObj(500, err, next);
  }
};
const makeUserAdminModel = async (id, isAdmin, next) => {
  try {
    const user = await dbConnection
      .from("users")
      .where({ id: id })
      .update({ isAdmin: isAdmin });
    return user;
  } catch (err) {
    errorObj(500, err, next);
  }
};

module.exports = {
  getAllUsersModel,
  getUserByIdModel,
  getUserByEmailModel,
  signUpModel,
  editUserModel,
  makeUserAdminModel,
};
