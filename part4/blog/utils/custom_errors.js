class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class FieldLengthError extends Error {
  constructor(message) {
    super(message);
    this.name = "FieldLengthError";
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
  }
}

module.exports = {
  ValidationError,
  FieldLengthError,
  AuthenticationError,
  ForbiddenError,
};
