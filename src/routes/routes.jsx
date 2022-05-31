import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from '../pages/game';
import Inicio from '../pages/inicio';

const Rutas = () => (
  <Routes>
    <Route path='/gameVScpu' element={<Game />} />
    <Route path='/gameVSp2' element={<Game />} />
    <Route path='/TicTacToe' element={<Inicio />} />
  </Routes>
);

export default Rutas;