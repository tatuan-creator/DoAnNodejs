const express = require("express");
const router = express.Router();
const {
    register,
    loginUser,
    getUserList,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
} = require("../controllers/usercontroller");
const {authMiddleware, isAdmin} = require("../../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, getUser);
router.delete("/:id", deleteUser);
router.put("/:id", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.get("/", getUserList);


module.exports = router;