// publicidad.js

const express = require('express');
const router = express.Router();
const publicidadController = require('../controllers/publicidadController');

router.get('/', publicidadController.list);

module.exports = router;

