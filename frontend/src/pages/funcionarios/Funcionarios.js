import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const Funcionarios = ({ funcionarios, setFuncionarios, sincronizarStorage }) => {
  const handleDelete = (id) => {
    const updatedFuncionarios = funcionarios.filter((func) => func.id_usuario !== id);
    setFuncionarios(updatedFuncionarios);
    sincronizarStorage('funcionarios', updatedFuncionarios);
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

