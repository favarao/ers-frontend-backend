const db = require('../config/db.js');

class FuncionarioDAO {
    async inserir(dados) {
        const { nome, matricula, funcao, habilitacao } = dados;
        const sql = `INSERT INTO usuarios (nome, matricula, funcao, habilitacao) VALUES (?, ?, ?, ?)`;

        const [result] = await db.execute(sql, [nome, matricula, funcao, habilitacao]);
        return result.insertId;
    }

    async atualizar(dados) {
        const { id_usuario, nome, matricula, funcao, habilitacao } = dados;
        const sql = `
            UPDATE usuarios 
            SET nome = ?, matricula = ?, funcao = ?, habilitacao = ? 
            WHERE id_usuario = ?`;

        const [result] = await db.execute(sql, [nome, matricula, funcao, habilitacao, id_usuario]);
        return result.affectedRows;
    }

    async excluir(id_usuario) {
        const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
        const [result] = await db.execute(sql, [id_usuario]);
        return result.affectedRows;
    }

    async buscar(id_usuario = null) {
        let sql, params;
        if (id_usuario) {
            sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
            params = [id_usuario];
        } else {
            sql = 'SELECT * FROM usuarios';
            params = [];
        }
        const [rows] = await db.execute(sql, params);
        return rows;
    }
}

module.exports = new FuncionarioDAO();
