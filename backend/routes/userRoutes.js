const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middlewars/authUser");
const {
  createUser,
  loginUser,
  getUsers,
  deleteAllUsers,
  logoutUser,
  updateUserInformation,
  updateUserAdress,
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
// update user information
router.put("/update-user-info",updateUserInformation);
// update user adress
router.put("/user/update-user-addresses",updateUserAdress)
module.exports = router;
