import './App.css';
import Tablero from './components/Juego/tablero';
import PopUp from './components/Juego/popUp';
import { useState } from 'react';
import Menu from './components/Menu/menu';

function App() {

  const [open, setOpen] = useState(false)
  const [winner, setWinner] = useState()

  const openModal = (winner) => {
    setWinner(winner)
    setOpen(!open)
  }

  const resetValues = () => {
    setOpen(false)
    setWinner()
  }

  return (
    <div className="App">
      <Tablero funcion={openModal} resetValues={resetValues} />
      <PopUp Open={open} Winner={winner} resetValues={resetValues} />
      <Menu />
    </div>
  );
}

export default App;
