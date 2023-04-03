const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../../config/jwtToken");

//register
const register = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists");
    }
});

//loginUser
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

//get all users
const getUserList = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

//get user by id
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const getUser = await User.findById(id);
      res.json({
        getUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

//delete user by id
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const deleteUser = await User.findByIdAndDelete(id);
      res.json({
        deleteUser,
      });
    } catch (error) {
      throw new Error(error);
    }
});

//Update user by id
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          firstName: req?.body?.firstName,
          lastName: req?.body?.lastName,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
        },
        {
          new: true,
        }
      );
      res.json(updateUser);
    } catch (error) {
      throw new Error(error);
    }
});

module.exports = { register, loginUser, getUserList, getUser, deleteUser, updateUser};



  