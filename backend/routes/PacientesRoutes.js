const express = require('express');
const PacienteController = require('../controllers/PacienteController.js');
const router = express.Router();

router.post('/', PacienteController.inserir);
router.put('/', PacienteController.atualizar);
router.get('/:id', PacienteController.buscarPorId);
router.get('/', PacienteController.listar);
router.get('/termo/:termo', PacienteController.buscarPorTermo);
router.delete('/:id', PacienteController.excluir);

module.exports = router;
