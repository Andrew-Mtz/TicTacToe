import React, { createContext, useEffect, useState } from "react";

// Crear el contexto
const GameContext = createContext();

// Proveedor de contexto
export const GameProvider = ({ children }) => {
  // Inicializar el estado directamente desde localStorage
  const [cpu, setCpu] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("cpu")) || { selected: false, mark: "o" }
    );
  });

  const [difficulty, setDifficulty] = useState(() => {
    return localStorage.getItem("difficulty") || "easy";
  });

  const [playerMark, setPlayerMark] = useState(() => {
    return localStorage.getItem("player1") || "x";
  });

  const [playerTwoMark, setPlayerTwoMark] = useState("o");

  // Guardar cambios en localStorage para persistencia opcional
  useEffect(() => {
    localStorage.setItem("cpu", JSON.stringify(cpu));
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("player1", playerMark);
  }, [cpu, difficulty, playerMark]);

  return (
    <GameContext.Provider
      value={{
        cpu,
        setCpu,
        difficulty,
        setDifficulty,
        playerMark,
        setPlayerMark,
        playerTwoMark,
        setPlayerTwoMark,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
