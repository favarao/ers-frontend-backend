const ConsultaDAO = require('../daos/ConsultaDAO.js');

class Consulta {
    #id_consulta;
    #id_paciente;
    #id_tipo_consulta;
    #id_usuario_agendador;
    #id_usuario_medico;
    #data_hora_consulta;
    #data_agendamento;
    #motivo;
    #status;

    constructor(
        id_consulta,
        id_paciente,
        id_tipo_consulta,
        id_usuario_agendador,
        id_usuario_medico,
        data_hora_consulta,
        data_agendamento,
        motivo,
        status
    ) {
        this.#id_consulta = id_consulta;
        this.#id_paciente = id_paciente;
        this.#id_tipo_consulta = id_tipo_consulta;
        this.#id_usuario_agendador = id_usuario_agendador;
        this.#id_usuario_medico = id_usuario_medico;
        this.#data_hora_consulta = data_hora_consulta;
        this.#data_agendamento = data_agendamento;
        this.#motivo = motivo;
        this.#status = status;
    }

    get id_consulta() {
        return this.#id_consulta;
    }

    get id_paciente() {
        return this.#id_paciente;
    }

    get id_tipo_consulta() {
        return this.#id_tipo_consulta;
    }

    get id_usuario_agendador() {
        return this.#id_usuario_agendador;
    }

    get id_usuario_medico() {
        return this.#id_usuario_medico;
    }

    get data_hora_consulta() {
        return this.#data_hora_consulta;
    }

    get data_agendamento() {
        return this.#data_agendamento;
    }

    get motivo() {
        return this.#motivo;
    }

    get status() {
        return this.#status;
    }

    set id_paciente(value) {
        this.#id_paciente = value;
    }

    set id_tipo_consulta(value) {
        this.#id_tipo_consulta = value;
    }

    set id_usuario_agendador(value) {
        this.#id_usuario_agendador = value;
    }

    set id_usuario_medico(value) {
        this.#id_usuario_medico = value;
    }

    set data_hora_consulta(value) {
        this.#data_hora_consulta = value;
    }

    set data_agendamento(value) {
        this.#data_agendamento = value;
    }

    set motivo(value) {
        this.#motivo = value;
    }

    set status(value) {
        this.#status = value;
    }

    toJSON() {
        return {
            id_consulta: this.#id_consulta,
            id_paciente: this.#id_paciente,
            id_tipo_consulta: this.#id_tipo_consulta,
            id_usuario_agendador: this.#id_usuario_agendador,
            id_usuario_medico: this.#id_usuario_medico,
            data_hora_consulta: this.#data_hora_consulta,
            data_agendamento: this.#data_agendamento,
            motivo: this.#motivo,
            status: this.#status
        };
    }

    async inserir() {
        return await ConsultaDAO.inserir(this);
    }

    async atualizar() {
        return await ConsultaDAO.atualizar(this);
    }

    static async excluir(id){
        return await ConsultaDAO.excluir(id);
    }

    static async buscarPorId(id) {
        const [row] = await ConsultaDAO.buscar(id);
        if (!row)
            return null;

        const consulta = new Consulta(row.id_consulta, row.id_paciente, row.id_tipo_consulta, row.id_usuario_agendador, row.id_usuario_medico, row.data_hora_consulta, row.data_agendamento, row.motivo, row.status);
        return consulta;
    }

    static async buscarPorTermo(termo) {
        const rows = await ConsultaDAO.buscarPorTermo(termo);
        return rows.map(row => new Consulta(row.id_consulta, row.id_paciente, row.id_tipo_consulta, row.id_usuario_agendador, row.id_usuario_medico, row.data_hora_consulta, row.data_agendamento, row.motivo, row.status));
    }

    static async listar() {
        const rows = await ConsultaDAO.buscar();
        return rows.map(row => new Consulta(row.id_consulta, row.id_paciente, row.id_tipo_consulta, row.id_usuario_agendador, row.id_usuario_medico, row.data_hora_consulta, row.data_agendamento, row.motivo, row.status));
    }
}

module.exports = Consulta;