//src/routes/especialidad.js
const express = require('express');
const router =express.Router();
const especialidadController = require('../controllers/especialidadController');

router.get('/',especialidadController.list);
router.post('/add',especialidadController.save);
router.get('/delete/:id',especialidadController.delete);
router.get('/update/:id', especialidadController.edit);
router.post('/update/:id', especialidadController.update);
module.exports= router;