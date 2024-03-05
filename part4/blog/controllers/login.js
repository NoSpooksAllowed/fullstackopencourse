const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { AuthenticationError } = require("../utils/custom_errors");

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect =
      user === null
        ? false
        : await bcrypt.compare(password, String(user.passwordHash));

    if (!(user && isPasswordCorrect)) {
      throw new AuthenticationError("invalid username or password");
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, String(process.env.SECRET));

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
