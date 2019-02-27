var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./index/index', { title: 'Blockchain Monopoly' });
});

// GET about page
router.get('/about', function(req, res, next) {
  res.render('./index/about', { title: 'Blockchain Monopoly' });
});

router.get('/contact', function(req, res, next) {
  res.render('./index/contact', { title: 'Blockchain Monopoly' });
});

module.exports = router;
