class ReadPageError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ReadPageError';
  }
}

module.exports = ReadPageError;