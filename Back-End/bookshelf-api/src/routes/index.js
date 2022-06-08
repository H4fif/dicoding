const {
  addBookController,
  getBookController,
  getBookDetailController,
  updateBookController,
  deleteBookController,
} = require('../controller');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookController,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBookController,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookDetailController,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookController,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookController,
  },
];

module.exports = routes;
