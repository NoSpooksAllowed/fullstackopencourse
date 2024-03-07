const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { ForbiddenError } = require("../utils/custom_errors");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, String(process.env.SECRET));

    if (!decodedToken.id) {
      throw new jwt.JsonWebTokenError("token invalid");
    }

    const user = await User.findById(decodedToken.id);

    if (user === null) {
      throw new Error("User not found");
    }

    request.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const checkUserBlogOwnership = async (request, response, next) => {
  try {
    const ownsBlog = request.user.blogs.some((blog) =>
      blog.equals(request.params.id)
    );

    if (!ownsBlog) {
      throw new ForbiddenError("Perrmision denied to perform this operation");
    }

    next();
  } catch (error) {
    next(error);
  }
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error.name === "FieldLengthError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "UniqueFieldError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    return response.status(400).json({ error: "username must be unique" });
  } else if (error.name === "AuthenticationError") {
    return response.status(401).json({
      error: "invalid username or password",
    });
  } else if (error.name === "ForbiddenError") {
    return response.status(403).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  checkUserBlogOwnership,
};
