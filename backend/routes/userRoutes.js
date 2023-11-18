const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewars/authUser");
const {
  createUser,
  loginUser,
  getUsers,
  deleteAllUsers,
} = require("../controller/userController");
// route for regitsters

router.post("/create-user", createUser);
// route for login
router.post("/login-user", loginUser);
// route for load user
router.get("/getUser", isAuthenticated, getUsers);
// route for deleting all users in database
router.delete("/deleteAll", deleteAllUsers);

module.exports = router;
