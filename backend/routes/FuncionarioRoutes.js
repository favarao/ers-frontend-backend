const express = require('express');
const FuncionarioController = require('../controllers/FuncionarioController.js');
const router = express.Router();

router.post('/', FuncionarioController.inserir);
router.put('/', FuncionarioController.atualizar);
router.get('/:id', FuncionarioController.buscarPorId);
router.get('/termo/:termo', FuncionarioController.buscarPorTermo);
router.get('/', FuncionarioController.listar);
router.delete('/:id', FuncionarioController.excluir);

module.exports = router;
