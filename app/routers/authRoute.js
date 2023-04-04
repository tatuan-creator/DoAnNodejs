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
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    userCart,
    getUserCart,
    emptyCart
} = require("../controllers/usercontroller");
const {authMiddleware, isAdmin} = require("../../middlewares/authMiddleware");

router.post("/register", register);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.post("/login", loginUser);
router.post("/cart", authMiddleware, userCart);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, getUser);
router.delete("/:id", deleteUser);
router.put("/:id", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.get("/", getUserList);


module.exports = router;