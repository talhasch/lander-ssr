var express = require('express');
var router = express.Router();

const request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  request('https://landr.me', {headers: {'User-Agent': 'Lander'}}, function (error, response, body) {
    res.send(body);
  });
});

module.exports = router;
