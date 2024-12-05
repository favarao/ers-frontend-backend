import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PacienteServico from '../../services/PacienteServico';
import ConsultaServico from '../../services/ConsultaServico';
const pacienteServico = new PacienteServico();
const consultaServico = new ConsultaServico();

const Pacientes = ({ pacientes, setPacientes, setConsultas }) => {
  const handleDelete = (id) => {
    pacienteServico.deletePaciente(id).then(() => {
      pacienteServico.getPacientes().then((pacientes) => {
        setPacientes(pacientes);
        consultaServico.getConsultas().then((consultas) => setConsultas(consultas));
      });
    });
  };

  return (
    <div>
      <h3>Gerenciar Pacientes</h3>
      <Button className='mt-3 mb-3' variant="primary" as={Link} to="/pacientes/formulario">
        Novo Paciente
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Benefício</th>
            <th>Plano de Saúde</th>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data Nasc.</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length === 0 ? (
            <tr>
              <td colSpan="5" className='text-center'>
                Nenhum Paciente cadastrado.
              </td>
            </tr>
          ) : (

            pacientes.map(paciente => {
              // const [data, hora] = paciente.nasc.split('T');
              return (
              <tr key={paciente.id_paciente}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.beneficio}</td>
                <td>{paciente.plan_saude}</td>
                <td>{paciente.nome}</td>
                <td>{paciente.sexo}</td>
                <td>
                  {paciente.nasc}
                  {/* {new Date(data).toLocaleDateString('pt-BR')} as {hora} */}
                  </td>
                <td>{paciente.tel}</td>
                <td>{paciente.end}</td>
                <td>
                  <Button
                    variant="warning"
                    as={Link}
                    to={`/pacientes/formulario/${paciente.id_paciente}`}
                  >
                    Editar
                  </Button>{' '}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(paciente.id_paciente)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            )})
          )}
        </tbody>
      </Table>
    </div >
  );
};

export default Pacientes;