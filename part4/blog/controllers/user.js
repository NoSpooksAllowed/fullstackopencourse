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

    response.status(201).json(savedUser);
  } catch (error) {
    response.status(401).send({ message: error.message });
  }
});

userRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({}).populate("blogs", {
      content: 1,
      important: 1,
    });
    response.json(users);
  } catch (error) {
    response.status(401).send({ message: error.message });
  }
});

module.exports = userRouter;
