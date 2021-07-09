var express = require('express');
var router = express.Router();
var grammar = require('../controllers/grammar.controller');

router.get('/', grammar.findAll);


module.exports = router;