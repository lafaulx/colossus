'use strict';

const routes = require('koa-router')();

let counter = 0;

routes.get('/counter', function *api() {
  this.body = counter++;
});

module.exports = routes;
