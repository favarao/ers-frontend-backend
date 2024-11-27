const FuncionarioDAO = require('../daos/FuncionarioDAO.js');

class Funcionario {
    #id_usuario;
    #nome;
    #matricula;
    #funcao;
    #habilitacao;

    constructor(id_usuario, nome, matricula, funcao, habilitacao) {
        this.#id_usuario = id_usuario;
        this.#nome = nome;
        this.#matricula = matricula;
        this.#funcao = funcao;
        this.#habilitacao = habilitacao;
    }

    get id_usuario() {
        return this.#id_usuario;
    }

    get nome() {
        return this.#nome;
    }

    get matricula() {
        return this.#matricula;
    }

    get funcao() {
        return this.#funcao;
    }

    get habilitacao() {
        return this.#habilitacao;
    }

    toJSON() {
        return {
            id_usuario: this.#id_usuario,
            nome: this.#nome,
            matricula: this.#matricula,
            funcao: this.#funcao,
            habilitacao: this.#habilitacao
        };
    }

    async inserir() {
        return await FuncionarioDAO.inserir(this.toJSON());
    }

    async atualizar() {
        return await FuncionarioDAO.atualizar(this);
    }

    static async excluir(id) {
        return await FuncionarioDAO.excluir(id);
    }

    static async buscarPorId(id) {
        const [row] = await FuncionarioDAO.buscar(id);
        if (!row) return null;

        return new Funcionario(row.id_usuario, row.nome, row.matricula, row.funcao, row.habilitacao);
    }

    static async listar() {
        const rows = await FuncionarioDAO.buscar();
        return rows.map(row => new Funcionario(row.id_usuario, row.nome, row.matricula, row.funcao, row.habilitacao));
    }
}

module.exports = Funcionario;
