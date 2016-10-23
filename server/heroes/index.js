var express = require('express');
var controller = require('./heroes.controller.js')();
var router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.detail);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;