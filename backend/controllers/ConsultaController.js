const Consulta = require('../models/Consulta.js');

class ConsultaController {

    async inserir(req, res) {
        try {
            const {id_consulta, id_paciente, id_tipo_consulta, id_usuario_agendador, id_usuario_medico, data_hora_consulta, data_agendamento, motivo, status} = req.body;

            if(!id_paciente || !id_tipo_consulta || !id_usuario_agendador || !id_usuario_medico || !data_hora_consulta || !data_agendamento || !motivo || !status)
                return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });

            const consulta = new Consulta(0, id_paciente, id_tipo_consulta, id_usuario_agendador, id_usuario_medico, data_hora_consulta, data_agendamento, motivo, status);

            const resultado = await consulta.inserir();

            res.status(201).json({
                message: 'Consulta inserida com sucesso',
                id: resultado
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
            
            if(!id_paciente || !id_tipo_consulta || !id_usuario_agendador || !id_usuario_medico || !data_hora_consulta || !data_agendamento || !motivo || !status)
                return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });

            const consulta = new Consulta(id_consulta, id_paciente, id_tipo_consulta, id_usuario_agendador, id_usuario_medico, data_hora_consulta, data_agendamento, motivo, status);

            const resultado = await consulta.atualizar();
            res.status(200).json({
                message: 'Consulta atualizada com sucesso',
                afetados: resultado
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
            if(consulta)
                res.status(200).json(consulta.toJSON());
            else
                res.status(404).json({ message: 'Consulta não encontrada' });
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
            res.status(200).json(consultas.map(consulta => consulta.toJSON()));
        } catch (error) {
            res.status(500).json({ 
                message: 'Erro ao listar consultas',
                error: error.message
            });
        }
    }

}

module.exports = new ConsultaController();