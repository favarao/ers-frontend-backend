import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Consultas = ({ consultas, pacientes, funcionarios, setConsultas, sincronizarStorage }) => {
  const excluirConsulta = (id) => {
    const novasConsultas = consultas.filter(consulta => consulta.id_consulta !== id);
    setConsultas(novasConsultas);
    sincronizarStorage('consultas', novasConsultas); // Sincroniza com o LocalStorage
  };
  
  return (
    <div>
      <h3>Lista de Consultas </h3>

      <Button className='mt-3' variant="primary" as={Link} to="/consultas/formulario">
        Nova Consulta
      </Button>
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
            const [data, hora] = consulta.data_hora_consulta.split('T');
            return (
              <tr key={consulta.id_consulta}>
              <td>{consulta.id_consulta}</td>
              <td>{pacientes.find(paciente => paciente.id_paciente == consulta.id_paciente)?.nome || 'Paciente não encontrado'}</td>
              <td>{funcionarios.find(funcionario => funcionario.id_usuario == consulta.id_usuario_medico)?.nome || 'Funcionário não encontrado'}</td>
              <td>{new Date(data).toLocaleDateString('pt-BR')} as {hora}</td>
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