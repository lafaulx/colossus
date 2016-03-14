'use strict';

const routes = require('koa-router')();
const nunjucks = require('nunjucks');
const path = require('path');

nunjucks.configure(path.join(__dirname, '../..', '/build'), {
  tags: {
    blockStart: '<%',
    blockEnd: '%>',
    variableStart: '%%',
    variableEnd: '%%',
    commentStart: '<#',
    commentEnd: '#>',
  },
});

routes
.get('*', function*() {
  nunjucks.render('index.html', {}, (err, data) => {
    this.body = data || err;
  });
});

module.exports = routes;
