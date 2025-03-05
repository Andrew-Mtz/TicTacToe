import React from "react";
import "../App.css";
import Tablero from "../components/Juego/tablero";

function Inicio() {
  const casillas = Array(9).fill(null);

  return (
    <div className="App">
      <Tablero casillas={casillas} />
    </div>
  );
}

export default Inicio;
