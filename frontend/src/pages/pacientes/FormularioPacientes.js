import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import InputMask from 'react-input-mask'

const FormularioPacientes = ({ pacientes, setPacientes, sincronizarStorage }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        id_paciente: '',
        beneficio: '',
        plan_saude: 'SUS',
        nome: '',
        sexo: 'M',
        nasc: '',
        end: '',
        tel: '',
    });

    useEffect(() => {
        if (id) {
            const pacienteExistente = pacientes.find(paciente => paciente.id_paciente === parseInt(id));
            if (pacienteExistente) {
                setForm(pacienteExistente);
            }
        }
    }, [id, pacientes]);

    const [error, setError] = useState('');

    // Função para lidar com mudanças nos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Função para validar o formulário
    const validateForm = () => {
        if (!form.nome || !form.sexo || !form.nasc || !form.end || !form.tel) {
            setError('Todos os campos obrigatórios devem ser preenchidos!');
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

        if (form.id_paciente !== '') {
            const index = pacientes.findIndex(paciente => paciente.id_paciente === form.id_paciente);
            if (index !== -1) {
                pacientes[index] = form;
                setPacientes([...pacientes]);
                sincronizarStorage('pacientes', pacientes);
            }
        }
        else {
            form.id_paciente = pacientes.length + 1; // Gerar um ID único baseado na quantidade de consultas
            const novoPaciente = {
                ...form
            };


            const novosPacientes = [...pacientes, novoPaciente];
        setPacientes(novosPacientes);
        sincronizarStorage('pacientes', novosPacientes); // Sincroniza com o LocalStorage
        }

        navigate('/pacientes');
        // Limpa o formulário
        // setForm({
        //     id_paciente: '',
        //     beneficio: '',
        //     plan_saude: 'SUS',
        //     nome: '',
        //     sexo: 'M',
        //     nasc: '',
        //     end: '',
        //     tel: '',
        // });
    };

    return (
        <div>

            <h3>Cadastrar Novo Paciente</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    type="hidden"
                    name="id_paciente"
                    value={form.id_paciente}
                />
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        placeholder='Digite o nome completo'
                        value={form.nome}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEnd">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        type="text"
                        name="end"
                        placeholder='Digite endereço completo'
                        value={form.end}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNasc">
                    <Form.Label>Nascimento</Form.Label>
                    <InputMask
                        mask="99/99/9999"
                        placeholder="DD/MM/AAAA"
                        onChange={handleInputChange}
                        name="nasc"
                        value={form.nasc}
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
                    <Form.Control.Feedback type="invalid">
                        Insira uma data válida.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTel">
                    <Form.Label>Telefone</Form.Label>
                    <InputMask
                        mask="(99) 99999-9999"
                        placeholder="(DD) 00000-0000"
                        name='tel'
                        value={form.tel}
                        onChange={handleInputChange}
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
                    <Form.Control.Feedback type="invalid">
                        Insira uma data válida.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSexo">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Select
                        name="sexo"
                        value={form.sexo}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPlanSaude">
                    <Form.Label>Plano de Saúde</Form.Label>
                    <Form.Select
                        name="plan_saude"
                        value={form.plan_saude}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="SUS">SUS</option>
                        <option value="Unimed">Unimed</option>
                        <option value="Oeste Saúde">Oeste Saúde</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBeneficio">
                    <Form.Label>Beneficio</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="beneficio"
                        value={form.beneficio}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <Button variant="success" type="submit">
                    Salvar
                </Button>
            </Form>
        </div>
    );
};

export default FormularioPacientes;