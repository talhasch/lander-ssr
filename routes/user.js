const express = require('express');
const router = express.Router();
const blockstack = require('blockstack');
const request = require('request-promise');
const fs = require('fs');

const constants = require('../constants');

const style = fs.readFileSync('./public/stylesheets/style.css', 'utf-8');

router.get('/:user', async (req, res, next) => {
  const username = req.params.user;
  let fileUrl = null;

  try {
    fileUrl = await blockstack.getUserAppFileUrl(constants.userFile, username, constants.baseUrl);
  } catch (e) {
    res.status(404);
    next();
  }

  if (fileUrl) {
    request({uri: fileUrl, json: true}).then(data => {
      res.render('user', {constants, data, style, username});
    }).catch(() => {
      res.status(404);
      next();
    });
  }

});

module.exports = router;
