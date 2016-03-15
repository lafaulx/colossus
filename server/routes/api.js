'use strict';

const routes = require('koa-router')();

let counter = 0;

routes
.get('/counter', function*() {
  this.body = counter++;
});

module.exports = routes;
