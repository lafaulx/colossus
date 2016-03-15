'use strict';

const routes = require('koa-router')();

let counter = 0;

routes
.get('/counter', function *api() {
  this.body = counter;
})
.get('/counter/increment', function *api() {
  this.body = ++counter;
})
.get('/counter/decrement', function *api() {
  this.body = --counter;
});

module.exports = routes;
