const http = require('http');

const requestListener = (request, response) => {
  try {
    const { method, url } = request || {};
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
  
    if (url === '/') {
      if (method === 'GET') {
        response.statusCode = 200;
        response.end('<h1>Ini adalah homepage</h1>');
      } else {
        response.statusCode = 400;
        response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
      }
    } else if (url === '/about') {
      if (method === 'GET') {
        response.statusCode = 200;
        response.end('<h1>Halo! Ini adalah halaman about</h1>');
      } else if (method === 'POST') {
        let body = [];
  
        request.on('data', (chunk) => {
          body.push(chunk);
        })
  
        request.on('end', () => {
          body = Buffer.concat(body).toString();
          const { name } = body ? JSON.parse(body) : {};
          response.statusCode = 200;
          response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
        });
      } else {
        response.statusCode = 400;
        response.end(`<h1>Halaman ini tidak dapat diakses dengan ${method} request</h1>`);
      }
    } else {
      response.statusCode = 404;
      response.end('<h1>Halaman tidak ditemukan!</h1>');
    }
  } catch (error) {
    response.statusCode = 500;
    response.end(error);
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
