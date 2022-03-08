import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';

const Tarea = () => <div  className='margen'>Tareas</div>

const App = () => (
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route exact path='/' element={ <Usuarios /> } />
      <Route exact path='/tareas' element={ <Tarea /> } />
    </Routes>
  </BrowserRouter>
);

export default App