const API_BASE_URL = 'http://localhost:3001';

class ConsultaServico{
    async getConsultas(){
        const response = await fetch(`${API_BASE_URL}/consulta`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if(!response.ok){
            throw new Error('Erro ao buscar consultas');
        }
        const dados = await response.json();
        return dados;
    }

    async getConsultaPorTermo(termo){
        const response = await fetch(`${API_BASE_URL}/consulta/termo/${termo}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if(!response.ok){
            throw new Error('Erro ao buscar consultas');
        }
        const dados = await response.json();
        return dados;
    }

    async getConsulta(id){
        const response = await fetch(`${API_BASE_URL}/consulta/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if(!response.ok){
            throw new Error('Erro ao buscar consulta');
        }
        const dados = await response.json();
        return dados;
    }

    async deleteConsulta(id){
        const response = await fetch(`${API_BASE_URL}/consulta/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if(!response.ok){
            throw new Error('Erro ao excluir consulta');
        }
    }
    
    async updateConsulta(consulta){
        const response = await fetch(`${API_BASE_URL}/consulta`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(consulta)
            }
        );
        if(!response.ok){
            throw new Error('Erro ao atualizar consulta');
        }
    }

    async createConsulta(consulta){
        const response = await fetch(`${API_BASE_URL}/consulta`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(consulta)
            }
        );
        if(!response.ok){
            throw new Error('Erro ao inserir consulta');
        }
    }
}

export default ConsultaServico;