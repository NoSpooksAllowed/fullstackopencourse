const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

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
    response.status(401).send({ message: error.message });
  }
});

userRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({});

    response.status(200).json(users);
  } catch (error) {
    response.status(401).send({ message: error.message });
  }
});

module.exports = userRouter;
