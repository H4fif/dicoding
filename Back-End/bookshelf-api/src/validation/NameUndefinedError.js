class NameUndefinedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NameUndefinedError';
  }
}

module.exports = NameUndefinedError;