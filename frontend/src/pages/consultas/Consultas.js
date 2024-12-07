import React from 'react';
import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConsultaServico from '../../services/ConsultaServico';
const consultaServico = new ConsultaServico();

const Consultas = ({ consultas, pacientes, funcionarios, setConsultas}) => {
  const [search, setSearch] = useState("");

  const excluirConsulta = (id) => {
    consultaServico.deleteConsulta(id).then(() => {
      consultaServico.getConsultas().then(consultas => setConsultas(consultas))});
  };

  const buscarConsultas = (termo) => {
    if(termo === '') {
      consultaServico.getConsultas().then((consultas) => setConsultas(consultas));
      return;
    }
    consultaServico.getConsultaPorTermo(termo).then((consultas) => setConsultas(consultas));
  };
  
  return (
    <div>
      <h3>Lista de Consultas </h3>
      <div className="d-flex justify-content-between align-items-center">
      <Button className='d-block' variant="primary" as={Link} to="/consultas/formulario">
        Nova Consulta
      </Button>

      <input
        style={{ maxWidth: '400px' }}
        type="text"
        placeholder="Buscar paciente, médico, motivo ou status"
        className="form-control"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value); // Atualiza o estado com o valor digitado
          buscarConsultas(e.target.value); // Chama a função para buscar no backend
        }}

      />
      
      </div>
      
      <Table striped bordered hover responsive className='mt-3'>
        <thead>
          <tr>
            <th>#</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Data/Hora</th>
            <th>Motivo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map(consulta => {
            const [data, hora] = consulta.data_hora_consulta.slice(0,16).split('T');
            return (
              <tr key={consulta.id_consulta}>
              <td>{consulta.id_consulta}</td>
              <td>{pacientes.find(paciente => paciente.id_paciente == consulta.id_paciente)?.nome || 'Paciente não encontrado'}</td>
              <td>{funcionarios.find(funcionario => funcionario.id_usuario == consulta.id_usuario_medico)?.nome || 'Funcionário não encontrado'}</td>
              <td>{data.split('-').reverse().join('/')} as {hora}</td>
              <td>{consulta.motivo}</td>
              <td>{consulta.status}</td>
              <td>
                <Button
                variant="warning"
                as={Link}
                to={`/consultas/formulario/${consulta.id_consulta}`}
                >
                Editar
                </Button>{' '}
                <Button
                variant="danger"
                onClick={() => excluirConsulta(consulta.id_consulta)}
                >
                Excluir
                </Button>
              </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

    </div>
  );
};

export default Consultas;