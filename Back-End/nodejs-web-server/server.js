const http = require('http');

const requestListener = (request, response) => {
  try {
    const { method, url } = request || {};
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
  
    if (url === '/') {
      if (method === 'GET') {
        response.statusCode = 200;
        response.end(JSON.stringify({
          message: 'Ini adalah homepage'
        }));
      } else {
        response.statusCode = 400;
        response.end(JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`
        }));
      }
    } else if (url === '/about') {
      if (method === 'GET') {
        response.statusCode = 200;
        response.end(JSON.stringify({
          message: 'Halo! Ini adalah halaman about'
        }));
      } else if (method === 'POST') {
        let body = [];
  
        request.on('data', (chunk) => {
          body.push(chunk);
        })
  
        request.on('end', () => {
          body = Buffer.concat(body).toString();
          const { name } = body ? JSON.parse(body) : {};
          response.statusCode = 200;
          response.end(JSON.stringify({
            message: `Halo, ${name}! Ini adalah halaman about`
          }));  
        });
      } else {
        response.statusCode = 400;
        response.end(JSON.stringify({
          message: `Halaman ini tidak dapat diakses dengan ${method} request`
        }));
      }
    } else {
      response.statusCode = 404;
      response.end(JSON.stringify({
        message: 'Halaman tidak ditemukan!'
      }));
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
