import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import Funcionarios from './pages/funcionarios/Funcionarios';
import FormularioFuncionarios from './pages/funcionarios/FormularioFuncionarios';
import Pacientes from './pages/pacientes/Pacientes';
import FormularioPacientes from './pages/pacientes/FormularioPacientes';
import Consultas from './pages/consultas/Consultas';
import FormularioConsultas from './pages/consultas/FormularioConsultas';
import Home from './pages/Home';
import ConsultaServico from './services/ConsultaServico';
const consultaServico = new ConsultaServico();

const App = () => {

  const [funcionarios, setFuncionarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);

  // Carregar dados do LocalStorage ao iniciar
  useEffect(() => {
    const carregaConsultas = async () => {
      const consultas = await consultaServico.getConsultas();
      setConsultas(consultas);
    }

    carregaConsultas();

    const funcionariosStorage = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const pacientesStorage = JSON.parse(localStorage.getItem('pacientes')) || [];
    setFuncionarios(funcionariosStorage);
    setPacientes(pacientesStorage);
  }, []);

  // Função para sincronizar dados no LocalStorage
  const sincronizarStorage = (chave, dados) => {
    localStorage.setItem(chave, JSON.stringify(dados));
  };

  return (
    <Router>
      <NavbarComponent />
      <Container className="mt-3">
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>

          <Route
            path="/funcionarios"
            element={<Funcionarios funcionarios={funcionarios} setFuncionarios={setFuncionarios} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/funcionarios/formulario/:id"
            element={<FormularioFuncionarios funcionarios={funcionarios} setFuncionarios={setFuncionarios} sincronizarStorage={sincronizarStorage} />}
          />
          
          <Route
            path="/funcionarios/formulario"
            element={<FormularioFuncionarios funcionarios={funcionarios} setFuncionarios={setFuncionarios} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/pacientes"
            element={<Pacientes pacientes={pacientes} setPacientes={setPacientes} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/pacientes/formulario"
            element={<FormularioPacientes pacientes={pacientes} setPacientes={setPacientes} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/pacientes/formulario/:id"
            element={<FormularioPacientes pacientes={pacientes} setPacientes={setPacientes} sincronizarStorage={sincronizarStorage} />}
          />

          
          <Route
            path="/consultas"
            element={<Consultas consultas={consultas} pacientes={pacientes} funcionarios={funcionarios} setConsultas={setConsultas} sincronizarStorage={sincronizarStorage} />}
          />
          <Route
            path="/consultas/formulario"
            element={<FormularioConsultas consultas={consultas} pacientes={pacientes} funcionarios={funcionarios} setConsultas={setConsultas} sincronizarStorage={sincronizarStorage} />}
          />

          <Route
            path="/consultas/formulario/:id"
            element={<FormularioConsultas consultas={consultas}  pacientes={pacientes} funcionarios={funcionarios} setConsultas={setConsultas} sincronizarStorage={sincronizarStorage} />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;