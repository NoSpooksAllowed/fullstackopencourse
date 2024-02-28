const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");
const {
  ValidationError,
  FieldLengthError,
  UniqueFieldError,
} = require("../utils/custom_errors");

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (!password) {
      throw new ValidationError("No field: password");
    }

    if (!username) {
      throw new ValidationError("No field: username");
    }

    if (!name) {
      throw new ValidationError("No field: name");
    }

    if (password.length < 4) {
      throw new FieldLengthError("password should be more than 3 symbols long");
    }

    if (username.length < 4) {
      throw new FieldLengthError("username should be more than 3 symbols long");
    }

    const userObject = await User.findOne({ username: username }).exec();
    if (userObject) {
      throw new UniqueFieldError("username should be unique");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    delete savedUser.passwordHash;

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});

    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
