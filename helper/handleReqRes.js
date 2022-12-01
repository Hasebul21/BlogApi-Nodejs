const http = require('http');
const url = require('url');
const handler = {};

handler.handleReqRes = (req, res) => {
   if (req.url == '/') {
      res.end('Hello this my welcome page');
   } else if (req.url == '/about') {
      res.end('This is my about page');
   } else {
      res.end('Page not found');
   }
};

module.exports = handler;
