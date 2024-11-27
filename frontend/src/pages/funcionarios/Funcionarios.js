import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import FuncionarioServico from '../../services/FuncionarioServico';
import ConsultaServico from '../../services/ConsultaServico';
const funcionarioServico = new FuncionarioServico();
const consultaServico = new ConsultaServico();

const Funcionarios = ({ funcionarios, setFuncionarios, setConsultas }) => {
  const handleDelete = (id) => {
    funcionarioServico.deleteFuncionario(id).then(() => {
      funcionarioServico.getFuncionarios().then((funcionarios) => {
      setFuncionarios(funcionarios);
      consultaServico.getConsultas().then((consultas) => setConsultas(consultas));
      });
    });
  };

  return (
    <div>
      <h1>Gerenciar Funcionários</h1>
      <Link to="/funcionarios/formulario" className="btn btn-primary mb-3">
        Adicionar Funcionário
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Matricula</th>
            <th>Função</th>
            <th>Habilitação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum funcionário cadastrado.
              </td>
            </tr>
          ) : (
            funcionarios.map((funcionario) => (
              <tr key={funcionario.id_usuario}>
                <td>{funcionario.id_usuario}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.matricula}</td>
                <td>{funcionario.funcao}</td>
                <td>{funcionario.habilitacao}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/funcionarios/formulario/${funcionario.id_usuario}`}
                    variant="warning"
                  >
                    Editar
                  </Button>
                  <Button
                  className='ms-2'
                    variant="danger"
                    onClick={() => handleDelete(funcionario.id_usuario)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Funcionarios;

