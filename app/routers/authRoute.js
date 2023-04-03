const express = require("express");
const router = express.Router();
const {
    register,
    loginUser,
    getUserList,
    getUser,
    deleteUser,
    updateUser
} = require("../controllers/usercontroller");

router.get('/', (req, res) => {
    res.json({"message":"user"});
});

router.post("/register", register);
router.post("/login", loginUser);

router.get("/user-list", getUserList);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


module.exports = router;