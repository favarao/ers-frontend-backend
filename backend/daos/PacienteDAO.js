const db = require('../config/db.js');

class PacienteDAO {
    async inserir(dados) {
        const { beneficio, plan_saude, nome, sexo, nasc, tel, end } = dados;
        const sql = `INSERT INTO pacientes (id_paciente, beneficio, plan_saude, nome, sexo, nasc, tel, end) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await db.execute(sql, [beneficio, plan_saude, nome, sexo, nasc, tel, end]);
        return result.insertId;
    }

    async atualizar(dados) {
        const { id_paciente, beneficio, plan_saude, nome, sexo, nasc, tel, end } = dados;
        const sql = `
            UPDATE pacientes 
            SET
                beneficio = ?,
                plan_saude = ?,
                nome = ?,
                sexo = ?,
                nasc = ?,
                tel = ?,
                end = ?
            WHERE id_paciente = ?`;

        const [result] = await db.execute(sql, [beneficio, plan_saude, nome, sexo, nasc, tel, end, id_paciente]);
        return result.affectedRows;
    }

    async excluir(id_usuario) {
        const sql = 'DELETE FROM pacientes WHERE id_paciente = ?';
        const [result] = await db.execute(sql, [id_paciente]);
        return result.affectedRows;
    }

    async buscar(id_paciente = null) {
        let sql, params;
        if (id_paciente) {
            sql = 'SELECT * FROM pacientes WHERE id_paciente = ?';
            params = [id_paciente];
        } else {
            sql = 'SELECT * FROM pacientes';
            params = [];
        }
        const [rows] = await db.execute(sql, params);
        return rows;
    }
}

module.exports = new PacienteDAO();
