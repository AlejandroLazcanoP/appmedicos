//src/routes/medicos.js
const express = require('express');
const router =express.Router();
const medicosController = require('../controllers/medicosController');

router.get('/', medicosController.list);
router.post('/add', medicosController.save);
router.get('/delete/:id', medicosController.delete);
router.get('/update/:id', medicosController.edit);
router.post('/update/:id', medicosController.update);
module.exports= router;