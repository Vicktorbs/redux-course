import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Menu from './Menu';
import Publicaciones from './publicaciones';
import Tareas from './Tareas';
import Guardar from './Tareas/Guardar';
import Usuarios from './Usuarios';

const App = () => (
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route exact path='/' element={ <Usuarios /> } />
      <Route exact path='/tareas' element={ <Tareas /> } />
      <Route exact path="/publicaciones/:key"  element={ <Publicaciones /> } />
      <Route exact path="/tareas/guardar"  element={ <Guardar /> } />
    </Routes>
  </BrowserRouter>
);

export default App