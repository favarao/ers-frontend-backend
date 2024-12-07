const Funcionario = require('../models/Funcionario.js');

class FuncionarioController {
    async inserir(req, res) {
        try {
            const { nome, matricula, funcao, habilitacao } = req.body;

            if (!nome || !matricula || !funcao || !habilitacao) {
                return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
            }

            const funcionario = new Funcionario(0, nome, matricula, funcao, habilitacao);
            const resultado = await funcionario.inserir();

            res.status(201).json({
                message: 'Funcionário registrado com sucesso',
                id: resultado
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar funcionário', error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id_usuario, nome, matricula, funcao, habilitacao } = req.body;

            if (!id_usuario || !nome || !matricula || !funcao || !habilitacao) {
                return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
            }

            const funcionario = new Funcionario(id_usuario, nome, matricula, funcao, habilitacao);
            const resultado = await funcionario.atualizar();

            res.status(200).json({
                message: 'Funcionário atualizado com sucesso!',
                afetados: resultado
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar funcionário', error: error.message });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;
            await Funcionario.excluir(id);
            res.status(200).json({ message: 'Funcionário excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir funcionário', error: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const funcionario = await Funcionario.buscarPorId(id);

            if (funcionario) {
                res.status(200).json(funcionario.toJSON());
            } else {
                res.status(404).json({ message: 'Funcionário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar funcionário', error: error.message });
        }
    }

    async buscarPorTermo(req, res) {
        try {
            const { termo } = req.params;
            const funcionarios = await Funcionario.buscarPorTermo(termo);
            res.status(200).json(funcionarios.map(func => func.toJSON()));
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar funcionários', error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const funcionarios = await Funcionario.listar();
            res.status(200).json(funcionarios.map(func => func.toJSON()));
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar funcionários', error: error.message });
        }
    }
}

module.exports = new FuncionarioController();
