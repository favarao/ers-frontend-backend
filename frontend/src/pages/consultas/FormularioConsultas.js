import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import InputMask from 'react-input-mask'

const FormularioConsultas = ({ consultas, pacientes, funcionarios, setConsultas, sincronizarStorage }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id_consulta: '',
    id_paciente: '',
    id_usuario_medico: '',
    data_hora_consulta: '',
    data_agendamento: '',
    motivo: '',
    status: 'Agendada'
  });

  useEffect(() => {
    if (id) {
      const consultaExistente = consultas.find(consulta => consulta.id_consulta === parseInt(id));
      if (consultaExistente) {
        setForm(consultaExistente);
      }
    }
  }, [id, consultas]);

  const [error, setError] = useState('');

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Função para validar o formulário
  const validateForm = () => {
    if (!form.id_paciente || !form.id_usuario_medico || !form.data_hora_consulta || !form.data_agendamento || !form.motivo) {
      setError('Todos os campos obrigatórios devem ser preenchidos!');
      return false;
    }
    const dataAgendamentoParts = form.data_agendamento.split('/');
    const dataAgendamentoDate = new Date(`${dataAgendamentoParts[2]}-${dataAgendamentoParts[1]}-${dataAgendamentoParts[0]}`);
    if (isNaN(dataAgendamentoDate.getTime())) {
      setError('Data de agendamento inválida!');
      return false;
    }
    setError('');
    return true;
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando o formulário antes de submeter
    if (!validateForm()) return;

    if (form.id_consulta!== '') {
      const index = consultas.findIndex(consulta => consulta.id_consulta === form.id_consulta);
      if (index !== -1) {
        consultas[index] = form;
        setConsultas([...consultas]);
        sincronizarStorage('consultas', consultas);
      }
    }
    else
    {
      form.id_consulta = consultas.length+1;
      const novaConsulta = {
        ...form
      };


    const novasConsultas = [...consultas, novaConsulta];
    setConsultas(novasConsultas);
    sincronizarStorage('consultas', novasConsultas); // Sincroniza com o LocalStorage
  }

    navigate('/consultas');
  };

  return (
    <div>
      <h3>Cadastrar Nova Consulta</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="hidden"
          name="id_consulta"
          value={form.id_consulta}
        />
        <Form.Group className="mb-3" controlId="formPaciente">
          <Form.Label>Paciente</Form.Label>
          <Form.Select
            name="id_paciente"
            value={form.id_paciente}
            onChange={handleInputChange}
          >
            <option value="">Selecione um paciente</option>
            {pacientes.map(paciente => (
              <option key={paciente.id_paciente} value={paciente.id_paciente}>
                {paciente.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMedico">
          <Form.Label>Médico</Form.Label>
          <Form.Select
            name="id_usuario_medico"
            value={form.id_usuario_medico}
            onChange={handleInputChange}
          >
            <option value="">Selecione um médico</option>
            {funcionarios.map(funcionario => (
              <option key={funcionario.id_usuario} value={funcionario.id_usuario}>
                {funcionario.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDataHora">
          <Form.Label>Data e Hora da Consulta</Form.Label>
          <Form.Control
            type="datetime-local"
            name="data_hora_consulta"
            max="9999-12-31T23:59"
            value={form.data_hora_consulta}
            onChange={handleInputChange}
            
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDataAgendamento">
          <Form.Label>Data do Agendamento</Form.Label>
          <InputMask
            mask="99/99/9999"
            placeholder="DD/MM/AAAA"
            onChange={handleInputChange}
            name="data_agendamento"
            value={form.data_agendamento}
            required
        >
            {(inputProps) => (
                <Form.Control
                    {...inputProps}
                    type="text"
                    isInvalid={false} // Altere para true para exibir um erro
                />
            )}
        </InputMask>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMotivo">
          <Form.Label>Motivo</Form.Label>
          <Form.Control
            as="textarea"
            name="motivo"
            value={form.motivo}
            onChange={handleInputChange}
            
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={form.status}
            onChange={handleInputChange}
          >
            <option value="Agendada">Agendada</option>
            <option value="Cancelada">Cancelada</option>
            <option value="Concluída">Concluída</option>
          </Form.Select>
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="success" type="submit">
          Salvar
        </Button>
      </Form>
    </div>
  );
};

export default FormularioConsultas;