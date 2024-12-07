const express = require('express');
const ConsultaController = require('../controllers/ConsultaController.js');
const router = express.Router();

router.post('/', ConsultaController.inserir);
router.put('/', ConsultaController.atualizar);
router.get('/:id', ConsultaController.buscarPorId);
router.get('/termo/:termo', ConsultaController.buscarPorTermo);
router.get('/', ConsultaController.listar);
router.delete('/:id', ConsultaController.excluir);

module.exports = router;