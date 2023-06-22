const express = require("express");
const UsersController = require("../controllers/usersControllers");
const {
  hashPwd,
  passwordsMatch,
  isNewUser,
  doesEmailExist,
  EmailChange,
  passwordMatchEmail,
  auth,
  PasswordChange,
  isAdmin,
} = require("../middleware/usersMiddleware");
const {
  signUpSchema,
  loginSchema,
  editUserSchema,
} = require("../schemas/userSchema");
const { validateBody } = require("../middleware/validateBody");

const router = express.Router();

router.route("/").get(auth, isAdmin, UsersController.getAllUsers);
router.post(
  "/signup",
  validateBody(signUpSchema),
  passwordsMatch,
  isNewUser,
  hashPwd,
  UsersController.signUp
);
router.post(
  "/login",
  validateBody(loginSchema),
  doesEmailExist,
  passwordMatchEmail,
  UsersController.login
);
router.delete("/signout", UsersController.signOut);

router
  .route("/:id")
  .get(auth, UsersController.getUserById)
  .put(
    validateBody(editUserSchema),
    auth,
    EmailChange,
    PasswordChange,
    UsersController.editUser
  );

router.get("/:id/full", auth, isAdmin, UsersController.getUserByIdFull);
router.put("/:id/admin", auth, isAdmin, UsersController.makeUserAdmin);

module.exports = router;
