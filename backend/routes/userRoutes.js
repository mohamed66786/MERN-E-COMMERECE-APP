const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middlewars/authUser");
const {
  createUser,
  loginUser,
  getUsers,
  deleteAllUsers,
  logoutUser
} = require("../controller/userController");
// route for regitsters

router.post("/create-user", createUser);
// route for login
router.post("/login-user", loginUser);
// route for load user
router.get("/getUser", isAuthenticated, getUsers);
// logout the user
router.get("/logout",logoutUser)
// route for deleting all users in database
router.delete("/deleteAll", deleteAllUsers);

module.exports = router;
