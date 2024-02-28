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

class UniqueFieldError extends Error {
  constructor(message) {
    super(message);
    this.name = "UniqueFieldError";
  }
}

module.exports = {
  ValidationError,
  FieldLengthError,
  UniqueFieldError,
};
