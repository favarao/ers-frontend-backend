const db = require('../config/db.js');

class ConsultaDAO {
    async inserir(dados) {
        const {
            id_paciente,
            id_tipo_consulta,
            id_usuario_agendador,
            id_usuario_medico,
            data_hora_consulta,
            data_agendamento,
            motivo,
            status
        }  = dados;

        const sql = `
            INSERT INTO consultas (
                id_paciente,
                id_tipo_consulta,
                id_usuario_agendador,
                id_usuario_medico,
                data_hora_consulta,
                data_agendamento,
                motivo,
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(sql, [
            id_paciente,
            id_tipo_consulta,
            id_usuario_agendador,
            id_usuario_medico,
            data_hora_consulta,
            data_agendamento,
            motivo,
            status
        ]);
        return result.insertId; 
    }

    async atualizar(dados) {
        const {
            id_consulta,
            id_paciente,
            id_tipo_consulta,
            id_usuario_agendador,
            id_usuario_medico,
            data_hora_consulta,
            data_agendamento,
            motivo,
            status
        } = dados;

        const sql = `
            UPDATE consultas
            SET 
                id_paciente = ?,
                id_tipo_consulta = ?,
                id_usuario_agendador = ?,
                id_usuario_medico = ?,
                data_hora_consulta = ?,
                data_agendamento = ?,
                motivo = ?,
                status = ?
            WHERE id_consulta = ?
        `;
        const [result] = await db.execute(sql, [
            id_paciente,
            id_tipo_consulta,
            id_usuario_agendador,
            id_usuario_medico,
            data_hora_consulta,
            data_agendamento,
            motivo,
            status,
            id_consulta
        ]);

        return result.affectedRows;
    }

    async excluir(id_consulta) {
        const sql = 'DELETE FROM consultas WHERE id_consulta = ?';
        const [result] = await db.execute(sql, [id_consulta]);
        return result.affectedRows; 
    }

    async buscar(id_consulta = null) {
        let sql, params;
        if (id_consulta) {
            sql = 'SELECT * FROM consultas WHERE id_consulta = ?';
            params = [id_consulta];
        } else {
            sql = 'SELECT * FROM consultas';
            params = [];
        }
        const [rows] = await db.execute(sql, params);
        return rows; 
    }
}

module.exports = new ConsultaDAO;