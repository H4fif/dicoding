const books = require('../database/books');
const { validateRequired } = require('../utils');
const { NotFoundError } = require('../validation');

const getBookDetailController = (request, h) => {
  let statusText = 'success';
  let statusMessage;
  let statusCode = 200;
  let data;

  try {
    const { bookId } = request?.params || {};
    const _books = books.find(book => book?.id === bookId);

    if (!validateRequired(bookId) || !validateRequired(_books)) {
      throw new NotFoundError('Buku tidak ditemukan');
    } else {
      data = { book: _books };
    }
  } catch (error) {
    statusText = 'fail';
    statusMessage = error?.message;

    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else {
      statusCode = 500;
    }
  }

  return h.response({
    status: statusText,
    message: statusMessage,
    data: data,
  }).code(statusCode);
};

module.exports = getBookDetailController;