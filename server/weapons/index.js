var express = require('express');
var controller = require('./weapons.controller.js')();
var router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.detail);
router.delete('/:id', controller.remove);
router.post('/', controller.save);

module.exports = router;