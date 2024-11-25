const Consulta = require('../models/Consulta.js');

class ConsultaController {

    async inserir(req, res) {
        try {
            const {id_consulta, id_paciente, id_tipo_consulta, id_usuario_agendador, id_usuario_medico, data_hora_consulta, data_agendamento, motivo, status} = req.body;
            const consultaDados = {id_consulta, id_paciente, id_tipo_consulta, id_usuario_agendador, id_usuario_medico, data_hora_consulta, data_agendamento, motivo, status};
            // consulta = new Consulta(consultaDados);
            const consulta = new Consulta(consultaDados);
            consulta = await consulta.inserir(consultaDados);
            res.status(201).json({
                message: 'Consulta inserida com sucesso',
                data: consulta.json()
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Erro ao inserir consulta',
                error: error.message
            });
        }
    }

    async atualizar(req, res) {
        try{
            const{id_consulta, id_paciente, id_tipo_consulta, id_usuario_agendador, id_usuario_medico, data_hora_consulta, data_agendamento, motivo, status} = req.body;
            const consultaDados = {id_consulta, id_paciente, id_tipo_consulta, id_usuario_agendador, id_usuario_medico, data_hora_consulta, data_agendamento, motivo, status};
            const consulta = new Consulta(consultaDados);
            consulta = await consulta.atualizar(consultaDados);
            res.status(200).json({
                message: 'Consulta atualizada com sucesso',
                data: consulta.json()
            });
        }
        catch(error){
            res.status(500).json({
                message: 'Erro ao atualizar consulta',
                error: error.message
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;
            await Consulta.excluir(id);
            res.status(200).json({ message: 'Consulta excluída com sucesso' });
        } catch (error) {
            res.status(500).json({ 
                message: 'Erro ao excluir consulta',
                error: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const consulta = await Consulta.buscarPorId(id);
            res.status(200).json(consulta.json());
        } catch (error) {
            res.status(500).json({ 
                message: 'Erro ao buscar consulta',
                error: error.message
            });
        }
    }

    async listar(req, res) {
        try {
            const consultas = await Consulta.listar();
            res.status(200).json(consultas.map((consulta) => consulta.json()));
        } catch (error) {
            res.status(500).json({ 
                message: 'Erro ao listar consultas',
                error: error.message
            });
        }
    }

}

module.exports = new ConsultaController();