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
import FuncionarioServico from './services/FuncionarioServico';
import PacienteServico from './services/PacienteServico';

const consultaServico = new ConsultaServico();
const funcionarioServico = new FuncionarioServico();
const pacienteServico = new PacienteServico();

const App = () => {

  const [funcionarios, setFuncionarios] = useState([]);
  const [pacientes,    setPacientes]    = useState([]);
  const [consultas,    setConsultas]    = useState([]);
  
  const carregaConsultas = async () => {
    const consultas = await consultaServico.getConsultas();
    setConsultas(consultas);
  }
  
  const carregaPacientes = async () => {
    const pacientes = await pacienteServico.getPacientes();
    setPacientes(pacientes);
  }

  const carregaFuncionarios = async () => {
    const funcionarios = await funcionarioServico.getFuncionarios();
    setFuncionarios(funcionarios);
  }

  // Carregar dados do LocalStorage ao iniciar
  useEffect(() => {
    carregaConsultas();
    carregaFuncionarios();
    carregaPacientes();
  }, []);

  return (
    <Router>
      <NavbarComponent />
      <Container className="mt-3">
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>

          <Route
            path="/funcionarios"
            element={<Funcionarios funcionarios={funcionarios} setFuncionarios={setFuncionarios} setConsultas= {setConsultas} />}
          />
          <Route
            path="/funcionarios/formulario/:id"
            element={<FormularioFuncionarios funcionarios={funcionarios} setFuncionarios={setFuncionarios}  />}
          />
          
          <Route
            path="/funcionarios/formulario"
            element={<FormularioFuncionarios funcionarios={funcionarios} setFuncionarios={setFuncionarios} />}
          />
          <Route
            path="/pacientes"
            element={<Pacientes pacientes={pacientes} setPacientes={setPacientes} setConsultas= {setConsultas}/>}
          />
          <Route
            path="/pacientes/formulario"
            element={<FormularioPacientes pacientes={pacientes} setPacientes={setPacientes} />}
          />
          <Route
            path="/pacientes/formulario/:id"
            element={<FormularioPacientes pacientes={pacientes} setPacientes={setPacientes} />}
          />

          
          <Route
            path="/consultas"
            element={<Consultas consultas={consultas} pacientes={pacientes} funcionarios={funcionarios} setConsultas={setConsultas} />}
          />
          <Route
            path="/consultas/formulario"
            element={<FormularioConsultas consultas={consultas} pacientes={pacientes} funcionarios={funcionarios} setConsultas={setConsultas} />}
          />

          <Route
            path="/consultas/formulario/:id"
            element={<FormularioConsultas consultas={consultas}  pacientes={pacientes} funcionarios={funcionarios} setConsultas={setConsultas} />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;