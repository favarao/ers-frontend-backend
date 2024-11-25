const express = require('express');
const ConsultaController = require('../controllers/ConsultaController.js');
const router = express.Router();

router.post('/', ConsultaController.inserir);
router.put('/', ConsultaController.atualizar);
router.get('/:id', ConsultaController.buscarPorId);
router.get('/', ConsultaController.listar);

module.exports = router;