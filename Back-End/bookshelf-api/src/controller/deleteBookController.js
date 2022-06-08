const books = require('../database/books');
const { validateRequired } = require('../utils');
const { NotFoundError } = require('../validation')

const deleteBookController = (request, h) => {
  let statusText = 'success';
  let statusCode = 200;
  let responseMessage = 'Buku berhasil dihapus';

  try {
    const { bookId } = request?.params || {};
    const findBook = books?.findIndex(book => book?.id === bookId);

    if (!validateRequired(bookId) || findBook === -1) {
      throw new NotFoundError('Buku gagal dihapus. Id tidak ditemukan');
    } else {
      books.splice(findBook, 1);
    }
  } catch (error) {
    statusText = 'fail';
    responseMessage = error?.message;

    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else {
      statusCode = 500;
    }
  }

  return h.response({
    status: statusText,
    message: responseMessage,
  }).code(statusCode);
};

module.exports = deleteBookController;