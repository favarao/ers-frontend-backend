const API_BASE_URL = 'http://localhost:3001';

class FuncionarioServico {
    async getFuncionarios() {
        const response = await fetch(`${API_BASE_URL}/funcionario`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar funcionários');
        }
        const dados = await response.json();
        return dados;
    }

    async getFuncionario(id) {
        const response = await fetch(`${API_BASE_URL}/funcionario/${id}`, {
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

    async deleteFuncionario(id) {
        const response = await fetch(`${API_BASE_URL}/funcionario/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir funcionário');
        }
    }

    async updateFuncionario(funcionario) {
        const response = await fetch(`${API_BASE_URL}/funcionario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar funcionário');
        }
    }

    async createFuncionario(funcionario) {
        const response = await fetch(`${API_BASE_URL}/funcionario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });
        if (!response.ok) {
            throw new Error('Erro ao inserir funcionário');
        }
    }
}

export default FuncionarioServico;
