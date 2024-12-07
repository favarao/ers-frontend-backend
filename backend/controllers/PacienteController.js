const Paciente = require('../models/Paciente.js');

class PacienteController {
    async inserir(req, res) {
        try {
            const { id_paciente, beneficio, plan_saude, nome, sexo, nasc, tel, end } = req.body;

            if (!beneficio || !plan_saude || !nome || !sexo || !nasc || !tel || !end) {
                return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
            }

            const paciente = new Paciente(0, beneficio, plan_saude, nome, sexo, nasc, tel, end);
            const resultado = await paciente.inserir();

            res.status(201).json({
                message: 'Paciente registrado com sucesso',
                id: resultado
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar paciente', error: error });
        }
    }

    async atualizar(req, res) {
        try {
            const {id_paciente, beneficio, plan_saude, nome, sexo, nasc, tel, end} = req.body;

            if (!id_paciente || !beneficio || !plan_saude || !nome || !sexo || !nasc || !tel || !end) {
                return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
            }

            const paciente = new Paciente(id_paciente, beneficio, plan_saude, nome, sexo, nasc, tel, end);
            
            const resultado = await paciente.atualizar();

            res.status(200).json({
                message: 'Paciente atualizado com sucesso!',
                afetados: resultado
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar paciente', error: error.message });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;
            await Paciente.excluir(id);
            res.status(200).json({ message: 'Paciente excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir Paciente', error: error });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const paciente = await Paciente.buscarPorId(id);

            if (paciente) {
                res.status(200).json(paciente.toJSON());
            } else {
                res.status(404).json({ message: 'Paciente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar paciente', error: error.message });
        }
    }

    async buscarPorTermo(req, res) {
        try {
            const { termo } = req.params;
            const pacientes = await Paciente.buscarPorTermo(termo);
            res.status(200).json(pacientes.map(paci => paci.toJSON()));
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar pacientes', error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const pacientes = await Paciente.listar();
            res.status(200).json(pacientes.map(paci => paci.toJSON()));
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar pacientes', error: error.message });
        }
    }
}

module.exports = new PacienteController();
