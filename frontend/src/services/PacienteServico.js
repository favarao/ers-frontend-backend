const API_BASE_URL = 'http://localhost:3001';

class PacienteServico {
    async getPacientes() {
        const response = await fetch(`${API_BASE_URL}/pacientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar pacientes');
        }
        const dados = await response.json();
        return dados;
    }

    async getPaciente(id) {
        const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar funcionário');
        }
        const dados = await response.json();
        return dados;
    }

    async deletePaciente(id) {
        const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir paciente');
        }
    }

    async updatePaciente(paciente) {
        const response = await fetch(`${API_BASE_URL}/pacientes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar paciente');
        }
    }

    async createPaciente(paciente) {
        const response = await fetch(`${API_BASE_URL}/pacientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        });
        if (!response.ok) {
            throw new Error('Erro ao inserir paciente');
        }
    }
}

export default PacienteServico;
