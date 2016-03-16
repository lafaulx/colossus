'use strict';

const express = require('express');
const router = express.Router();

let counter = 0;

router.get('/counter', function(req, res) {
  res.send({ counter });
});

router.get('/counter/increment', function(req, res) {
  res.send({ counter: ++counter });
});

router.get('/counter/decrement', function(req, res) {
  res.send({ counter: --counter });
});

module.exports = router;