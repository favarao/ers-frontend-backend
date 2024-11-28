const PacienteDAO = require('../daos/PacienteDAO.js');

class Paciente {
    #id_paciente;
    #beneficio;
    #plan_saude;
    #nome;
    #sexo;
    #nasc;
    #tel;
    #end;

    constructor(
        id_paciente,
        beneficio,
        plan_saude,
        nome,
        sexo,
        nasc,
        tel,
        end
    ) {
        this.#id_paciente = id_paciente;
        this.#id_paciente = id_paciente;
        this.#beneficio = beneficio;
        this.#plan_saude = plan_saude;
        this.#nome = nome;
        this.#sexo = sexo;
        this.#nasc = nasc;
        this.#tel = tel;
        this.#end = end;
    }

    get id_paciente() {
        return this.#id_paciente;
    }

    get beneficio() {
        return this.#beneficio;

    }
    set beneficio(value) {
        this.#beneficio = value
    }

    get plan_saude() {
        return this.#plan_saude;

    }
    set plan_saude(value) {
        this.#plan_saude = value
    }

    get nome() {
        return this.#nome;

    }
    set nome(value) {
        this.#nome = value
    }

    get sexo() {
        return this.#sexo;

    }
    set sexo(value) {
        this.#sexo = value
    }

    get nasc() {
        return this.#nasc;

    }
    set nasc(value) {
        this.#nasc = value
    }

    get tel() {
        return this.#tel;

    }
    set tel(value) {
        this.#tel = value
    }

    get end() {
        return this.#end;

    }
    set end(value) {
        this.#end = value
    }


    toJSON() {
        return {
            id_paciente: this.#id_paciente,
            beneficio: this.#beneficio,
            plan_saude: this.#plan_saude,
            nome: this.#nome,
            sexo: this.#sexo,
            nasc: this.#nasc,
            tel: this.#tel,
            end: this.#end,
        };
    }

    async inserir() {
        return await PacienteDAO.inserir(this.toJSON());
    }

    async atualizar() {
        return await PacienteDAO.atualizar(this);
    }

    static async excluir(id) {
        return await PacienteDAO.excluir(id);
    }

    static async buscarPorId(id) {
        const [row] = await PacienteDAO.buscar(id);
        if (!row) return null;

        return new Paciente(row.id_paciente, row.beneficio, row.plan_saude, row.nome, row.sexo, row.nasc, row.tel, row.end);
    }

    static async listar() {
        const rows = await PacienteDAO.buscar();
        return rows.map(row => new Paciente(row.id_paciente, row.beneficio, row.plan_saude, row.nome, row.sexo, row.nasc, row.tel, row.end));
    }
}

module.exports = Paciente;
