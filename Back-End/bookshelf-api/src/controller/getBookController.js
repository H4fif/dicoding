const books = require('../database/books');
const { validateRequired, validateNumeric } = require('../utils');

const getBookController = (request, h) => {
  let response = {
    statusText: 'success',
    statusCode: 200,
  }

  const { name, reading, finished } = request?.query || {};

  let getBooks = books;

  if (validateRequired(name))
    getBooks = books?.filter((book) => {
      return book?.name?.toLowerCase().includes(name?.toLowerCase());
    });

  if (validateNumeric(reading))
    getBooks = books?.filter((book) => {
      return book?.reading == reading;
    });

  if (validateNumeric(finished))
    getBooks = books?.filter((book) => {
      return book?.finished == finished;
    });

  try {
    response.data = getBooks.map(book => ({
      id: book?.id,
      name: book?.name,
      publisher: book?.publisher,
    }));
  } catch (error) {
    response = {
      statusCode: 500,
      statusText: 'fail',
    }
  }

  return h.response({
    status: response?.statusText,
    data: {
      books: response.data,
    }
  }).code(response?.statusCode);
};

module.exports = getBookController;