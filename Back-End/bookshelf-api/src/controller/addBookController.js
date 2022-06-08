const { nanoid } = require('nanoid');
const { validateRequired, validateNumeric } = require('../utils');
const books = require('../database/books');
const { NameUndefinedError, ReadPageError } = require('../validation');

const addBookController = (request, h) => {
  let response;
  let statusCode = 201;

  try {
    let {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    } = request?.payload || {};

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;
    name = name?.trim();

    if (!validateRequired(name)) {
      throw new NameUndefinedError('Gagal menambahkan buku. Mohon isi nama buku');
    } else if (readPage > pageCount) {
      throw new ReadPageError('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
    } else {
      const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt,
      };

      books.push(newBook);

      const isSuccess = books.find(book => book?.id === id);

      if (isSuccess) {
        response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: { bookId: id },
        });
      } else {
        throw new Error('Buku gagal ditambahkan');
      }
    }
  } catch (error) {
    if (error instanceof NameUndefinedError || error instanceof ReadPageError) {
      response = h.response({
        status: 'fail', 
        message: error?.message,
      });
  
      statusCode = 400;
    } else {
      response = h.response({
        status: 'fail', 
        message: 'Buku gagal ditambahkan',
      });
  
      statusCode = 500;
    }
  }

  response.code(statusCode);
  return response;
};

module.exports = addBookController;