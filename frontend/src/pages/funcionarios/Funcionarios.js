import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import FuncionarioServico from '../../services/FuncionarioServico';
import ConsultaServico from '../../services/ConsultaServico';
import { useState } from 'react';
const funcionarioServico = new FuncionarioServico();
const consultaServico = new ConsultaServico();

const Funcionarios = ({ funcionarios, setFuncionarios, setConsultas }) => {
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    funcionarioServico.deleteFuncionario(id).then(() => {
      funcionarioServico.getFuncionarios().then((funcionarios) => {
      setFuncionarios(funcionarios);
      consultaServico.getConsultas().then((consultas) => setConsultas(consultas));
      });
    });
  };

  const buscarFuncionarios = (termo) => {
    if(termo!=='') {
      funcionarioServico.getFuncionarioPorTermo(termo).then((funcionarios) => setFuncionarios(funcionarios));
    }
    else
    {
      funcionarioServico.getFuncionarios().then((funcionarios) => setFuncionarios(funcionarios));
    }
  };

  return (
    <div>
      <h1>Gerenciar Funcionários</h1>
      <Link to="/funcionarios/formulario" className="btn btn-primary mb-3">
        Adicionar Funcionário
      </Link>
      <input
        style={{ maxWidth: '400px', marginBottom: '10px' }}
        type="text"
        placeholder="Buscar funcionário"
        className="form-control"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          buscarFuncionarios(e.target.value);
        }}

      />
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

