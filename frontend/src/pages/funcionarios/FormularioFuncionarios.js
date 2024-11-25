import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import InputMask from 'react-input-mask'

const FormularioFuncionarios = ({ funcionarios, setFuncionarios, sincronizarStorage }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        id_usuario: '',
        nome: '',
        matricula: '',
        funcao: 'Atendente',
        habilitacao: 'Aprovada',
    });

    useEffect(() => {
        if (id) {
            const funcionarioExistente = funcionarios.find(funcionario => funcionario.id_usuario === parseInt(id));
            if (funcionarioExistente) {
                setForm(funcionarioExistente);
            }
        }
    }, [id, funcionarios]);

    const [error, setError] = useState('');

    // Função para lidar com mudanças nos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Função para validar o formulário
    const validateForm = () => {
        if (!form.nome || !form.matricula || !form.funcao || !form.habilitacao) {
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

        if (form.id_usuario !== '') {
            const index = funcionarios.findIndex(funcionario => funcionario.id_usuario === form.id_usuario);
            if (index !== -1) {
                funcionarios[index] = form;
                setFuncionarios([...funcionarios]);
                sincronizarStorage('funcionarios', funcionarios);
            }
        }
        else {
            form.id_usuario = funcionarios.length + 1; // Gerar um ID único baseado na quantidade de consultas
            const novoFuncionario = {
                ...form
            };


            const novosFuncionarios = [...funcionarios, novoFuncionario];
        setFuncionarios(novosFuncionarios);
        sincronizarStorage('funcionarios', novosFuncionarios); // Sincroniza com o LocalStorage
        }

        navigate('/funcionarios');
    };

    return (
        <div>
            <h3>Cadastrar Novo Funcionario</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    type="hidden"
                    name="id_usuario"
                    value={form.id_usuario}
                />
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="matricula">
                    <Form.Label>Matrícula</Form.Label>
                    <InputMask
                        mask="999.999.999"
                        placeholder="000.000.000"
                        onChange={handleInputChange}
                        name="matricula"
                        value={form.matricula}
                        minLength={11}
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

                <Form.Group className="mb-3" controlId="funcao">
                    <Form.Label>Função</Form.Label>
                    <Form.Control
                        as="select"
                        name="funcao"
                        value={form.funcao}
                        onChange={handleInputChange}
                    >
                        <option value="Atendente">Atendente</option>
                        <option value="Médico">Médico</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="habilitacao">
                    <Form.Label>Habilitação</Form.Label>
                    <Form.Control
                        as="select"
                        name="habilitacao"
                        value={form.habilitacao}
                        onChange={handleInputChange}
                    >
                        <option value="Aprovada">Aprovada</option>
                        <option value="Reprovada">Reprovada</option>
                    </Form.Control>
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <Button variant="success" type="submit">
                    Salvar
                </Button>
            </Form>
        </div>
    );
};

export default FormularioFuncionarios;