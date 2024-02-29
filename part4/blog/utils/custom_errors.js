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

module.exports = {
  ValidationError,
  FieldLengthError,
};
