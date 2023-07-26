const express = require("express");
const { registerUser,loginUser, logout, forgotPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSinglelUser, updateRole, deleteUser } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/me").get( isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSinglelUser).put(isAuthenticatedUser, authorizeRoles("admin"),updateRole).delete(isAuthenticatedUser, authorizeRoles("admin"),deleteUser);

module.exports = router;