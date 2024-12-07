import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import InputMask from 'react-input-mask'
import ConsultaServico from '../../services/ConsultaServico';
const consultaServico = new ConsultaServico();

const vazio = {
  id_consulta: 0,
  id_paciente: '',
  id_usuario_medico: '',
  id_tipo_consulta: 1,
  id_usuario_agendador: 1,
  data_hora_consulta: '',
  data_agendamento: '',
  motivo: '',
  status: 'Agendada',
};

const FormularioConsultas = ({ consultas, pacientes, funcionarios, setConsultas }) => {
  const { id } = useParams();

  const [form, setForm] = useState(vazio);

  useEffect(() => {
    const carregarConsulta = async () => {
      if (id) {
        try {
          const consulta = await consultaServico.getConsulta(id);
          if (consulta) {
            
            consulta.data_hora_consulta = consulta.data_hora_consulta.slice(0, 16)
            consulta.data_agendamento = consulta.data_agendamento.slice(0,10).split('-').reverse().join('/');

            setForm(consulta);
          } else {
            console.warn('Consulta não encontrada para o ID:', id);
          }
        } catch (error) {
          console.error('Erro ao buscar consulta:', error);
        }
      }
    };

    carregarConsulta();
  }, [id]);
  
  const navigate = useNavigate();



  const [error, setError] = useState('');

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  //Função para validar o formulário
  const validateForm = () => {
    if (!form.id_paciente || !form.id_usuario_medico || !form.data_hora_consulta || !form.data_agendamento || !form.motivo) {
      setError('Todos os campos obrigatórios devem ser preenchidos!');
      return false;
    }

    const dataAgendamento = new Date(form.data_agendamento.split('/').reverse().join('-'));
    const dataHoraConsulta = new Date(form.data_hora_consulta.slice(0, 16).split('T')[0]);

    if (isNaN(dataAgendamento.getTime()) || isNaN(dataHoraConsulta.getTime())) {
      setError('Datas inválidas! Verifique o formato das datas.');
      return false;
    }

    if (dataAgendamento >= dataHoraConsulta) {
      setError('A data de agendamento deve ser menor que a data e hora da consulta!');
      return false;
    }

    
    form.data_agendamento = form.data_agendamento.split('/').reverse().join('-');
    form.id_usuario_agendador = form.id_usuario_medico;
    setError('');
    return true;
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validando o formulário antes de submeter
    if (!validateForm()) return;

    if (form.id_consulta!== 0) {
      consultaServico.updateConsulta(form).then(() => {
        consultaServico.getConsultas().then(consultas => setConsultas(consultas));
      });
    }
    else
    {
      consultaServico.createConsulta(form).then(() => {
        consultaServico.getConsultas().then(consultas => setConsultas(consultas));
      });
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
        <Form.Control
          type="hidden"
          name="id_tipo_consulta"
          value={form.id_tipo_consulta}
        />
        <Form.Control
          type="hidden"
          name="id_usuario_agendador"
          value={form.id_usuario_medico}
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