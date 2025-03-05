/* eslint-disable default-case */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Casillas from "./casillas";
import Gamesplayed from "./gamesplayed";
import Header from "./header";
import PopUp from "./popUp";
import styles from "./tablero.module.scss";
import Board from "../../classes/board.js";
import Player from "../../classes/player.js";
import toast, { Toaster } from "react-hot-toast";
import GameContext from "../../context/GameContext.js";

function Tablero({ casillas }) {
  const { playerMark, cpu, difficulty } = useContext(GameContext);

  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState();
  const [countX, setCountX] = useState(0);
  const [tries, setTries] = useState(0);
  const [countO, setCountO] = useState(0);
  const [jugar, setJugar] = useState(1);
  const [valores, setValores] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turnX, setTurnX] = useState(true);

  const cpuMoviendoRef = useRef(false);

  const openModal = useCallback(
    winner => {
      setWinner(winner);
      setOpen(!open);
    },
    [open]
  );

  const notify = text =>
    toast(text, {
      icon: "ℹ",
    });

  //check after each move if there is a winner or a tie
  const verificarGanador = useCallback(
    valores => {
      const board = new Board(valores);
      const resultado = board.isTerminal();

      if (resultado) {
        if (resultado.winner === "x") {
          openModal("x");
          setCountX(prev => prev + 1);
        } else if (resultado.winner === "o") {
          openModal("o");
          setCountO(prev => prev + 1);
        } else {
          openModal("Ties");
          setTries(prev => prev + 1);
        }
        setJugar(0);
      } else {
        setTurnX(prev => !prev);
      }
    },
    [openModal]
  );

  //this function get Best Move and mark on there
  const cpuMark = useCallback(() => {
    const newValue = cpu.mark;
    const board = new Board(valores);
    const p = new Player(difficulty === "easy" ? 1 : -1); // 🔥 Solo piensa 1 turno en fácil
    let valuesAvaibles = valores
      .map((value, index) => (value === "" ? index : null))
      .filter(v => v !== null);

    let bestMove = null;

    if (difficulty === "easy") {
      // 1️⃣ Revisar si la IA puede ganar
      bestMove = valuesAvaibles.find(move => {
        const tempBoard = new Board([...valores]);
        tempBoard.insert(cpu.mark, move);
        return tempBoard.isTerminal()?.winner === cpu.mark;
      });

      // 2️⃣ Si la IA no puede ganar, revisa si debe bloquear al jugador (pero ahora puede ignorarlo más veces)
      if (!bestMove) {
        bestMove = valuesAvaibles.find(move => {
          const tempBoard = new Board([...valores]);
          tempBoard.insert(playerMark, move);
          return tempBoard.isTerminal()?.winner === playerMark;
        });

        if (bestMove && Math.random() < 0.6) {
          // 🔥 Ahora solo bloquea el 40% de las veces
          bestMove = null;
        }
      }

      // 3️⃣ Si no hay jugada crítica, juega mal intencionalmente
      if (!bestMove) {
        if (Math.random() < 0.5) {
          // 🔥 Ahora el 50% de las veces elige aleatorio en vez de Minimax
          bestMove =
            valuesAvaibles[Math.floor(Math.random() * valuesAvaibles.length)];
        } else {
          bestMove = parseInt(p.getBestMove(board, cpu.mark === "x"));
        }
      }
    } else {
      bestMove = parseInt(p.getBestMove(board, cpu.mark === "x"));
    }

    // Aplicar el movimiento
    const valoresUpdated = valores.map((value, index) =>
      index === bestMove && value === "" ? newValue : value
    );
    setValores(valoresUpdated);
    verificarGanador(valoresUpdated);
  }, [valores, cpu, difficulty, playerMark, verificarGanador]);

  const actualizarTablero = (id, nuevoValor) => {
    const valoresUpdated = valores.map((value, index) =>
      index === id ? nuevoValor : value
    );

    setValores(valoresUpdated);
    verificarGanador(valoresUpdated);
  };

  //1 player moves
  const marcar1 = (valor, turn, id) => {
    if (jugar !== 1) return;
    if (valor !== "") return notify("box not available");
    if (playerMark === "o" && turn) return notify("wait for your turn");

    actualizarTablero(id, playerMark);
  };

  //2players moves
  const marcar2V2 = (valor, turn, id) => {
    if (jugar !== 1) return;
    if (valor !== "") return notify("box not available");

    const newValue = turn ? "x" : "o";
    actualizarTablero(id, newValue);
  };

  //reset all
  const reiniciar = () => {
    setValores(["", "", "", "", "", "", "", "", ""]);
    setOpen(false);
    setWinner();
    setTurnX(true);
    setJugar(1);
  };

  //check if cpu is selected and if it's your turn
  useEffect(() => {
    if (jugar === 1 && cpu.selected && !cpuMoviendoRef.current) {
      if ((cpu.mark === "x" && turnX) || (cpu.mark === "o" && !turnX)) {
        cpuMoviendoRef.current = true;
        setTimeout(() => {
          cpuMark();
          cpuMoviendoRef.current = false;
        }, 500);
      }
    }
  }, [turnX, jugar, cpu, cpuMark]);

  return (
    <div className={styles.Tablero}>
      <Toaster
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1f3540",
            color: "#fff",
          },
        }}
      />
      <Header turn={turnX} funcion={reiniciar} />
      {casillas.map((casilla, i) => {
        return (
          <Casillas
            key={i}
            id={i}
            valor={valores[i]}
            turn={turnX}
            funcion={cpu.selected === false ? marcar2V2 : marcar1}
          />
        );
      })}
      <Gamesplayed countX={countX} tries={tries} countO={countO} />
      <PopUp open={open} winner={winner} resetValues={reiniciar} />
    </div>
  );
}

export default Tablero;
