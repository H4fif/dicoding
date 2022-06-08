const books = require('../database/books');
const { validateRequired } = require('../utils');
const { NameUndefinedError, ReadPageError, NotFoundError } = require('../validation');

const updateBookController = (request, h) => {
  let statusCode = 200;
  let statusText = 'success';
  let responseMessage;

  try {
    const { bookId } = request?.params;
    const findBook = books?.findIndex(book => book?.id === bookId);
    const updatedAt = new Date().toISOString();

    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request?.payload || {};

    if (!validateRequired(bookId) || findBook === -1) {
      throw new NotFoundError('Gagal memperbarui buku. Id tidak ditemukan');
    } else if (!validateRequired(name)) {
      throw new NameUndefinedError('Gagal memperbarui buku. Mohon isi nama buku');
    } else if (readPage > pageCount) {
      throw new ReadPageError('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
    } else {

      books[findBook] = {
        ...books[findBook],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };

      responseMessage = 'Buku berhasil diperbarui';
    }
  } catch (error) {
    statusText = 'fail';
    responseMessage = error?.message;

    if (error instanceof NameUndefinedError || error instanceof ReadPageError) {
      statusCode = 400;
    } else if (error instanceof NotFoundError) {
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

module.exports = updateBookController;